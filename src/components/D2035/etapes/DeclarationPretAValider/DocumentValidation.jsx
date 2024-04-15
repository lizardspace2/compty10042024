import React from 'react';
import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const DocumentValidation = () => {
  // Define background and color based on the theme (light/dark)
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('green.500', 'green.200');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      textAlign="center"
      bg={bgColor}
      m={4}
    >
      <CheckIcon color={color} boxSize={6} mb={3} />
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        Validation des documents
      </Text>
      <Text mb={4}>
        Vous avez un document généré par Compty : la déclaration 2035
      </Text>
      <Button colorScheme="teal" variant="solid">
        Vérifier le document
      </Button>
    </Box>
  );
};

export default DocumentValidation;
