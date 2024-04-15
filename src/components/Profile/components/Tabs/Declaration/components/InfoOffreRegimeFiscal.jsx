import React from 'react';
import { Box, Link, Text, useColorModeValue } from '@chakra-ui/react';

const InfoOffreRegimeFiscal = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={4}
      backgroundColor={bgColor}
      borderRadius="md"
      border="1px"
      borderColor={borderColor}
      mb={4}
    >
      <Text fontSize="md">
        Compty propose une offre adaptée à votre régime d'imposition: micro ou déclaration contrôlée.{' '}
        <Link color="teal.500" href="#abonnement">
          Passez au régime de la déclaration contrôlée, depuis l'onglet Abonnement.
        </Link>
      </Text>
    </Box>
  );
};

export default InfoOffreRegimeFiscal;
