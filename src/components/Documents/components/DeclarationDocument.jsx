import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Badge,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { FcDocument } from "react-icons/fc";
import { IoCloudDownloadOutline } from "react-icons/io5"; // Assuming you want to use an alternative download icon

const TaskCard = ({
  title,
  status,
  detailLabel,
  detailValue,
  buttonText
}) => {
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
      position="relative"
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Icon as={FcDocument} boxSize={6} mr={3} />
          <Box>
            <Text fontWeight="bold" display="inline-block" mr={3}>{title}</Text>
            <Badge colorScheme="orange">{status}</Badge>
          </Box>
        </Flex>
        
        <Flex alignItems="center">
          <Text fontSize="sm" color="gray.500" mr={2}>{detailLabel}</Text>
          <Text fontWeight="bold" mr={8}>{detailValue}</Text>
        </Flex>

        <Stack direction="row" spacing={2}>
          <Button leftIcon={<Icon as={IoCloudDownloadOutline} />} colorScheme="teal" variant="outline" size="sm">
            {/* This button could be for downloading */}
          </Button>
          <Button colorScheme="blue" variant="solid" size="sm">
            {buttonText}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

// Usage example
const DeclarationDocument = () => {
  return (
    <Box p={5}>
      <TaskCard
        title="Déclaration 2035"
        status="Non clôturée"
        detailLabel="Bénéfice"
        detailValue="79 090 €"
        buttonText="Visualiser"
      />
    </Box>
  );
};

export default DeclarationDocument;
