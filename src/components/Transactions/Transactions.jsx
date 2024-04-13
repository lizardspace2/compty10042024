import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import TransactionItem from './components/TransactionItem';
import TransactionsHeader from './components/TransactionsHeader';
import TransactionDetails from './components/TransactionDetails';

function Transactions() {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

  return (
    <Flex>
      <Box flex="1" p={4}>
        <TransactionsHeader onToggleFilter={onToggle} />
        <Box maxWidth="1000px" textAlign="center" mx="auto">
          <TransactionItem />
        </Box>
      </Box>
      {isOpen && (
        <TransactionDetails onClose={onToggle} />
      )}
    </Flex>
  );
}

export default Transactions;
