import React from 'react';
import { Box, Heading, Text, Button, Avatar, useColorModeValue } from '@chakra-ui/react';
import { FcAdvance } from "react-icons/fc";

const CreerUneSci = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg={cardBg}
      borderColor={borderColor}
      p={6}
      shadow="sm"
      maxW="sm"
      mx="auto"
      my={4}
      display="flex"
      flexDirection="column"
      alignItems="start"
    >
      <Avatar name="John Doe" src="/path/to/image.jpg" size="md" mb={4} />
      <Heading size="md" fontWeight="bold" mb={2}>
        Créer une SCI
      </Heading>
      <Text fontSize="sm" mb={4}>
        Explication du projet, avantages et démarches
      </Text>
      <Button rightIcon={<FcAdvance />} colorScheme="blue" variant="ghost">
        Prendre rendez-vous
      </Button>
    </Box>
  );
};

export default CreerUneSci;
