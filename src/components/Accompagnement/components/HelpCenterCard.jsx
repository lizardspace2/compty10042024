import React from 'react';
import { Box, Text, useColorModeValue, Icon } from '@chakra-ui/react';
import { MdHelpOutline } from 'react-icons/md'; // Example icon

const HelpCenterCard = () => {
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
      <Icon as={MdHelpOutline} color="black" boxSize={10} />
      <Text fontWeight="bold" mt={3} mb={1}>
        Centre d'aide
      </Text>
      <Text fontSize="sm" color="gray.600">
        Une interrogation sur votre comptabilité ? Notre centre d'aide vous aide à trouver la solution la plus adaptée à votre situation
      </Text>
    </Box>
  );
};

export default HelpCenterCard;
