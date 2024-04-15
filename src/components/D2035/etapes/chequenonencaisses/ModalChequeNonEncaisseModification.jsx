import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';

const ModalChequeNonEncaisseModification = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un chèque</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Type de chèque</FormLabel>
            <Select placeholder="Choisir le type">
              <option>Chèque reçu</option>
              <option>Chèque émis</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Libellé</FormLabel>
            <Input placeholder="Libellé..." />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Montant</FormLabel>
            <Input placeholder="Montant..." type="number" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Catégorie</FormLabel>
            <Select placeholder="Choisir la catégorie">
              {/* Options should be generated based on available categories */}
              <option value="category1">Catégorie 1</option>
              <option value="category2">Catégorie 2</option>
              {/* ... other categories */}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Annuler</Button>
          <Button colorScheme="blue" ml={3}>
            Ajouter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalChequeNonEncaisseModification;
