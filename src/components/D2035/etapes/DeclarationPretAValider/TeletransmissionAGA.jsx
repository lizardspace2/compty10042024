import React from 'react';
import { Box, Text, Button, Circle, VStack, HStack } from '@chakra-ui/react';

const TeletransmissionAGA = () => {
  return (
    <Box
      maxWidth="md"
      mx="auto"
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="blue.300"
      textAlign="center"
    >
      <VStack spacing={4}>
        <HStack justify="center">
          <Circle size="24px" bg="red.50">
            <Text fontSize="sm">2</Text>
          </Circle>
          <Text fontSize="lg" fontWeight="semibold">
            Télètransmission à votre AGA
          </Text>
        </HStack>
        <Text>
          Compty peut télètransmettre vos documents. Il ne vous reste qu'à valider l'envoi de votre liasse fiscale à votre AGA. Elle s'occupera par la suite de les télètransmettre au service des impôts.
        </Text>
        <Button colorScheme="blue" size="sm">
          Clôturer et télètransmettre ma déclaration
        </Button>
        <Button variant="outline" colorScheme="blue" size="sm">
          Clôturer sans télètransmettre
        </Button>
      </VStack>
    </Box>
  );
};

export default TeletransmissionAGA;
