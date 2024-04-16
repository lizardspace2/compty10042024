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
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBgColor = useColorModeValue('white', 'gray.700');
  const filterButtonColorScheme = useColorModeValue('gray', 'blue');
  const addButtonColorScheme = useColorModeValue('pink', 'green');
  const [showJustificatifModal, setShowJustificatifModal] = useState(false); // État pour le modal justificatif
  const [showDepenseModal, setShowDepenseModal] = useState(false); // État pour le modal de dépense

  const handleOpenJustificatifModal = () => {
    setShowJustificatifModal(true);
  };

  const handleOpenDepenseModal = () => {
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
      borderBottom="1px"
      borderColor={borderColor}
      p={4}
      boxShadow="sm"
    >
      <Heading size="md">Transactions</Heading>
        <Flex alignItems="center">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdSearch color="gray.500" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Rechercher"
              bgColor={inputBgColor}
              boxShadow="base"
              maxW="400px"
            />
          </InputGroup>
          <Button
            leftIcon={<FcHeatMap />}
            ml={2}
            colorScheme={filterButtonColorScheme}
            variant="solid"
            onClick={onToggleFilter}
          >
            Filtrer
          </Button>
        </Flex>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme={addButtonColorScheme}
            ml={2}
            borderRadius="full"
            boxShadow="md"
          >
            Ajouter
          </MenuButton>
          <MenuList>
            {/* Utilise des fonctions distinctes pour ouvrir les modals */}
            <MenuItem onClick={handleOpenJustificatifModal}>Justificatif</MenuItem>
            <MenuItem onClick={handleOpenDepenseModal}>Autre dépense professionnelle</MenuItem>
            <MenuItem>Autre recette professionnelle</MenuItem>
            <MenuItem>Dépense en espèces</MenuItem>
            <MenuItem>Recette en espèces</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

    {/* Use TransactionDetailModal to display ExpenseTransactionDetail as a modal */}
    <TransactionDetailModal
    isDetailOpen={showDepenseModal}
    onToggle={handleCloseModals}
  />
    {showJustificatifModal && <FileUploadModal onClose={handleCloseModals} modalType="justificatif" />}
  </>
);
};

export default TransactionsHeader;
