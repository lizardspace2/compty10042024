import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

const PasDeFraisDeBlanchissage = () => {
  return (
    <Flex justify="space-between" mt={4}>
      <Button leftIcon={<MdArrowBack />} variant="outline" colorScheme="gray">
        Étape précédente
      </Button>
      <Button rightIcon={<MdArrowForward />} colorScheme="pink" variant="solid">
        Valider et passer à l'étape suivante
      </Button>
    </Flex>
  );
};

export default PasDeFraisDeBlanchissage;
