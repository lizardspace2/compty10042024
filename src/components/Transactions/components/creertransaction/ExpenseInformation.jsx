import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for react-datepicker
import { chakra } from "@chakra-ui/react";

const ChakraDatePicker = chakra(DatePicker);

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
          <ChakraDatePicker
            selected={new Date()}
            onChange={(date) => {}}
            dateFormat="dd/MM/yyyy"
            customInput={<Input background={inputBg} readOnly />}
            popperPlacement="bottom-start"
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
