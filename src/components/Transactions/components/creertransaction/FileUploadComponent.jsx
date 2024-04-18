import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  VStack,
  Text,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { useDropzone } from 'react-dropzone';

const FileUploadComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, application/pdf',
    maxSize: 10 * 1024 * 1024, // 10MB max size
  });

  return (
    <>
      <Button onClick={onOpen}>Ouvrir la modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
                <input {...getInputProps()} />
                <AttachmentIcon w={12} h={12} color='gray.500' />
                <Text>Glissez et déposez les fichiers ici, ou cliquez pour sélectionner des fichiers</Text>
                <Text fontSize='sm'>Formats autorisés: PNG, JPEG, PDF</Text>
                <Text fontSize='sm'>Taille max: 10Mo par justificatif</Text>
              </div>
              <Button>Valider</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileUploadComponent;
