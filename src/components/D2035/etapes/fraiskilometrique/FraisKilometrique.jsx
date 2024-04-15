import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const FraisKilometrique = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={3}>
        Barème kilométrique forfaitaire
      </Text>
      <Text>
        Parfait, vous n'avez pas besoin de remplir cette étape car vous n'avez pas opté pour le barème kilométrique.
      </Text>
    </Box>
  );
};

export default FraisKilometrique;
