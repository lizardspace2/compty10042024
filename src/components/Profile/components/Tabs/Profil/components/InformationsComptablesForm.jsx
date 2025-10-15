import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Select,
  useToast,
  Spinner,
  Flex,
  Box,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { useEntreprise } from '../../../../../../contexts/EntrepriseContext';
import { useAuth } from '../../../../../../contexts/AuthContext';

export function InformationsComptablesForm() {
  const { session } = useAuth();
  const { entreprise, loading, createEntreprise, updateEntreprise, refreshEntreprise } = useEntreprise();
  const toast = useToast();

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    siret: '',
    denomination: '',
    profession: '',
    aga: '',
    reference_obligation_fiscale: '',
    date_creation: '',
    forme_juridique: '',
    regime_fiscal: '',
    regime_tva: 'exonéré de TVA',
    code_ape: '',
    numero_rcs: ''
  });

  useEffect(() => {
    if (entreprise) {
      setFormData({
        siret: entreprise.siret || '',
        denomination: entreprise.denomination || '',
        profession: entreprise.profession || '',
        aga: entreprise.aga || '',
        reference_obligation_fiscale: entreprise.reference_obligation_fiscale || '',
        date_creation: entreprise.date_creation || '',
        forme_juridique: entreprise.forme_juridique || '',
        regime_fiscal: entreprise.regime_fiscal || '',
        regime_tva: entreprise.regime_tva || 'exonéré de TVA',
        code_ape: entreprise.code_ape || '',
        numero_rcs: entreprise.numero_rcs || ''
      });
    }
  }, [entreprise]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du SIRET
    if (formData.siret && formData.siret.length !== 14) {
      toast({
        title: 'Erreur',
        description: 'Le SIRET doit contenir 14 chiffres',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validation de la dénomination
    if (!formData.denomination || formData.denomination.trim() === '') {
      toast({
        title: 'Erreur',
        description: 'La dénomination est obligatoire',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSaving(true);

    let result;
    if (entreprise) {
      result = await updateEntreprise(formData);
    } else {
      result = await createEntreprise(formData);
    }

    if (result.error) {
      toast({
        title: 'Erreur',
        description: result.error.message || 'Impossible d\'enregistrer l\'entreprise',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Succès',
        description: entreprise ? 'Entreprise mise à jour avec succès' : 'Entreprise créée avec succès',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await refreshEntreprise();
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="400px">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Informations de l'entreprise</Text>

      {!entreprise && (
        <Alert status="info" mb={4} borderRadius="md">
          <AlertIcon />
          Créez votre entreprise pour accéder à toutes les fonctionnalités
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="siret">
            <FormLabel>SIRET</FormLabel>
            <Input
              placeholder="14 chiffres"
              value={formData.siret}
              onChange={handleChange}
              maxLength={14}
            />
            <Text fontSize="xs" color="gray.600" mt={1}>
              Optionnel - 14 chiffres
            </Text>
          </FormControl>

          <FormControl id="denomination" isRequired>
            <FormLabel>Nom de votre entreprise (dénomination)</FormLabel>
            <Input
              placeholder="Nom de l'entreprise"
              value={formData.denomination}
              onChange={handleChange}
            />
            <Text fontSize="sm" color="gray.600" mt={2}>
              La dénomination utilisée pour votre activité professionnelle doit inclure votre nom, ou nom d'usage, précédé ou suivi immédiatement des mots : "Entrepreneur Individuel" ou des initiales : "EI"
            </Text>
          </FormControl>

          <FormControl id="profession">
            <FormLabel>Profession</FormLabel>
            <Select
              placeholder="Sélectionnez votre profession"
              value={formData.profession}
              onChange={handleChange}
            >
              <option value="Médecin généraliste">Médecin généraliste</option>
              <option value="Médecin spécialiste">Médecin spécialiste</option>
              <option value="Dentiste">Dentiste</option>
              <option value="Kinésithérapeute">Kinésithérapeute</option>
              <option value="Infirmier">Infirmier</option>
              <option value="Avocat">Avocat</option>
              <option value="Expert-comptable">Expert-comptable</option>
              <option value="Architecte">Architecte</option>
              <option value="Consultant">Consultant</option>
              <option value="Autre">Autre</option>
            </Select>
          </FormControl>

          <FormControl id="aga">
            <FormLabel>Association de Gestion Agréée (AGA)</FormLabel>
            <Input
              placeholder="Nom de votre AGA"
              value={formData.aga}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="reference_obligation_fiscale">
            <FormLabel>Référence d'obligation fiscale</FormLabel>
            <Select
              placeholder="Sélectionnez votre régime"
              value={formData.reference_obligation_fiscale}
              onChange={handleChange}
            >
              <option value="BNC">BNC - Bénéfices Non Commerciaux</option>
              <option value="BIC">BIC - Bénéfices Industriels et Commerciaux</option>
              <option value="BA">BA - Bénéfices Agricoles</option>
            </Select>
          </FormControl>

          <FormControl id="forme_juridique">
            <FormLabel>Forme juridique</FormLabel>
            <Select
              placeholder="Sélectionnez votre forme juridique"
              value={formData.forme_juridique}
              onChange={handleChange}
            >
              <option value="Entreprise Individuelle">Entreprise Individuelle (EI)</option>
              <option value="EIRL">EIRL</option>
              <option value="Auto-entrepreneur">Auto-entrepreneur / Micro-entreprise</option>
              <option value="EURL">EURL</option>
              <option value="SARL">SARL</option>
              <option value="SAS">SAS</option>
              <option value="SASU">SASU</option>
            </Select>
          </FormControl>

          <FormControl id="regime_fiscal">
            <FormLabel>Régime fiscal</FormLabel>
            <Select
              placeholder="Sélectionnez votre régime fiscal"
              value={formData.regime_fiscal}
              onChange={handleChange}
            >
              <option value="Réel simplifié">Réel simplifié</option>
              <option value="Réel normal">Réel normal</option>
              <option value="Micro-BNC">Micro-BNC</option>
              <option value="Déclaration contrôlée">Déclaration contrôlée</option>
            </Select>
          </FormControl>

          <FormControl id="regime_tva">
            <FormLabel>Régime TVA</FormLabel>
            <Select
              value={formData.regime_tva}
              onChange={handleChange}
            >
              <option value="exonéré de TVA">Exonéré de TVA</option>
              <option value="franchise en base">Franchise en base</option>
              <option value="réel simplifié">Réel simplifié</option>
              <option value="réel normal">Réel normal</option>
            </Select>
          </FormControl>

          <FormControl id="code_ape">
            <FormLabel>Code APE</FormLabel>
            <Input
              placeholder="Ex: 6920Z"
              value={formData.code_ape}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="date_creation">
            <FormLabel>Date de création</FormLabel>
            <Input
              type="date"
              value={formData.date_creation}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="numero_rcs">
            <FormLabel>Numéro RCS</FormLabel>
            <Input
              placeholder="Numéro d'immatriculation au RCS"
              value={formData.numero_rcs}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            type="submit"
            mt={4}
            colorScheme="red"
            isLoading={saving}
            loadingText="Enregistrement..."
          >
            {entreprise ? 'Mettre à jour' : 'Créer mon entreprise'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
