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
import TransactionDetail from './components/TransactionDetail';
import TransactionDetailHeader from './components/transactiondetail/TransactionDetailHeader';
import TransactionDetails from './components/TransactionDetails';
import AccountSummary from './components/AccountSummary';
import FileUploadComponent from './components/FileUploadComponent';

function Transactions() {
  const { isOpen: isDetailOpen, onToggle: onDetailToggle } = useDisclosure();
  const { isOpen: isFilterOpen, onToggle: onFilterToggle } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <Box flex="1" p={4} transition="margin 0.3s" marginRight={isFilterOpen ? "400px" : "0"}>
        <TransactionsHeader onToggleFilter={onFilterToggle} />
        <Box maxWidth="1000px" textAlign="center" mx="auto">
          <AccountSummary/>
          <div onClick={onDetailToggle}>
            <TransactionItem onOpenUploadModal={onOpen} />
          </div>
        </Box>
      </Box>



      <Box
        pos="fixed"
        right={isFilterOpen ? "0" : "-400px"}  // Slides in from the right
        top="0"
        h="100vh"
        w="400px"
        bg="white"
        boxShadow="md"
        zIndex="overlay"
        transition="right 0.3s"
      >
        <TransactionDetails onClose={onFilterToggle} />
      </Box>

      {/* Modal for TransactionDetail */}
      <Modal isOpen={isDetailOpen} onClose={onDetailToggle} size="full" overflow="auto">
        <ModalOverlay />
        <ModalContent m={0} maxW="100vw">
          <TransactionDetailHeader onClose={onDetailToggle} />
          <TransactionDetail />
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Transactions;
