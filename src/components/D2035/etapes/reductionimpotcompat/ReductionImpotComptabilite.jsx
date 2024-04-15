import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ReductionImpotComptabilite = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Réductions d'impôt pour les frais de comptabilité
      </Text>
      <Text>
        Dans la mesure où votre chiffre d'affaires dépasse le seuil micro-bnc, vous n'êtes pas éligible à la réduction d'impôts pour frais de comptabilité.
      </Text>
    </Box>
  );
};

export default ReductionImpotComptabilite;
