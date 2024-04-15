import React from 'react';
import { Box, Flex, Text, Button, useColorModeValue, Icon } from '@chakra-ui/react';
import { MdArrowBack, MdArrowForward, MdEdit } from 'react-icons/md';

const ChequeNonEncaisse = () => {
  const bgPrevButton = useColorModeValue('gray.200', 'gray.700');
  const bgEditButton = useColorModeValue('orange.200', 'orange.700');

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Ventiler les échéances d'emprunts
      </Text>
      <Text mb={4}>
        Parfait, il n'y a aucune échéance d'emprunt non ventilée.
      </Text>
      <Flex justifyContent="space-between" mt={4}>
        <Button
          leftIcon={<Icon as={MdArrowBack} />}
          colorScheme="gray"
          variant="outline"
          bg={bgPrevButton}
        >
          Étape précédente
        </Button>
        <Button
          leftIcon={<Icon as={MdEdit} />}
          colorScheme="orange"
          variant="outline"
          bg={bgEditButton}
        >
          Modifier cette étape
        </Button>
        <Button
          rightIcon={<Icon as={MdArrowForward} />}
          colorScheme="pink"
          variant="solid"
        >
          Passer à l'étape suivante
        </Button>
      </Flex>
    </Box>
  );
};

export default ChequeNonEncaisse;
