// Transactions.js
import React from 'react';
import TransactionItem from './components/TransactionItem';
import { Input, InputGroup, InputLeftElement, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import TransactionsHeader from './components/TransactionsHeader';

function Transactions() {
  return (
    <div>
     <TransactionsHeader/>
      <TransactionItem/>
    </div>
  );
}

export default Transactions;
