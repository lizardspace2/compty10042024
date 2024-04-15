import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';

const InformationsActivite = () => {
  // Add state and handleChange functions if this form should be editable
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Informations relatives à l'activité
      </Text>
      <Text mb={4}>
        Parfait, vous avez bien saisi les informations requises par les organismes de gestion.
      </Text>
      <VStack spacing={4}>
        <FormControl id="forme-juridique">
          <FormLabel>Forme juridique</FormLabel>
          <Input placeholder="Forme juridique" defaultValue="Entreprise Individuelle" isReadOnly />
        </FormControl>
        <FormControl id="date-debut-activite">
          <FormLabel>Date de début de votre activité libérale</FormLabel>
          <Input placeholder="Date de début" defaultValue="01/05/2016" type="date" isReadOnly />
        </FormControl>
        <FormControl id="reference-obligation-fiscale">
          <FormLabel>Référence d'obligation fiscale</FormLabel>
          <Input placeholder="Référence d'obligation fiscale" defaultValue="BNC1" isReadOnly />
        </FormControl>
        <FormControl id="code-naf-ape">
          <FormLabel>Code NAF / APE</FormLabel>
          <Input placeholder="Code NAF / APE" defaultValue="8622C" isReadOnly />
        </FormControl>
        <FormControl id="secteur-conventionnel">
          <FormLabel>Secteur conventionnel</FormLabel>
          <Input placeholder="Secteur conventionnel" defaultValue="C1 - Je suis médecin secteur 1 sans droit à dépassement" isReadOnly />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default InformationsActivite;
