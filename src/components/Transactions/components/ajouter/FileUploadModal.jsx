import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Progress,
  Text,
  VStack,
  Center,
  Divider,
  Box
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const FileUploadModal = ({ onClose }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  useEffect(() => {
    onOpen(); // Ouvre le modal lorsque le composant est monté
  }, []); // Vide le tableau de dépendances pour que cela ne se déclenche qu'une seule fois

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, application/pdf',
    maxSize: 10485760, // 10MB
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un justificatif</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Progress value={33.3} size="sm" colorScheme="pink" mb={4} />
          <VStack spacing={4}>
            <Center w="full">
              <Text fontSize="lg" fontWeight="bold">
                Etape 1
              </Text>
              <Text mx={2}>➜</Text>
              <Text fontSize="lg">Vérifier les données</Text>
              <Text mx={2}>➜</Text>
              <Text fontSize="lg">Valider</Text>
            </Center>
            <Center w="full" {...getRootProps()} p={10} border="2px dashed gray">
              <input {...getInputProps()} />
              <Text align="center">Déposez ici le justificatif que vous souhaitez ajouter<br/>
              Formats autorisés: PNG / JPG / PDF<br/>
              Taille max: 10Mo</Text>
            </Center>
            <Divider />
            <Center w="full">
              <Button variant="outline" colorScheme="red">
                Sélectionner le fichier
              </Button>
            </Center>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Fermer
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FileUploadModal;
