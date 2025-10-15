import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  Heading,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { MdSearch, MdAdd } from 'react-icons/md';
import { FcHeatMap } from "react-icons/fc";
import { ChevronDownIcon } from '@chakra-ui/icons';
import FileUploadModal from './ajouter/FileUploadModal';
import TransactionDetailModal from './creertransaction/TransactionDetailModal';
import ExpenseTransactionDetail from './creertransaction/ExpenseTransactionDetail';

const TransactionsHeader = ({ onToggleFilter }) => {
  const borderColor = useColorModeValue('red.100', 'gray.600');
  const inputBgColor = useColorModeValue('white', 'gray.700');
  const filterButtonColorScheme = useColorModeValue('gray', 'blue');
  const addButtonColorScheme = useColorModeValue('pink', 'green');
  const [showJustificatifModal, setShowJustificatifModal] = useState(false); // État pour le modal justificatif
  const [showDepenseModal, setShowDepenseModal] = useState(false); // État pour le modal de dépense
  const [transactionType, setTransactionType] = useState(null); // Type de transaction

  const handleOpenJustificatifModal = () => {
    setShowJustificatifModal(true);
  };

  const handleOpenDepenseModal = (type = null) => {
    setTransactionType(type);
    setShowDepenseModal(true);
  };

  const handleCloseModals = () => {
    setShowJustificatifModal(false);
    setShowDepenseModal(false);
  };

return (
  <>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="red.50"
      borderBottom="1px"
      borderColor="red.100"
      p={6}
      boxShadow="sm"
    >
      <Heading size="lg" color="gray.800">Transactions</Heading>
        <Flex alignItems="center" gap={2}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none" h={10}>
              <MdSearch color="gray.500" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Rechercher"
              h={10}
              borderRadius="xl"
              borderColor="gray.300"
              _focus={{
                borderColor: 'red.400',
                boxShadow: '0 0 0 1px var(--chakra-colors-red-400)',
              }}
            />
          </InputGroup>
          <Button
            leftIcon={<FcHeatMap />}
            variant="outline"
            borderRadius="xl"
            h={10}
            _hover={{ bg: 'red.50', borderColor: 'red.400' }}
            onClick={onToggleFilter}
          >
            Filtrer
          </Button>
        </Flex>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            leftIcon={<MdAdd />}
            bgGradient="linear(to-r, red.400, red.500)"
            _hover={{ bgGradient: 'linear(to-r, red.500, red.600)' }}
            color="white"
            h={10}
            borderRadius="xl"
          >
            Ajouter
          </MenuButton>
          <MenuList borderRadius="xl" boxShadow="xl">
            <MenuItem onClick={handleOpenJustificatifModal} _hover={{ bg: 'red.50' }}>
              Justificatif
            </MenuItem>
            <MenuItem onClick={() => handleOpenDepenseModal('autre_depense')} _hover={{ bg: 'red.50' }}>
              Autre dépense professionnelle
            </MenuItem>
            <MenuItem onClick={() => handleOpenDepenseModal('autre_recette')} _hover={{ bg: 'red.50' }}>
              Autre recette professionnelle
            </MenuItem>
            <MenuItem onClick={() => handleOpenDepenseModal('depense_especes')} _hover={{ bg: 'red.50' }}>
              Dépense en espèces
            </MenuItem>
            <MenuItem onClick={() => handleOpenDepenseModal('recette_especes')} _hover={{ bg: 'red.50' }}>
              Recette en espèces
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

    {/* Use TransactionDetailModal to display ExpenseTransactionDetail as a modal */}
    <TransactionDetailModal
    isDetailOpen={showDepenseModal}
    onToggle={handleCloseModals}
    transactionType={transactionType}
  />
    {showJustificatifModal && <FileUploadModal onClose={handleCloseModals} modalType="justificatif" />}
  </>
);
};

export default TransactionsHeader;
