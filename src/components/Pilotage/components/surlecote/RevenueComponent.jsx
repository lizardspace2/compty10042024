import React from 'react';
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { IoIosCash } from 'react-icons/io';

const RevenueComponent = ({ amount, currency }) => {
  return (
    <Box
      p={2} // smaller padding
      boxShadow="md"
      borderRadius="md"
      display="flex"
      alignItems="center"
      border="1px" // 1px border
      borderColor="gray.200" // light gray border color
      width="auto" // width adjusted to content
      bg="white" // white background
      maxW="200px"
    >
      <Box color="#abe3fd" mr={2}>
        <IoIosCash size="1.5em" /> {/* Adjust icon size as needed */}
      </Box>
      <Stat>
        <StatLabel color="gray.500" fontSize="sm">Revenues</StatLabel>
        <StatNumber fontSize="lg" lineHeight="1.1em">
          127 €
        </StatNumber>
      </Stat>
    </Box>
  );
};

export default RevenueComponent;

