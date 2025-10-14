import React from 'react';
import { Box, Text, Circle, VStack } from '@chakra-ui/react';

const CompteurFilleulsInscrits = () => {
  // Assuming the count is a state variable, initialize with 0 for demonstration
  // This count would typically come from props or be managed in state
  const count = 0;

  return (
    <VStack
      spacing={2}
      p={4}
      bg="red.50"
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
      <Text fontSize="sm" color="gray.600">filleul inscrit</Text>
    </VStack>
  );
};

export default CompteurFilleulsInscrits;
