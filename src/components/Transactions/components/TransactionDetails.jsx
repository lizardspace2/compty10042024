import React from 'react';
import {
  Box,
  Button,
  CloseButton,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import FilterPanel from './FilterPanel';

const TransactionDetails = ({ onClose }) => {
  const boxBg = useColorModeValue('white', 'gray.700');

  return (
<Box
      width="100%"
      maxW="400px"
      p={4}
      position="relative"
      bg="white"
      h="100vh"
    >
      <CloseButton position="absolute" right="4" top="4" onClick={onClose} />
      <Heading size="md" mb={4}>
        Transaction Details
      </Heading>
      <FilterPanel/>
    </Box>
  );
};

export default TransactionDetails;
