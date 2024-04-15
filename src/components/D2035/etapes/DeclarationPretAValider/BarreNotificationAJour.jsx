import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const BarreNotificationAJour = () => {
  return (
    <Box
      bg={useColorModeValue('blue.800', 'blue.900')}
      w="100%"
      p={4}
      color="white"
      textAlign="center"
      borderRadius="md"
    >
      <Text>
        Vous êtes à jour Guillaume, profitez !
      </Text>
    </Box>
  );
};

export default BarreNotificationAJour;
