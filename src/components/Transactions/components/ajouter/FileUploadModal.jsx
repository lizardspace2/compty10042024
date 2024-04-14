import React from 'react';
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

const FileUploadModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, application/pdf',
    maxSize: 10485760, // 10MB
  });

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fermer
            </Button>
            <Button variant="ghost">Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileUploadModal;
