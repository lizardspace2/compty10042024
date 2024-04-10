import React from 'react';
import {
  Box,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Text,
} from '@chakra-ui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';

function RevenueTable() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Sample data for 12 months - replace this with your actual data
  const revenues = [
    10417, 10417, 10417, 10417, 10417, 10417, 
    10417, 10417, 10417, 10694, 10417, 10417 // 12 months data
  ];

  // Calculate the sum of all 12 months
  const totalRevenue = revenues.reduce((sum, current) => sum + current, 0);

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      borderColor={borderColor}
      borderWidth={1}
      maxW="100%"
      overflowX="auto"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Box as="span" mr="2">
                <MdKeyboardArrowRight />
              </Box>
              Revenues
            </Th>
            {revenues.map((amount, index) => (
              <Th isNumeric key={index}>{amount.toLocaleString()}</Th>
            ))}
            {/* Bold and sum for the last entry */}
            <Th isNumeric fontWeight="bold">{totalRevenue.toLocaleString()}</Th>
          </Tr>
        </Thead>
      </Table>
    </Box>
  );
}

export default RevenueTable;
