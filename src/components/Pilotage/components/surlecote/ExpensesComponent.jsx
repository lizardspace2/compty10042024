import React from 'react';
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { IoMdRemoveCircleOutline } from 'react-icons/io'; // Change to an appropriate icon for expenses

const ExpensesComponent = ({ amount, currency }) => {
  return (
    <Box
      p={2} // Consistent padding with the RevenueComponent
      boxShadow="md"
      borderRadius="md"
      display="flex"
      alignItems="center"
      border="1px" // 1px border
      borderColor="red.100" // light gray border color
      width="auto" // width adjusts to content
      bg="red.50" background
      maxW="200px"
      minH="90px"
    >
      <Box color="#f195b9" mr={2}> {/* Color for expenses icon */}
        <IoMdRemoveCircleOutline size="1.5em" /> {/* Adjust icon size as needed */}
      </Box>
      <Stat>
        <StatLabel color="gray.500" fontSize="sm">Dépenses</StatLabel>
        <StatNumber fontSize="lg" lineHeight="1.1em">
          1000 €
        </StatNumber>
      </Stat>
    </Box>
  );
};

export default ExpensesComponent;
