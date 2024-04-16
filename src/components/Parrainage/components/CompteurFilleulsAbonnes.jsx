import React from 'react';
import { Box, Text, Circle, VStack } from '@chakra-ui/react';

const CompteurFilleulsAbonnes = () => {
  // Assuming the count is a state variable, initialize with 0 for demonstration
  // This count would typically come from props or be managed in state
  const count = 0;

  return (
    <VStack
      spacing={2}
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      align="center"
    >
      <Circle
        size="40px"
        bg="orange.100"
        color="orange.600"
      >
        <Text fontSize="sm" fontWeight="bold">{count}</Text>
      </Circle>
      <Text fontSize="sm" color="gray.600">filleul Abonnes</Text>
    </VStack>
  );
};

export default CompteurFilleulsAbonnes;
