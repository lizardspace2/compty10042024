import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

const Modifier = () => {
  return (
    <Flex justify="space-between" mt={4}>
      <Button leftIcon={<MdArrowBack />} variant="outline" colorScheme="gray">
        Étape précédente
      </Button>
      <Button variant="outline" colorScheme="orange">
        Modifier cette étape
      </Button>
      <Button rightIcon={<MdArrowForward />} colorScheme="pink" variant="solid">
        Passer à l'étape suivante
      </Button>
    </Flex>
  );
};

export default Modifier;
