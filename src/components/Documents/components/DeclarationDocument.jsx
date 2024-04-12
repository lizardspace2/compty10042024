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
import { IoCloudDownloadOutline } from "react-icons/io5";

const DottedBox = ({ label, value, status, buttonText }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      p={2}
      borderWidth="1px"
      borderRadius="lg"
      borderStyle="dotted"
      borderColor="gray.200"
    >
      <Text fontSize="sm" color="gray.500">{label}</Text>
      <Flex align="center">
        <Badge colorScheme="orange" mr={2}>{status}</Badge>
        <Text fontWeight="bold" mr={4}>{value}</Text>
        <Button colorScheme="blue" variant="outline" size="sm">
          {buttonText}
        </Button>
      </Flex>
    </Flex>
  );
};

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
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center">
          <Icon as={FcDocument} boxSize={6} mr={3} />
          <Box>
            <Text fontWeight="bold" display="inline-block" mr={3}>{title}</Text>
          <Badge colorScheme="orange">{status}</Badge>
          </Box>
        </Flex>
        <Stack direction="row" spacing={2}>
          <Button leftIcon={<Icon as={IoCloudDownloadOutline} />} colorScheme="teal" variant="outline" size="sm">
            {/* This button is for downloading */}
          </Button>
          <Button colorScheme="blue" variant="solid" size="sm">
            {buttonText}
        </Button>
        </Stack>
      </Flex>
      <DottedBox
        label={detailLabel}
        value={detailValue}
        status={status}
        buttonText={buttonText}
      />
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
