import React from 'react';
import {
  Box,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import TransactionsHeader from './components/TransactionsHeader';
import TransactionItem from './components/TransactionItem';
import TransactionDetail from './components/transactiondetail/TransactionDetail';
import TransactionDetailHeader from './components/transactiondetail/TransactionDetailHeader';
import TransactionDetails from './components/TransactionDetails';
import AccountSummary from './components/AccountSummary';
import CategoryComponent from './components/CategoryComponent';

function Transactions() {
  const { isOpen: isDetailOpen, onToggle: onDetailToggle } = useDisclosure();
  const { isOpen: isFilterOpen, onToggle: onFilterToggle } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.50" minH="100vh">
      <TransactionsHeader onToggleFilter={onFilterToggle} />
      <Flex>
        <Box flex="1" p={6} transition="margin 0.3s" marginRight={isFilterOpen ? "400px" : "0"}>
          <Box maxWidth="1000px" textAlign="center" mx="auto">
          <AccountSummary/>
          <div onClick={onDetailToggle}>
            <TransactionItem onOpenUploadModal={onOpen} />
          </div>
          </Box>
        </Box>

        <Box
          pos="fixed"
          right={isFilterOpen ? "0" : "-400px"}
          top="0"
          h="100vh"
          w="400px"
          bg="red.50"
          boxShadow="xl"
          zIndex="overlay"
          transition="right 0.3s"
          borderLeft="1px"
          borderColor="red.100"
        >
          <TransactionDetails onClose={onFilterToggle} />
        </Box>
      </Flex>
    </Box>
  );
}

export default Transactions;
