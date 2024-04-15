import React from 'react';
import { Box, Text, Button, Icon } from '@chakra-ui/react';
import { AiOutlineHeart } from 'react-icons/ai';

export function ParrainezVosProches() {
  return (
    <Box  borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} textAlign="center">
      <Icon as={AiOutlineHeart} boxSize={6} color="gray.600" mb={2} />
      <Text mb={4}>
        Parlez d'Compty autour de vous et faites-vous rembourser votre prochaine facture.
      </Text>
      <Button colorScheme="teal" variant="outline">
        Parrainez vos proches
      </Button>
    </Box>
  );
}
