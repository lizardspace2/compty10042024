import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import ExpenseTransactionDetail from './ExpenseTransactionDetail'; // Make sure the path is correct

const TransactionDetailModal = ({ isDetailOpen, onDetailToggle }) => {
  return (
    <Modal isOpen={isDetailOpen} onClose={onDetailToggle} size="full" overflow="auto">
      <ModalOverlay />
      <ModalContent m={0} maxW="100vw">
        {/* We include the ExpenseTransactionDetail component here */}
        <ExpenseTransactionDetail />
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailModal;
