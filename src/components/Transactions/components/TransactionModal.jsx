import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';

const TransactionModal = ({ isOpen, onClose, modalType }) => {
  let modalTitle = '';
  let modalContent = '';

  switch (modalType) {
    case 'autre_depense':
      modalTitle = 'Autre dépense professionnelle';
      modalContent = (
        <>
          {/* Contenu spécifique pour la dépense professionnelle */}
        </>
      );
      break;
    case 'autre_recette':
      modalTitle = 'Autre recette professionnelle';
      modalContent = (
        <>
          {/* Contenu spécifique pour la recette professionnelle */}
        </>
      );
      break;
    case 'depense_especes':
      modalTitle = 'Dépense en espèces';
      modalContent = (
        <>
          {/* Contenu spécifique pour la dépense en espèces */}
        </>
      );
      break;
    case 'recette_especes':
      modalTitle = 'Recette en espèces';
      modalContent = (
        <>
          {/* Contenu spécifique pour la recette en espèces */}
        </>
      );
      break;
    default:
      modalTitle = 'Modal Title';
      modalContent = 'Default modal content';
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody>{modalContent}</ModalBody>
        <ModalFooter>
          <Button colorScheme="pink" onClick={onClose}>
            Fermer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
