// Transactions.js
import React from 'react';
import TransactionItem from './components/TransactionItem';
import { Input, InputGroup, InputLeftElement, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';

function Transactions() {
  return (
    <div>
     <Flex
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px"
          borderColor="gray.700"
          p={4}
        >
      <Heading size="lg">Transactions</Heading>
      <Flex>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={MdSearch} color="gray.500" />}
          />
          <Input type="search" placeholder="Rechercher" />
        </InputGroup>
        <Button leftIcon={<MdFilterList />} ml={2} colorScheme="gray">
          Filtrer
        </Button>
        <Button
          rightIcon={<BsPlus />}
          colorScheme="pink"
          ml={2}
          borderRadius="full"
        >
          Ajouter
        </Button>
      </Flex>
    </Flex>
      <TransactionItem/>
    </div>
  );
}

export default Transactions;
