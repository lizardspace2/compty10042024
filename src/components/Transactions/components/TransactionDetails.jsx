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
    _before={{
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "1px",
        bg: "gray.200",
      }}
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
