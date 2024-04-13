// TransactionDetail.js or whatever name suits the component

import React from 'react';
import { VStack } from '@chakra-ui/react';
import TransactionDetailHeader from './transactiondetail/TransactionDetailHeader';
import TransactionInformation from './transactiondetail/TransactionInformation';
import VentilationComponent from './transactiondetail/VentilationComponent';

const TransactionDetail = () => {
  return (
    <VStack spacing={4} align="stretch">
      <TransactionInformation/>
      <VentilationComponent/>
    </VStack>
  );
};

export default TransactionDetail;
