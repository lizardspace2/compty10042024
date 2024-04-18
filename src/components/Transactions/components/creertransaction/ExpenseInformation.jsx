import React, { useState, useEffect } from 'react';
import { AttachmentIcon, CloseIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup, 
  InputRightElement, 
  IconButton, 
  Image,
  Text,
  Link
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
import { fr } from 'date-fns/locale';

const ChakraDatePicker = chakra(DatePicker);

const FilePreview = ({ file, onDelete }) => {
  const isImage = file.type.startsWith('image/');

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} d="flex" alignItems="center" justifyContent="space-between">
      <Box d="flex" alignItems="center">
        {isImage ? (
          <Image src={file.preview} maxW="50px" maxH="50px" mr={2} />
        ) : (
          <AttachmentIcon mr={2} />
        )}
        <Text>{file.name}</Text>
      </Box>
      <IconButton
        icon={<CloseIcon />}
        onClick={() => onDelete(file)}
        aria-label="Delete file"
        isRound={true}
      />
    </Box>
  );
};

const ExpenseInformation = () => {
  const [annotations, setAnnotations] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [files, setFiles] = useState([]);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.700');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, application/pdf',
    maxSize: 10 * 1024 * 1024, // 10MB max size
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  // Function to clear the selected file
  const clearFile = () => setFiles([]);
  const deleteFile = (fileToDelete) => {
    setFiles(files.filter(file => file !== fileToDelete));
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(fileToDelete.preview);
  };
  const clearFiles = () => {
    // Revoke the object URLs to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };


  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <VStack spacing={4} align="stretch">
      <FormControl id="transaction-label">
          <FormLabel>Libellé</FormLabel>
          <Input
            type="text"
            defaultValue="Prlv Sepa Symamobile Rum Recipon Guillaume Mari"
            background={inputBg}
          />
        </FormControl>

        <FormControl id="transaction-date">
          <FormLabel>Date</FormLabel>
          <ChakraDatePicker
            selected={selectedDate}  // Utilisation de l'état pour la date sélectionnée
            onChange={(date) => setSelectedDate(date)}  // Mise à jour de l'état lors du choix d'une date
            dateFormat="dd/MM/yyyy"
            locale={fr}
            customInput={<Input background={inputBg} readOnly />}
            popperPlacement="bottom-start"
            showWeekNumbers
            calendarStartDay={1}
          />
        </FormControl>

        <FormControl id="transaction-amount">
          <FormLabel>Montant</FormLabel>
          <Input
            type="number"
            defaultValue="-7.99"
            background={inputBg}
            step="0.01"
          />
        </FormControl>

        <FormControl id="transaction-annotations">
          <FormLabel>Annotations</FormLabel>
          <InputGroup>
            <Input
              placeholder="Ajouter des mots clés"
              background={inputBg}
              value={annotations}
              onChange={(e) => setAnnotations(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Clear annotations"
                icon={<CloseIcon />}
                size="sm"
                onClick={() => setAnnotations('')}
                isRound={true}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="transaction-justifications">
          <FormLabel>Justificatifs</FormLabel>
          <InputGroup>
            <Input
              placeholder="Ajouter des justificatifs"
              background={inputBg}
              value={files.map(file => file.name).join(', ')}
              onClick={() => setIsFileModalOpen(true)} // Open modal on input click
              readOnly // Prevent manual input
            />
            {files.length > 0 && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear files"
                  icon={<CloseIcon />}
                  size="sm"
                  onClick={clearFiles} // Clear all files
                  isRound={true}
                />
              </InputRightElement>
            )}
          </InputGroup>
          {files.map((file, index) => (
            <FilePreview key={index} file={file} onDelete={deleteFile} />
          ))}
        </FormControl>

        <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)}>
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
                <Button onClick={() => setIsFileModalOpen(false)}>Valider</Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default ExpenseInformation;
