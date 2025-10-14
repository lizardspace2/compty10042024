import React from 'react';
import { Box, Text, Button, Circle, VStack, HStack } from '@chakra-ui/react';

const ValidationDocuments = () => {
  return (
    <Box
      maxWidth="md"
      mx="auto"
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="pink.500"
      textAlign="center"
    >
      <VStack spacing={4}>
        <HStack justify="center">
          <Circle size="24px" bg="red.50">
            <Text fontSize="sm">1</Text>
          </Circle>
          <Text fontSize="lg" fontWeight="semibold">
            Validation des documents
          </Text>
        </HStack>
        <Text>
          Vous avez un document généré par Compty : la déclaration 2035
        </Text>
        <Button colorScheme="pink" size="sm">
          Afficher le document à valider
        </Button>
      </VStack>
    </Box>
  );
};

export default ValidationDocuments;
