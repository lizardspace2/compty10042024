import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import TransactionInformation from './transactiondetail/TransactionInformation';
import VentilationComponent from './transactiondetail/VentilationComponent';

const TransactionDetail = () => {
  return (
    <Box 
      p={4} 
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start" // If you want to keep it at the top
      maxW="1400px" 
      m="0 auto" // This centers the Box horizontally within its parent
      w="100%" // Ensures the Box takes the full width of its container
    >
      <SimpleGrid 
        columns={{ base: 1, md: 2 }} 
        spacing={10} 
        width="100%" // Ensure the grid takes the full width available
        maxWidth="1400px" // Set maximum width for the grid
        margin="0 auto" // Center the grid within the Box
      >
        <TransactionInformation />
        <VentilationComponent />
        {/* Other components that you might want to add */}
      </SimpleGrid>
    </Box>
  );
};

export default TransactionDetail;
