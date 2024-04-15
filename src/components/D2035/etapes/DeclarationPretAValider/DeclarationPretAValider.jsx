import React from 'react';
import { Box, Text, Icon, Stack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const DeclarationPretAValider = () => {
  return (
    <Box maxWidth="container.xl" mx="auto" p={5} textAlign="center">
      <Stack spacing={4} align="center">
        <Icon as={CheckCircleIcon} w={10} h={10} color="green.500" />
        <Text fontSize="2xl" fontWeight="bold">
          Votre déclaration est prête à être validée
        </Text>
        <Text>
          Vous pouvez encore modifier avant de clôturer définitivement votre déclaration.
        </Text>
      </Stack>
    </Box>
  );
};

export default DeclarationPretAValider;
