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
  const boxShadow = useColorModeValue('md', 'dark-lg');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      w="full"
      bg={boxBg}
      boxShadow={boxShadow}
      borderColor={borderColor}
      align="center"
      justify="space-between"
      p={4}
    >
      <Flex align="center">
        <Icon as={FcDocument} boxSize={6} />
        <Box ml={2}>
          <Text fontWeight="bold">{title}</Text>
          <Badge colorScheme="orange" ml={1} mt={1}>
            {status}
          </Badge>
        </Box>
      </Flex>
      
      <Flex align="center">
        <Text>{detailLabel}</Text>
        <Text fontWeight="bold" ml={1}>
          {detailValue}
        </Text>
      </Flex>

      <Flex align="center">
        <Button leftIcon={<Icon as={FcDownload} />} colorScheme="teal" variant="outline" size="sm" mr={2}>
          {buttonText}
        </Button>
        <Icon as={FcDownload} boxSize={5} />
      </Flex>
    </Flex>
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
