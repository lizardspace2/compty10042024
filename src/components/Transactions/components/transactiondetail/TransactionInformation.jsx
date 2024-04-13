import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FcLock } from 'react-icons/fc'; // Import FcLock icon

const TransactionInformation = () => {
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <VStack spacing={4} align="stretch">
        {/* ... other form controls ... */}

        <FormControl id="transaction-label" position="relative">
          <FormLabel>Libellé</FormLabel>
          <Input
            type="text"
            value="Prlv Sepa Symamobile Rum Recipon Guillaume Mari"
            isReadOnly
            background={inputBg}
          />
          <IconButton
            aria-label="Locked label"
            icon={<FcLock />}
            size="sm"
            variant="ghost"
            position="absolute"
            right="4"
            top="10"
            pointerEvents="none" // Icon is for display only, no interaction
          />
        </FormControl>

        <FormControl id="transaction-date" position="relative">
          <FormLabel>Date</FormLabel>
          <Input
            type="text"
            value="09/04/2024"
            isReadOnly
            background={inputBg}
          />
          <IconButton
            aria-label="Locked date"
            icon={<FcLock />}
            size="sm"
            variant="ghost"
            position="absolute"
            right="4"
            top="10"
            pointerEvents="none"
          />
        </FormControl>

        <FormControl id="transaction-amount" position="relative">
          <FormLabel>Montant</FormLabel>
          <Input
            type="text"
            value="-7,99"
            isReadOnly
            background={inputBg}
          />
          <IconButton
            aria-label="Locked amount"
            icon={<FcLock />}
            size="sm"
            variant="ghost"
            position="absolute"
            right="4"
            top="10"
            pointerEvents="none"
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
