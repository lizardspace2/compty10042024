import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import ExpenseTransactionDetail from './ExpenseTransactionDetail';
import ExpenseFormHeader from './ExpenseFormHeader';

// Assuming `TransactionDetailHeader` and `TransactionDetail` are components you've created.

const TransactionDetailModal = ({ isDetailOpen, onDetailToggle }) => {
  return (
    <Modal isOpen={isDetailOpen} onClose={onDetailToggle} size="full" overflow="auto">
      <ModalOverlay />
      <ModalContent m={0} maxW="100vw">
        <ExpenseFormHeader onClose={onDetailToggle} />
        <ExpenseTransactionDetail/>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailModal;
