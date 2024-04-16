// TransactionDetailModal.jsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  SimpleGrid,
  Box,
  Heading,
  Button,
  Flex
} from '@chakra-ui/react';
import ExpenseInformation from './ExpenseInformation';
import ExpenseVentilationComponent from './ExpenseVentilationComponent';

const ExpenseFormHeader = ({ onToggle }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4} bg="white" boxShadow="md">
      <Heading as="h3" size="lg">
        Ajout d'une dépense professionnelle
      </Heading>
      <Box>
        <Button mr={3} onClick={onToggle}>
          Fermer
        </Button>
        <Button colorScheme="pink" onClick={() => { /* Implement add functionality here */ }}>
          Ajouter
        </Button>
      </Box>
    </Flex>
  );
};

const ExpenseTransactionDetail = ({ onToggle }) => {
  return (
    <>
      <ExpenseFormHeader onToggle={onToggle} />
      <Box
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        maxW="1400px"
        m="0 auto"
        w="100%"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          width="100%"
          maxWidth="1400px"
          margin="0 auto"
        >
          <ExpenseInformation />
          <ExpenseVentilationComponent />
        </SimpleGrid>
      </Box>
    </>
  );
};

const TransactionDetailModal = ({ isDetailOpen, onToggle }) => {
  return (
    <Modal isOpen={isDetailOpen} onClose={onToggle} size="full" overflow="auto">
      <ModalOverlay />
      <ModalContent m={0} maxW="100vw">
        <ExpenseTransactionDetail onToggle={onToggle} />
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailModal;
