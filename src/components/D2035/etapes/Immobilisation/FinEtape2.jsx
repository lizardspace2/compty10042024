import React from 'react';
import { ButtonGroup, Button, Icon } from '@chakra-ui/react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

const FinEtape2 = () => {
  return (
    <ButtonGroup spacing={4} display="flex" justifyContent="center">
      <Button leftIcon={<MdArrowBack />} variant="outline" colorScheme="gray">
        Étape précédente
      </Button>
      <Button variant="outline" colorScheme="orange">
        Modifier cette étape
      </Button>
      <Button rightIcon={<MdArrowForward />} colorScheme="pink" variant="solid">
        Passer à l'étape suivante
      </Button>
    </ButtonGroup>
  );
};

export default FinEtape2;
