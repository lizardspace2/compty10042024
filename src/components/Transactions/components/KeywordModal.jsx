import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

function KeywordModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState('');

  const handleConfirm = () => {
    console.log('Keyword or hashtag:', keyword);
    // Handle the submit action here
    onClose(); // Close the modal after action
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Texte ou #motclé</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Texte ou #motclé'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>Annuler</Button>
            <Button colorScheme='pink' ml={3} onClick={handleConfirm}>
              Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default KeywordModal;
