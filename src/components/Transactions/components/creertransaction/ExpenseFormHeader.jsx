import React from 'react';
import { Box, Heading, Button, Flex } from '@chakra-ui/react';

const ExpenseFormHeader = ({ onClose, onAdd }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4} bg="red.50" boxShadow="md">
      <Heading as="h3" size="lg">
        Ajout d'une dépense professionnelle
      </Heading>
      <Box>
        <Button mr={3} onClick={onClose}>
          Fermer
        </Button>
        <Button colorScheme="pink" onClick={onAdd}>
          Ajouter
        </Button>
      </Box>
    </Flex>
  );
};

export default ExpenseFormHeader;
