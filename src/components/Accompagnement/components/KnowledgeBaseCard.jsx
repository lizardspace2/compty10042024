import React from 'react';
import { Box, Text, useColorModeValue, Icon } from '@chakra-ui/react';
import { FaLightbulb } from 'react-icons/fa'; // This is a placeholder icon

const KnowledgeBaseCard = () => {
  const boxBg = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('red.100', 'gray.600');
  const cardShadow = useColorModeValue('md', 'dark-lg');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg={boxBg}
      borderColor={borderColor}
      p={6}
      shadow={cardShadow}
      maxW="sm"
      mx="auto"
    >
      <Icon as={FaLightbulb} color="yellow.400" boxSize={6} />
      <Text fontWeight="bold" mt={3} mb={2}>
        Les bases de la comptabilité
      </Text>
      <Text fontSize="sm" color="gray.600">
        Charges déductibles, frais de véhicule : tout ce qu'il faut savoir pour optimiser votre comptabilité
      </Text>
      <Text color="gray.500" mt={4}>
        31 articles
      </Text>
    </Box>
  );
};

export default KnowledgeBaseCard;
