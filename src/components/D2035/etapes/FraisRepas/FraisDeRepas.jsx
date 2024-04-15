import React from 'react';
import { Box, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

const FraisDeRepas = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" mb={3}>
        Ventiler les repas hors domicile
      </Text>
      <Text mb={6}>
        Parfait, il n'y a aucun frais de repas hors domicile non ventilé.
      </Text>
      <Flex justify="space-between" mt={10}>
        <Button leftIcon={<MdArrowBack />} variant="outline" colorScheme="gray">
          Étape précédente
        </Button>
        <Spacer />
        <Button rightIcon={<MdArrowForward />} colorScheme="pink" variant="solid">
          Passer à l'étape suivante
        </Button>
      </Flex>
    </Box>
  );
};

export default FraisDeRepas;
