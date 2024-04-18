import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

const ExpenseInformation = () => {
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <VStack spacing={4} align="stretch">
        {/* You can add other form controls as needed here */}

        <FormControl id="transaction-label">
          <FormLabel>Libellé</FormLabel>
          <Input
            type="text"
            defaultValue="Prlv Sepa Symamobile Rum Recipon Guillaume Mari"
            background={inputBg}
          />
        </FormControl>

        <FormControl id="transaction-date">
          <FormLabel>Date</FormLabel>
          <Input
            type="text"
            defaultValue="09/04/2024"
            background={inputBg}
          />
        </FormControl>

        <FormControl id="transaction-amount">
          <FormLabel>Montant</FormLabel>
          <Input
            type="text"
            defaultValue="-7,99"
            background={inputBg}
          />
        </FormControl>

        <FormControl id="transaction-annotations">
          <FormLabel>Annotations</FormLabel>
          <Input
            placeholder="Ajouter des mots clés"
            background={inputBg}
          />
        </FormControl>

        <FormControl id="transaction-justifications">
          <FormLabel>Justificatifs</FormLabel>
          <Input
            placeholder="Ajouter des justificatifs"
            background={inputBg}
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ExpenseInformation;
