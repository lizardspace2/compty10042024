import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  IconButton,
  VStack,
  Text,
  Center,
  useDisclosure,
  Input,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import TransactionDetailHeader from './transactiondetail/TransactionDetailHeader';
import TransactionDetail from './TransactionDetail';

const TransactionModal = ({ isOpen, onClose, modalType, onOpen, isDetailOpen, onDetailToggle }) => {
  let modalTitle = '';
  let modalContent = '';

  switch (modalType) {
    case 'autre_depense':
      modalTitle = 'Autre dépense professionnelle';
      modalContent = (
        <>
      <Button onClick={onOpen}>Open Upload Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Prlv Sepa Symamobile Rum Recipon Guillaume Marie Franco
            <IconButton
              aria-label="Close modal"
              icon={<FaTimes />} // Replace with react-icons close icon
              onClick={onClose}
              position="absolute"
              right="8px"
              top="8px"
              size="sm"
            />
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Text>9 avr. 2024 - Montant : -7,99 €</Text>
              <Center
                p={10}
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
                w="full"
                bg="gray.50"
              >
                <VStack spacing={3}>
                  <FaCloudUploadAlt size="3em" />
                  <Text textAlign="center">
                    Déposez ici les justificatifs que vous souhaitez attacher à cette transaction
                  </Text>
                  <Text fontSize="sm">Formats autorisés : PNG / JPG / PDF</Text>
                  <Text fontSize="sm">Taille max : 10MB par justificatif</Text>
                  <Button as="label" size="md" colorScheme="pink">
                    Sélectionner des fichiers
                    <Input type="file" hidden multiple />
                  </Button>
                </VStack>
              </Center>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
      );
      break;
    case 'autre_recette':
      modalTitle = 'Autre recette professionnelle';
      modalContent = (
        <>
          <Modal isOpen={true} onClose={onClose} size="full" overflow="auto">
            <ModalOverlay />
            <ModalContent m={0} maxW="100vw">
                <ModalHeader>{modalTitle}</ModalHeader>
                <Modal isOpen={isDetailOpen} onClose={onDetailToggle} size="full" overflow="auto">
                    <ModalOverlay />
                    <ModalContent m={0} maxW="100vw">
                        <TransactionDetailHeader onClose={onDetailToggle} />
                        <TransactionDetail />
                    </ModalContent>
                </Modal>
                <ModalCloseButton />
            </ModalContent>
        </Modal>
        </>
      );
      break;
    case 'depense_especes':
      modalTitle = 'Dépense en espèces';
      modalContent = (
        <>
          <Modal isOpen={true} onClose={onClose} size="full" overflow="auto">
            <ModalOverlay />
            <ModalContent m={0} maxW="100vw">
                <ModalHeader>{modalTitle}</ModalHeader>
                <Modal isOpen={isDetailOpen} onClose={onDetailToggle} size="full" overflow="auto">
                    <ModalOverlay />
                    <ModalContent m={0} maxW="100vw">
                        <TransactionDetailHeader onClose={onDetailToggle} />
                        <TransactionDetail />
                    </ModalContent>
                </Modal>
                <ModalCloseButton />
            </ModalContent>
        </Modal>
        </>
      );
      break;
    case 'recette_especes':
      modalTitle = 'Recette en espèces';
      modalContent = (
        <>
          <Modal isOpen={true} onClose={onClose} size="full" overflow="auto">
            <ModalOverlay />
            <ModalContent m={0} maxW="100vw">
                <ModalHeader>{modalTitle}</ModalHeader>
                <Modal isOpen={isDetailOpen} onClose={onDetailToggle} size="full" overflow="auto">
                    <ModalOverlay />
                    <ModalContent m={0} maxW="100vw">
                        <TransactionDetailHeader onClose={onDetailToggle} />
                        <TransactionDetail />
                    </ModalContent>
                </Modal>
                <ModalCloseButton />
            </ModalContent>
        </Modal>
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
