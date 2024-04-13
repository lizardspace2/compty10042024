import React from 'react';
import { Box, Button, Flex, Heading, Icon, useDisclosure } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import TransactionItem from './components/TransactionItem';
import TransactionsHeader from './components/TransactionsHeader';
import TransactionDetails from './components/TransactionDetails'; // Placeholder for detail components

function Transactions() {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Flex>
      <Box flex="1" p={4}>
        <TransactionsHeader />
        <Box maxWidth="1000px" textAlign="center" mx="auto">
          <TransactionItem />
        </Box>
      </Box>
      {!isOpen && (
        <Button onClick={onToggle} colorScheme="teal" rightIcon={<Icon as={FaChevronRight} />}>
          Show Details
        </Button>
      )}
      {isOpen && (
        <TransactionDetails onClose={onToggle} />
      )}
    </Flex>
  );
}

export default Transactions;
