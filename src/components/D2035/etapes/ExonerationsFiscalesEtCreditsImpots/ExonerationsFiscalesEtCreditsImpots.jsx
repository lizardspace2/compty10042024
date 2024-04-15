import React from 'react';
import { Box, Text, Flex, Badge } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const ExonerationsFiscalesEtCreditsImpots = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Exonérations fiscales et crédits d'impôts
      </Text>
      <Text mb={4}>
        Vos exonérations fiscales diminuent vos recettes, donc votre base d'imposition. Vos crédits d'impôt diminuent directement votre impôt.
      </Text>
      <Flex alignItems="center" justifyContent="space-between" p={3} borderWidth="1px" borderRadius="md" mb={3}>
        <Flex alignItems="center">
          <Badge colorScheme="gray" mr={3}><EditIcon /></Badge>
          <Text>Déductions Médecins Conventionnés De Secteur I</Text>
        </Flex>
        <Text>-9 313,00 €</Text>
      </Flex>
      <Flex justifyContent="space-between" p={3} borderWidth="1px" borderRadius="md">
        <Text>Compte de l'exploitant</Text>
        <Text>9 313,00 €</Text>
      </Flex>
    </Box>
  );
};

export default ExonerationsFiscalesEtCreditsImpots;
