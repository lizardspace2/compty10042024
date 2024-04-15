import React from 'react';
import { Button, Flex, Spacer } from '@chakra-ui/react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

const Etape4 = () => {
  return (
    <Flex>
      <Button leftIcon={<MdArrowBack />} variant="outline" colorScheme="gray" m={2}>
        Étape précédente
      </Button>
      <Spacer />
      <Button rightIcon={<MdArrowForward />} colorScheme="pink" variant="solid" m={2}>
        Passer à l'étape suivante
      </Button>
    </Flex>
  );
};

export default Etape4;
