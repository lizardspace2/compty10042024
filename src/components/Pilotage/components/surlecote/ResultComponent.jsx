import React from 'react';
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { IoMdStats } from 'react-icons/io'; // A generic icon for results

const ResultComponent = ({ amount, currency }) => {
  // Determine color based on the amount (profit or loss)
  const resultColor = amount >= 0 ? 'green.500' : 'red.500';

  return (
    <Box
      p={2} // Consistent padding with the RevenueComponent and ExpensesComponent
      boxShadow="md"
      borderRadius="md"
      display="flex"
      alignItems="center"
      border="1px" // 1px border
      borderColor="gray.200" // light gray border color
      width="auto" // width adjusts to content
      bg="white" // white background
      maxW="200px"
    >
      <Box color="#333333" mr={2}> {/* Color for results icon */}
        <IoMdStats size="1.5em" /> {/* Adjust icon size as needed */}
      </Box>
      <Stat>
        <StatLabel color="gray.500" fontSize="sm">Result</StatLabel>
        <StatNumber fontSize="lg" lineHeight="1.1em" >
          1526 €
        </StatNumber>
      </Stat>
    </Box>
  );
};

export default ResultComponent;
