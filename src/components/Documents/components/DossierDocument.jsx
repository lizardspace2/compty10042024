import React from 'react';
import { Box, Flex, Text, Button, Badge, Icon, useColorModeValue, Stack } from '@chakra-ui/react';
import { FcFolder } from 'react-icons/fc'; // Using a file icon as a placeholder
import { IoCloudDownloadOutline } from 'react-icons/io5'; // For the download icon

const DossierDocument = () => {
  const boxBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      w="full"
      bg={boxBg}
      borderColor={borderColor}
      p={4}
      shadow="sm"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex align="center">
        <Icon as={FcFolder} boxSize={6} mr={2} />
        <Text fontWeight="bold" mr={2}>DAS2</Text>
        <Badge colorScheme="green">Clôturée</Badge>
      </Flex>
      <Flex>
      <Button leftIcon={<Icon as={IoCloudDownloadOutline} />} colorScheme="teal" variant="outline" size="sm">
        </Button>
        <Stack w={2}/>
        <Button colorScheme="blue" variant="solid" size="sm">
          Visualiser
        </Button>
      </Flex>
    </Box>
  );
};

export default DossierDocument;
