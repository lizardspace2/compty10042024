import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';

const IdentiteEntrepreneur = () => {
  // You would also include state and handleChange functions for form inputs
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Identité de l'entrepreneur
      </Text>
      <Text mb={4}>
        Parfait, vous avez bien saisi les informations requises par les organismes de gestion.
      </Text>
      <VStack spacing={4}>
        <FormControl id="siret">
          <FormLabel>Siret au 31/12</FormLabel>
          <Input placeholder="Siret" defaultValue="82104845100040" />
        </FormControl>
        <FormControl id="prenom">
          <FormLabel>Prénom</FormLabel>
          <Input placeholder="Prénom" defaultValue="Guillaume" />
        </FormControl>
        <FormControl id="nom">
          <FormLabel>Nom</FormLabel>
          <Input placeholder="Nom" defaultValue="Recipon" />
        </FormControl>
        <FormControl id="numero-voie">
          <FormLabel>N° de voie</FormLabel>
          <Input placeholder="N° de voie" defaultValue="51" />
        </FormControl>
        <FormControl id="type-voie">
          <FormLabel>Type de voie</FormLabel>
          <Input placeholder="Type de voie" defaultValue="Rue" />
        </FormControl>
        <FormControl id="voie">
          <FormLabel>Voie</FormLabel>
          <Input placeholder="Voie" defaultValue="De la république" />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default IdentiteEntrepreneur;
