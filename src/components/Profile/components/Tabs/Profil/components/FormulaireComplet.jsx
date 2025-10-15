import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  useToast,
  Spinner,
  Flex,
  Text,
  Box
} from '@chakra-ui/react';
import { useAuth } from '../../../../../../contexts/AuthContext';
import { getProfile, updateProfile, createProfile } from '../../../../../../services/profileService';

export function FormulaireComplet() {
  const { session } = useAuth();
  const toast = useToast();
  const buttonBg = useColorModeValue("red.500", "red.200");
  const buttonColor = useColorModeValue("white", "gray.800");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    street_number: '',
    street_type: '',
    street_name: '',
    postal_code: '',
    city: '',
    country: 'France'
  });

  useEffect(() => {
    if (session?.user?.id) {
      loadProfile();
    }
  }, [session]);

  const loadProfile = async () => {
    setLoading(true);
    const { data, error } = await getProfile(session.user.id);

    if (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }

    if (data) {
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || session.user.email || '',
        phone: data.phone || '',
        street_number: data.street_number || '',
        street_type: data.street_type || '',
        street_name: data.street_name || '',
        postal_code: data.postal_code || '',
        city: data.city || '',
        country: data.country || 'France'
      });
    } else {
      // Initialiser avec l'email de l'utilisateur
      setFormData(prev => ({
        ...prev,
        email: session.user.email || ''
      }));
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Créer le full_name à partir du prénom et nom
    const profileData = {
      ...formData,
      full_name: `${formData.first_name} ${formData.last_name}`.trim(),
      address: `${formData.street_number} ${formData.street_type} ${formData.street_name}`.trim()
    };

    // Vérifier si le profil existe déjà
    const { data: existingProfile } = await getProfile(session.user.id);

    let result;
    if (existingProfile) {
      result = await updateProfile(session.user.id, profileData);
    } else {
      result = await createProfile(profileData);
    }

    if (result.error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'enregistrer le profil',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Profil enregistré avec succès',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      loadProfile();
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
    <Box mb={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Informations personnelles</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="first_name" isRequired>
            <FormLabel>Prénom</FormLabel>
            <Input
              placeholder="Prénom"
              value={formData.first_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="last_name" isRequired>
            <FormLabel>Nom</FormLabel>
            <Input
              placeholder="Nom"
              value={formData.last_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="email@exemple.fr"
              value={formData.email}
              onChange={handleChange}
              isReadOnly
              bg="gray.50"
            />
          </FormControl>
          <FormControl id="phone">
            <FormLabel>Téléphone</FormLabel>
            <Input
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="adresse">
            <FormLabel>Adresse</FormLabel>
            <HStack spacing={3}>
              <Input
                id="street_number"
                placeholder="N°"
                value={formData.street_number}
                onChange={handleChange}
              />
              <Input
                id="street_type"
                placeholder="Type de voie"
                value={formData.street_type}
                onChange={handleChange}
              />
              <Input
                id="street_name"
                placeholder="Nom de la voie / Lieu dit"
                value={formData.street_name}
                onChange={handleChange}
              />
            </HStack>
          </FormControl>
          <HStack spacing={3}>
            <FormControl id="postal_code" flex="1">
              <FormLabel>Code postal</FormLabel>
              <Input
                placeholder="Code postal"
                value={formData.postal_code}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="city" flex="2">
              <FormLabel>Ville</FormLabel>
              <Input
                placeholder="Ville"
                value={formData.city}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>
          <Button
            type="submit"
            mt={4}
            bg={buttonBg}
            color={buttonColor}
            isLoading={saving}
            loadingText="Enregistrement..."
            _hover={{
              bg: useColorModeValue("red.600", "red.300"),
            }}>
            Enregistrer
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
