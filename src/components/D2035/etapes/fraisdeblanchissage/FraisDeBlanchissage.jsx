import React, { useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  useToast
} from '@chakra-ui/react';

const FraisDeBlanchissage = () => {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the data
    console.log({ label, amount });

    // Show a toast on success
    toast({
      title: "Expense added.",
      description: "Your laundry expense has been added successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Saisir les frais de blanchissage à domicile
      </Text>
      <Text mb={4}>
        Vous portez un vêtement spécifique nécessaire par l'exercice de votre profession ? Vous pouvez déduire les frais de blanchissage à domicile.
        La loi dit qu'il est admis que les frais de blanchissage de linge professionnel à domicile soient évalués par référence au tarif pratiqué par les blanchisseurs, à la condition que la trace des calculs soit conservée par une mention mensuelle dans le livre-journal. (Par exemple: 15 blouses à 3€)
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="label">
            <FormLabel>Libellé</FormLabel>
            <Input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Libellé..."
              required
            />
          </FormControl>
          <FormControl id="amount">
            <FormLabel>Montant</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Montant..."
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="md">
            Valider
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FraisDeBlanchissage;
