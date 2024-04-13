// Transactions.js
import React from 'react';
import TransactionItem from './components/TransactionItem';
import { Input, InputGroup, InputLeftElement, Button, Flex, Heading, Icon, Box } from '@chakra-ui/react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import TransactionsHeader from './components/TransactionsHeader';

function Transactions() {
  return (
    <div>
     <TransactionsHeader/>
     <Box maxWidth="1000px" textAlign="center" mx="auto" >
      <TransactionItem/>
      </Box>
    </div>
  );
}

export default Transactions;
