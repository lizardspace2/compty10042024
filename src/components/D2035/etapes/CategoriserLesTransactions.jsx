import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';

const CategoriserLesTransactions = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="xl" fontWeight="bold" mb={3}>
        Catégoriser toutes les transactions
      </Text>
      <Text mb={5}>
        Parfait, toutes les transactions ont bien été catégorisées.
      </Text>
      <Button
        rightIcon={<MdArrowForward />}
        colorScheme="pink"
        variant="solid"
      >
        Passer à l'étape suivante
      </Button>
    </Box>
  );
};

export default CategoriserLesTransactions;
