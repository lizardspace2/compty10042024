import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  IconButton,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaPencilAlt } from 'react-icons/fa'; 

const TransactionInformation = () => {
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <VStack spacing={4} align="stretch">
        {/* ... rest of the form controls ... */}
        
        <FormControl id="transaction-label">
          <FormLabel>Libellé</FormLabel>
          <Input
            type="text"
            value="Prlv Sepa Symamobile Rum Recipon Guillaume Mari"
            isReadOnly
            background={inputBg}
          />
          <IconButton
            aria-label="Edit label"
            icon={<FaPencilAlt />} // Use the imported icon here
            size="sm"
            variant="ghost"
            position="absolute"
            right="4"
            top="2"
          />
        </FormControl>

        <FormControl id="transaction-date">
          <FormLabel>Date</FormLabel>
          <Input
            type="text"
            value="09/04/2024"
            isReadOnly
            background={inputBg}
          />
          <IconButton
            aria-label="Edit date"
            icon={<FaPencilAlt />} 
            size="sm"
            variant="ghost"
            position="absolute"
            right="4"
            top="10"
          />
        </FormControl>

        <FormControl id="transaction-amount">
          <FormLabel>Montant</FormLabel>
          <Input
            type="text"
            value="-7,99"
            isReadOnly
            background={inputBg}
          />
          <IconButton
            aria-label="Edit amount"
            icon={<FaPencilAlt />} 
            size="sm"
            variant="ghost"
            position="absolute"
            right="4"
            top="18"
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

export default TransactionInformation;
