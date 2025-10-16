import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Badge,
  HStack,
  Text,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { supabase } from '../../../supabaseClient';

// Context pour partager l'exercice fiscal sélectionné avec tous les composants
export const ExerciceFiscalDocumentsContext = createContext();

export const useExerciceFiscalDocuments = () => {
  const context = useContext(ExerciceFiscalDocumentsContext);
  if (!context) {
    return { selectedExercice: null, setSelectedExercice: () => {} };
  }
  return context;
};

const DocumentBanner = () => {
  const [exercices, setExercices] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Utiliser le context pour partager l'exercice sélectionné
  const { selectedExercice, setSelectedExercice } = useExerciceFiscalDocuments();

  useEffect(() => {
    fetchExercices();
  }, []);

  const fetchExercices = async () => {
    try {
      setLoading(true);

      // Récupérer l'utilisateur connecté
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Récupérer l'entreprise
      const { data: entreprise, error: entrepriseError } = await supabase
        .from('entreprises')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (entrepriseError) throw entrepriseError;

      // Récupérer les exercices fiscaux (année courante, n-1, n-2)
      const currentYear = new Date().getFullYear();
      const years = [currentYear, currentYear - 1, currentYear - 2];

      const { data: exercicesFiscaux, error: exercicesError } = await supabase
        .from('exercices_fiscaux')
        .select('*')
        .eq('entreprise_id', entreprise.id)
        .in('annee', years)
        .order('annee', { ascending: false });

      if (exercicesError) throw exercicesError;

      setExercices(exercicesFiscaux || []);

      // Sélectionner l'exercice en cours par défaut, sinon le plus récent
      const exerciceEnCours = exercicesFiscaux?.find(ex => ex.statut === 'en_cours');
      const defaultExercice = exerciceEnCours || exercicesFiscaux?.[0];

      if (defaultExercice) {
        setSelectedExercice(defaultExercice);
      }

    } catch (error) {
      console.error('❌ Erreur chargement exercices:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les exercices fiscaux',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      // Fallback : créer des exercices fictifs
      const currentYear = new Date().getFullYear();
      const fallbackExercices = [
        { id: 'current', annee: currentYear, statut: 'en_cours', date_debut: `${currentYear}-01-01`, date_fin: `${currentYear}-12-31` },
        { id: 'n-1', annee: currentYear - 1, statut: 'cloture', date_debut: `${currentYear - 1}-01-01`, date_fin: `${currentYear - 1}-12-31` },
        { id: 'n-2', annee: currentYear - 2, statut: 'cloture', date_debut: `${currentYear - 2}-01-01`, date_fin: `${currentYear - 2}-12-31` }
      ];
      setExercices(fallbackExercices);
      setSelectedExercice(fallbackExercices[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectExercice = (exercice) => {
    setSelectedExercice(exercice);
    toast({
      title: 'Exercice changé',
      description: `Exercice ${exercice.annee} sélectionné`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const getStatusBadge = (statut) => {
    const statusConfig = {
      'en_cours': { colorScheme: 'green', label: 'En cours' },
      'cloture': { colorScheme: 'gray', label: 'Clôturé' },
      'brouillon': { colorScheme: 'orange', label: 'Brouillon' }
    };
    const config = statusConfig[statut] || { colorScheme: 'gray', label: statut };
    return <Badge colorScheme={config.colorScheme} ml={2}>{config.label}</Badge>;
  };

  const formatPeriode = (exercice) => {
    if (!exercice.date_debut || !exercice.date_fin) return '';
    const debut = new Date(exercice.date_debut).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
    const fin = new Date(exercice.date_fin).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    return `${debut} - ${fin}`;
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="red.50"
      borderBottom="1px"
      borderColor="red.100"
      p={6}
      boxShadow="sm"
    >
      <Heading size="lg" color="gray.800">Documents</Heading>

      {loading ? (
        <HStack spacing={2}>
          <Spinner size="sm" color="gray.500" />
          <Text fontSize="sm" color="gray.600">Chargement...</Text>
        </HStack>
      ) : (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<IoIosArrowDown />}
            variant="outline"
            borderRadius="xl"
            borderColor="gray.300"
            _hover={{ bg: 'red.100', borderColor: 'red.400' }}
            _active={{ bg: 'red.100' }}
            size="lg"
            fontWeight="semibold"
          >
            <HStack spacing={2}>
              <Text>Exercice {selectedExercice?.annee || new Date().getFullYear()}</Text>
              {selectedExercice && getStatusBadge(selectedExercice.statut)}
            </HStack>
          </MenuButton>
          <MenuList borderRadius="xl" boxShadow="xl" p={2}>
            {exercices.length > 0 ? (
              exercices.map((exercice) => (
                <MenuItem
                  key={exercice.id}
                  _hover={{ bg: 'red.50' }}
                  borderRadius="md"
                  onClick={() => handleSelectExercice(exercice)}
                  bg={selectedExercice?.id === exercice.id ? 'red.50' : 'transparent'}
                  fontWeight={selectedExercice?.id === exercice.id ? 'bold' : 'normal'}
                  p={3}
                >
                  <HStack justify="space-between" w="full">
                    <Text>Exercice {exercice.annee}</Text>
                    <HStack spacing={2}>
                      {getStatusBadge(exercice.statut)}
                      {selectedExercice?.id === exercice.id && (
                        <Text fontSize="xs" color="green.600">✓</Text>
                      )}
                    </HStack>
                  </HStack>
                  {exercice.date_debut && (
                    <Text fontSize="xs" color="gray.600" mt={1}>
                      {formatPeriode(exercice)}
                    </Text>
                  )}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <Text color="gray.500">Aucun exercice disponible</Text>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default DocumentBanner;
