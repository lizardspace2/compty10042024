import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useEntreprise } from '../../../../../../contexts/EntrepriseContext';
import {
  createCompteBancaire,
  desactiverCompteBancaire,
  reactiverCompteBancaire
} from '../../../../../../services/compteBancaireService';

// This component displays individual account information
const AccountCard = ({ compte, onUpdate }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleToggleActif = async () => {
    setLoading(true);
    const action = compte.actif ? desactiverCompteBancaire : reactiverCompteBancaire;
    const { error } = await action(compte.id);

    if (error) {
      toast({
        title: 'Erreur',
        description: `Impossible de ${compte.actif ? 'suspendre' : 'réactiver'} le compte`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Succès',
        description: `Compte ${compte.actif ? 'suspendu' : 'réactivé'} avec succès`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onUpdate();
    }
    setLoading(false);
  };

  return (
    <Box
      p={4}
      bg={bgColor}
      boxShadow="md"
      borderRadius="lg"
      opacity={compte.actif ? 1 : 0.6}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="sm" color={textColor} fontWeight="medium">
            {compte.nom_compte}
          </Text>
          <Text fontSize="xs" color={textColor}>
            {compte.nom_banque}
          </Text>
          {compte.iban && (
            <Text fontSize="xs" color="gray.500" mt={1}>
              IBAN: {compte.iban.substring(0, 10)}...
            </Text>
          )}
        </Box>
        <Box textAlign="right">
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            {parseFloat(compte.solde_actuel || 0).toLocaleString('fr-FR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} €
          </Text>
          <Button
            size="sm"
            variant="outline"
            mt={2}
            colorScheme={compte.actif ? 'orange' : 'green'}
            onClick={handleToggleActif}
            isLoading={loading}
          >
            {compte.actif ? 'Suspendre' : 'Réactiver'}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

// Modal pour ajouter un compte
const AddAccountModal = ({ isOpen, onClose, onSuccess }) => {
  const { entreprise } = useEntreprise();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom_banque: '',
    nom_compte: '',
    iban: '',
    bic: '',
    solde_initial: 0,
    type_compte: 'courant'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await createCompteBancaire(entreprise.id, formData);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le compte bancaire',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Compte bancaire créé avec succès',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormData({
        nom_banque: '',
        nom_compte: '',
        iban: '',
        bic: '',
        solde_initial: 0,
        type_compte: 'courant'
      });
      onSuccess();
      onClose();
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un compte bancaire</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="nom_banque" isRequired>
                <FormLabel>Nom de la banque</FormLabel>
                <Input
                  placeholder="BNP Paribas, Crédit Agricole..."
                  value={formData.nom_banque}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="nom_compte" isRequired>
                <FormLabel>Nom du compte</FormLabel>
                <Input
                  placeholder="Compte courant professionnel"
                  value={formData.nom_compte}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="type_compte" isRequired>
                <FormLabel>Type de compte</FormLabel>
                <Select value={formData.type_compte} onChange={handleChange}>
                  <option value="courant">Compte courant</option>
                  <option value="epargne">Compte épargne</option>
                  <option value="caisse">Caisse</option>
                </Select>
              </FormControl>

              <FormControl id="iban">
                <FormLabel>IBAN</FormLabel>
                <Input
                  placeholder="FR76 1234 5678 9012 3456 7890 123"
                  value={formData.iban}
                  onChange={handleChange}
                  maxLength={34}
                />
              </FormControl>

              <FormControl id="bic">
                <FormLabel>BIC</FormLabel>
                <Input
                  placeholder="BNPAFRPPXXX"
                  value={formData.bic}
                  onChange={handleChange}
                  maxLength={11}
                />
              </FormControl>

              <FormControl id="solde_initial" isRequired>
                <FormLabel>Solde initial</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.solde_initial}
                  onChange={handleChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button
              colorScheme="red"
              type="submit"
              isLoading={loading}
            >
              Ajouter
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

// This component displays the overall section with the ability to add an account
const AccountSection = ({ accounts, onRefresh }) => {
  const { entreprise } = useEntreprise();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack spacing={4} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h2" size="lg">
            Comptes et cartes
          </Heading>
        </Flex>

        {!entreprise && (
          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            Créez d'abord votre entreprise dans l'onglet Profil
          </Alert>
        )}

        {entreprise && accounts.length === 0 && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            Aucun compte bancaire enregistré. Ajoutez votre premier compte !
          </Alert>
        )}

        {accounts.map((compte) => (
          <AccountCard
            key={compte.id}
            compte={compte}
            onUpdate={onRefresh}
          />
        ))}

        {entreprise && (
          <Flex mt="auto" justifyContent="flex-end">
            <Tooltip label="Ajouter un compte ou une carte" fontSize="md" placement="top" hasArrow>
              <Button
                leftIcon={<FiPlus />}
                variant="solid"
                size="md"
                colorScheme="red"
                onClick={onOpen}
              >
                Ajouter
              </Button>
            </Tooltip>
          </Flex>
        )}
      </VStack>

      <AddAccountModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={onRefresh}
      />
    </>
  );
};

export default AccountSection;
