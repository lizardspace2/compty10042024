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
import TransactionModal from './TransactionModal';

const TransactionsHeader = ({ onToggleFilter }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBgColor = useColorModeValue('white', 'gray.700');
  const filterButtonColorScheme = useColorModeValue('gray', 'blue');
  const addButtonColorScheme = useColorModeValue('pink', 'green');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
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
          colorScheme="pink"
          ml={2}
          borderRadius="full"
          boxShadow="md"
        >
          Ajouter
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleOpenModal('justificatif')}>Justificatif</MenuItem>
          <MenuItem onClick={() => handleOpenModal('autre_depense')}>Autre dépense professionnelle</MenuItem>
          <MenuItem onClick={() => handleOpenModal('autre_recette')}>Autre recette professionnelle</MenuItem>
          <MenuItem onClick={() => handleOpenModal('depense_especes')}>Dépense en espèces</MenuItem>
          <MenuItem onClick={() => handleOpenModal('recette_especes')}>Recette en espèces</MenuItem>
        </MenuList>
      </Menu>
      </Flex>
      {/* Afficher le modal correspondant */}
      <TransactionModal isOpen={showModal} onClose={handleCloseModal} modalType={modalType} />
    </>
  );
};

export default TransactionsHeader;
