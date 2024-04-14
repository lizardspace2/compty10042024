import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import TransactionInformation from './transactiondetail/TransactionInformation';
import VentilationComponent from './transactiondetail/VentilationComponent';

const TransactionDetail = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} align="stretch">
      <TransactionInformation />
      <VentilationComponent />
      {/* Other components that you might want to add */}
    </SimpleGrid>
  );
};

export default TransactionDetail;
