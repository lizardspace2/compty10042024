// src/components/fiscalite/FiscaliteSelector.jsx
import React, { useState } from 'react';
import {
  Box,
  Select,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Badge,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { useFiscaliteData } from '../../hooks/useFiscaliteData';
import {
  MicroBNCComponent,
  BNCReelComponent,
  AutoEntrepreneurComponent,
  SocieteISComponent,
  ComparaisonRegimesComponent
} from './RegimeComponents';

function FiscaliteSelector() {
  const [selectedRegime, setSelectedRegime] = useState(null);
  const { data, loading, error } = useFiscaliteData(selectedRegime);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (loading) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="md" borderWidth={1} borderColor={borderColor}>
        <Skeleton height="400px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="xl">
        <AlertIcon />
        <AlertTitle>Erreur de chargement</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const regimeActuel = selectedRegime || data?.regime_actuel || 'micro-bnc';

  const regimeOptions = [
    { value: 'micro-bnc', label: 'Micro-BNC (Régime forfaitaire)', seuil: '≤ 77 700 €' },
    { value: 'bnc-reel', label: 'BNC Réel (Déclaration contrôlée)', seuil: '> 77 700 €' },
    { value: 'auto-entrepreneur', label: 'Auto-Entrepreneur', seuil: '≤ 77 700 €' },
    { value: 'societe', label: 'Société (SASU/EURL - IS)', seuil: 'Tout CA' },
    { value: 'comparaison', label: '📊 Comparer tous les régimes', seuil: '' }
  ];

  const renderRegimeComponent = () => {
    switch (regimeActuel) {
      case 'micro-bnc':
      case 'micro-BNC':
        return <MicroBNCComponent data={data?.micro_bnc} />;

      case 'bnc-reel':
      case 'declaration-controlee':
        return <BNCReelComponent data={data?.bnc_reel} />;

      case 'auto-entrepreneur':
      case 'micro-entreprise':
        return <AutoEntrepreneurComponent data={data?.auto_entrepreneur} />;

      case 'societe':
      case 'IS':
        return <SocieteISComponent data={data?.societe} />;

      case 'comparaison':
        return <ComparaisonRegimesComponent data={data} />;

      default:
        return <MicroBNCComponent data={data?.micro_bnc} />;
    }
  };

  return (
    <Box p={6} bg={bgColor} borderRadius="xl" boxShadow="md" borderWidth={1} borderColor={borderColor}>
      <VStack spacing={6} align="stretch">
        {/* En-tête avec sélecteur */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              Fiscalité et Optimisation
            </Text>
            <Text fontSize="sm" color="gray.600">
              Calculez vos charges selon votre régime fiscal
            </Text>
          </VStack>
          <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
            Année {data?.micro_bnc?.annee || new Date().getFullYear()}
          </Badge>
        </HStack>

        {/* Sélecteur de régime */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Choisissez votre régime fiscal :
          </Text>
          <Select
            value={regimeActuel}
            onChange={(e) => setSelectedRegime(e.target.value)}
            size="lg"
            borderColor={borderColor}
            _hover={{ borderColor: 'purple.400' }}
            _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805AD5' }}
          >
            {regimeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} {option.seuil && `- ${option.seuil}`}
              </option>
            ))}
          </Select>
        </Box>

        {/* Alerte si optimal */}
        {data?.comparaison?.regime_optimal && regimeActuel !== 'comparaison' && (
          <Alert status={regimeActuel === data.comparaison.regime_optimal ? 'success' : 'info'} borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>
                {regimeActuel === data.comparaison.regime_optimal
                  ? '✅ Vous êtes dans le régime optimal'
                  : '💡 Régime suggéré'}
              </AlertTitle>
              <AlertDescription>
                {regimeActuel === data.comparaison.regime_optimal
                  ? 'Ce régime est le plus avantageux pour votre situation actuelle.'
                  : `Le régime ${data.comparaison.regime_optimal} pourrait être plus avantageux. Cliquez sur "Comparer" pour voir les détails.`}
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Composant du régime sélectionné */}
        {renderRegimeComponent()}
      </VStack>
    </Box>
  );
}

export default FiscaliteSelector;
