import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const SaisieCompteCommunSCM = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold">
        Saisie du compte commun ou de la SCM
      </Text>
      <Text mt={2}>
        Parfait, vous avez indiqué ne pas avoir de déclaration 2036 à saisir.
      </Text>
    </Box>
  );
};

export default SaisieCompteCommunSCM;
