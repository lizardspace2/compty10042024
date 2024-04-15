import React, { useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Flex,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';

const EvolutionDeLaCaisse = () => {
  const [initialBalance, setInitialBalance] = useState('');
  const [finalBalance, setFinalBalance] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the data here, or set up state for API call
    console.log('Initial Balance:', initialBalance);
    console.log('Final Balance:', finalBalance);
    // You would typically handle the form submission here
  };

  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Évolution de la caisse
      </Text>
      <Text mb={4}>
        Indiquez le montant total d'espèces contenu dans votre tiroir-caisse en fin d'exercice 2023.
        Si vous n'aviez pas d'espèces, indiquez simplement zéro. Nous enregistrerons l'initialisation du solde et la variation globale en 2023.
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex justifyContent="space-between">
          <FormControl id="initial-balance" width="45%">
            <FormLabel>Solde initial</FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input type="number" placeholder="Solde au 01/01/23" value={initialBalance} onChange={(e) => setInitialBalance(e.target.value)} />
            </InputGroup>
          </FormControl>
          <FormControl id="final-balance" width="45%">
            <FormLabel>Solde final</FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input type="number" placeholder="Solde au 01/01/24" value={finalBalance} onChange={(e) => setFinalBalance(e.target.value)} />
            </InputGroup>
          </FormControl>
        </Flex>
        <Input mt={4} type="submit" value="Enregistrer" colorScheme="blue" />
      </form>
    </Box>
  );
};

export default EvolutionDeLaCaisse;
