import React, { useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

const PasDeFraisDeBlanchissage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the submission, e.g., updating the state, sending to an API, etc.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box maxWidth="container.xl" mx="auto" p={5}>
        <Text fontSize="2xl" fontWeight="bold" mb={3}>
          Saisir les frais de blanchissage à domicile
        </Text>
        <Text>Parfait, vous avez indiqué avoir saisi tous vos frais de blanchissage à domicile de l'année.</Text>
      </Box>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit} maxWidth="container.xl" mx="auto" p={5}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Saisir les frais de blanchissage à domicile
        </Text>
        <Text>
          Vous portez un vêtement spécifique nécessaire par l'exercice de votre profession ?
          Vous pouvez déduire les frais de blanchissage à domicile.
        </Text>
        {/* More informative text can be included here. */}
        <FormControl isRequired>
          <FormLabel htmlFor="label">Libellé</FormLabel>
          <Input id="label" placeholder="Libellé..." />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="amount">Montant</FormLabel>
          <Input id="amount" placeholder="Montant..." type="number" />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Valider
        </Button>
      </VStack>
    </Box>
  );
};

export default PasDeFraisDeBlanchissage;
