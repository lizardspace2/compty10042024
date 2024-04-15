import React from 'react';
import { Box, Button, Flex, Text, Image, Heading } from '@chakra-ui/react';
import { FaCcVisa } from 'react-icons/fa';

export function PaymentMethod() {
  return (
    <Box  borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Heading size="md" mb={4}>Moyen de paiement</Heading>
      <Flex align="center" justify="space-between" mb={4}>
        <Flex align="center">
          <Box as={FaCcVisa} size="24px" color="gray.600" mr={2} />
          <Box>
            <Text fontWeight="bold">Visa **** 6654</Text>
            <Text fontSize="sm" color="gray.600">Expire le 06/28</Text>
          </Box>
        </Flex>
        <Button size="sm">Changer</Button>
      </Flex>
      <Button colorScheme="red" variant="outline" width="full">
        Annuler l'abonnement
      </Button>
    </Box>
  );
}
