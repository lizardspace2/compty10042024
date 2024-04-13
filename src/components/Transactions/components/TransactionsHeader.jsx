// TransactionsHeader.js
import React from 'react';
import { Input, InputGroup, InputLeftElement, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';

const TransactionsHeader = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px"
      borderColor="gray.200" // Changed from gray.700 for better visibility on light themes
      p={4}
    >
      <Heading size="md">Transactions</Heading>
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
  );
};

export default TransactionsHeader;
