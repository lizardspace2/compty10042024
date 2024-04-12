import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcDocument, FcDownload } from "react-icons/fc";

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
        
        <Box>
          <Flex alignItems="center" justifyContent="flex-end">
            <Text fontSize="sm" color="gray.500" mr={2}>{detailLabel}</Text>
            <Text fontWeight="bold">{detailValue}</Text>
          </Flex>
        </Box>

        <Box>
          <Button leftIcon={<Icon as={FcDownload} />} colorScheme="teal" variant="outline" size="sm">
            {buttonText}
          </Button>
        </Box>
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
