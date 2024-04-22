import React, { useState, useEffect } from 'react';
import { AttachmentIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box, Button, FormControl, FormLabel, Input, VStack,
  IconButton, InputGroup, InputRightElement, Modal, useColorModeValue,
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, Text, Image, HStack, Flex,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
import { chakra } from '@chakra-ui/react';
import { fr } from 'date-fns/locale';
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { Tooltip } from '@chakra-ui/react';
import { FcFullTrash } from "react-icons/fc";

const ChakraDatePicker = chakra(DatePicker);

const FilePreview = ({ file, onDelete, onSelect }) => {
  const isImage = file.type.startsWith('image/');
  const fileBg = useColorModeValue('red.50', 'gray.700');
  const fileBorderColor = useColorModeValue('red.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'red.50');

  return (
    <HStack
      borderWidth="1px"
      borderRadius="lg"
      p={1}
      m={1}
      justifyContent="space-between"
      alignItems="center"
      bg={fileBg}
      borderColor={fileBorderColor}
      width="full"
      onClick={() => onSelect(file)}
    >
      <HStack spacing={2}>
        {isImage ? (
          <Image src={file.preview} boxSize="50px" />
        ) : (
          <AttachmentIcon color={textColor} />
        )}
        <Text color={textColor} isTruncated maxWidth="calc(100% - 3rem)" title={file.name}>
          {file.name}
        </Text>
      </HStack>
      <Tooltip label="Supprimer le fichier" hasArrow>
        <IconButton
          icon={<FcFullTrash />}
          onClick={(e) => {
            e.stopPropagation();  // Prevent onSelect from being called when deleting
            onDelete(file);
          }}
          aria-label="Delete file"
          size="sm"
          isRound={true}
          variant="ghost"
        />
      </Tooltip>
    </HStack>
  );
};



const ExpenseInformation = () => {
  const [annotations, setAnnotations] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [files, setFiles] = useState([]);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const [selectedFile, setSelectedFile] = useState(null);
  const maxFiles = 10;

  const { getRootProps, getInputProps, isDragReject, fileRejections } = useDropzone({
    accept: 'image/png, image/jpeg, application/pdf',
    maxSize: 10 * 1024 * 1024, // 10MB max size
    onDrop: acceptedFiles => {
      setFiles(prevFiles => {
        // Combine the old files with the new ones and slice the array to keep only 10
        const updatedFiles = prevFiles.concat(acceptedFiles).slice(0, maxFiles);
        // Update the previews for the new files
        return updatedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
      });
    },
    noClick: files.length >= maxFiles, // Disables the dropzone click if the limit is reached
    noKeyboard: files.length >= maxFiles, // Disables the dropzone keyboard behavior if the limit is reached
  });

  const deleteFile = (fileToDelete) => {
    setFiles(files.filter(file => file !== fileToDelete));
    URL.revokeObjectURL(fileToDelete.preview);
  };

  const clearFiles = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };
  const closeButtonStyle = {
    opacity: annotations ? 1 : 0,
    transition: 'opacity 0.3s ease-out',
    cursor: 'pointer'
  };
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    if (files.length === 0) {
      setSelectedFile(null);
    }
  }, [files]);


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
            {annotations && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear annotations"
                  icon={<CloseIcon />}
                  size="sm"
                  onClick={() => setAnnotations('')}
                  isRound={true}
                  style={closeButtonStyle} // Apply the transition effect style
                />
              </InputRightElement>
            )}
          </InputGroup>
        </FormControl>
        <FormControl id="transaction-justifications">
          <FormLabel>Justificatifs</FormLabel>
          <InputGroup>
            <Input
              placeholder="Ajouter des justificatifs"
              background={inputBg}
              value={files.map(file => file.name).join(', ')}
              onClick={() => setIsFileModalOpen(true)}
              readOnly
            />
            {files.length > 0 && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear files"
                  icon={<CloseIcon />}
                  size="sm"
                  onClick={clearFiles}
                  isRound={true}
                />
              </InputRightElement>
            )}
          </InputGroup>
          {files.map((file, index) => (
            <FilePreview key={index} file={file} onDelete={deleteFile} />
          ))}
        </FormControl>

        // Inside the ExpenseInformation component...
        <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)} size="4xl">
          <ModalOverlay />
          <ModalContent minH="80vh">
            <ModalHeader>Ajouter des justificatifs</ModalHeader>
            <Box
              borderBottomWidth="1px"
              borderColor="gray.200"
              width="full"
            />
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <VStack width="50%" spacing={4}>
                  {files.length === 0 ? (
                    <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
                      <input {...getInputProps()} />
                      <AttachmentIcon w={12} h={12} color='gray.500' />
                      <Text>Glissez et déposez les fichiers ici, ou cliquez pour sélectionner des fichiers</Text>
                      <Text fontSize='sm'>Formats autorisés: PNG, JPEG, PDF</Text>
                      <Text fontSize='sm'>Taille max: 10Mo par justificatif</Text>
                    </div>
                  ) : (
                    <>
                      <Box w="95%">
                        {files.map((file, index) => (
                          <FilePreview key={index} file={file} onDelete={deleteFile} onSelect={handleFileSelect} />
                        ))}
                      </Box>
                      <>
                        <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', padding: '10px', textAlign: 'center' }}>
                          <input {...getInputProps()} />
                          <Button
                            leftIcon={<LiaCloudUploadAltSolid />}
                            colorScheme="teal"
                            variant="outline"
                            bg={useColorModeValue('white', 'gray.800')}
                            color={useColorModeValue('gray.600', 'white')}
                            _hover={{
                              bg: useColorModeValue('gray.100', 'gray.700'),
                            }}
                          >
                            Ajouter d'autres fichiers
                          </Button>
                        </div>
                        <Text fontSize='sm'>
                          {`Vous pouvez encore en ajouter ${maxFiles - files.length}.`}
                        </Text>
                      </>
                    </>
                  )}
                </VStack>
                {selectedFile && selectedFile.type.startsWith('image/') && (
                  <Box width="50%" height="100%">
                    <Image
                      src={selectedFile.preview}
                      alt={`Preview of ${selectedFile.name}`}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default ExpenseInformation;
