import React from 'react';
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { IoIosCash } from 'react-icons/io';

const RevenueComponent = ({ amount, currency }) => {
  return (
    <Box p={4} boxShadow="md" borderRadius="md" display="flex" alignItems="center">
      <IoIosCash size="2em" color="#abe3fd" />
      <Stat ml={2}>
        <StatLabel color="gray.500">Revenues</StatLabel>
        <StatNumber fontSize="2xl">
          20 000 €
        </StatNumber>
      </Stat>
    </Box>
  );
};

export default RevenueComponent;

