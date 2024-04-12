import React from 'react';
import { Box, Heading, Text, Button, Avatar, useColorModeValue } from '@chakra-ui/react';
import { FcAdvance } from "react-icons/fc";

const CreerUneSociete = () => {
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
      <Avatar name="John Doe" src="/path/to/avatar.jpg" size="md" mb={4} /> {/* Replace with actual path to the image */}
      <Heading size="md" fontWeight="bold" mb={2}>
        Créer une société
      </Heading>
      <Text fontSize="sm" mb={4}>
        SAS, SARL, EURL, EI... Besoin d'aide pour vous lancer ? Nos équipes vous accompagnent dans vos projets
      </Text>
      <Button rightIcon={<FcAdvance />} colorScheme="blue" variant="ghost">
        Prendre rendez-vous
      </Button>
    </Box>
  );
};

export default CreerUneSociete;
