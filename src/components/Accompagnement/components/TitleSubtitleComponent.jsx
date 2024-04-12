import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const TitleSubtitleComponent = () => {
  return (
    <Box p={5}>
      <Heading as="h1"fontWeight="bold" mb={3}>
        Mes premiers pas sur Indy
      </Heading>
      <Text  color="gray.600">
        Gérer sa comptabilité en toute sérénité
      </Text>
    </Box>
  );
};

export default TitleSubtitleComponent;
