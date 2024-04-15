import React from 'react';
import { Box, Text, Flex, Badge, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const CotisationsFacultativesDeductibles = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Cotisations facultatives déductibles
      </Text>
      <Text mb={4}>
        Parfait, vous avez saisi vos cotisations déductibles. Inovy a ainsi retiré la part non déductible.
      </Text>
      <Flex alignItems="center" justifyContent="space-between" p={3} borderWidth="1px" borderRadius="md" mb={3}>
        <Flex alignItems="center">
          <Badge colorScheme="green" mr={3}><CheckCircleIcon /></Badge>
          <Text>Retrairement Part Non Déductible Madelin</Text>
        </Flex>
        <Text>95,54 €</Text>
      </Flex>
      <Flex justifyContent="space-between" p={3} borderWidth="1px" borderRadius="md">
        <Text>Compte de l'exploitant</Text>
        <Text>-95,54 €</Text>
      </Flex>
    </Box>
  );
};

export default CotisationsFacultativesDeductibles;
