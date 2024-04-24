import { supabase } from './../../../../supabaseClient';  
import React, { useState, useEffect } from 'react';
import { AttachmentIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box, Button, FormControl, FormLabel, Input, VStack,
  IconButton, InputGroup, InputRightElement, Modal, useColorModeValue,
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, Text, Image, HStack, Flex, Tooltip,SimpleGrid,Heading, Stack, Container, Tag,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
import { chakra } from '@chakra-ui/react';
import { fr } from 'date-fns/locale';
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { FaPlus, FaPercent, FaTimes } from 'react-icons/fa';
import { MdEuro } from 'react-icons/md';
import { FcFullTrash, FcBullish, FcDebt, FcFactory, FcAutomotive, FcAlarmClock, FcDonate } from 'react-icons/fc';


const ExpenseFormHeader = ({ onToggle, onSubmitTransaction }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4} bg="white" boxShadow="md">
      <Heading as="h3" size="lg">
        Ajout d'une dépense professionnelle
      </Heading>
      <Box>
        <Button mr={3} onClick={onToggle}>
          Fermer
        </Button>
        <Button colorScheme="pink" onClick={onSubmitTransaction}>
          Ajouter
        </Button>
      </Box>
    </Flex>
  );
};

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
                <>
                  {files.length === 0 ? (
                    <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', minHeight: '69vh', border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    <AttachmentIcon w={12} h={12} color='gray.500' />
                    <Text>Glissez et déposez les fichiers ici, ou cliquez pour sélectionner des fichiers</Text>
                    <Text fontSize='sm'>Formats autorisés: PNG, JPEG, PDF</Text>
                    <Text fontSize='sm'>Taille max: 10Mo par justificatif</Text>
                  </div>                  
                  ) : (
                    <VStack width="50%" spacing={4}>
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
                      </VStack>
                  )}
                </>
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

const ExpenseVentilationComponent = () => {
  const [ventilations, setVentilations] = useState([
    { id: 1, category: 'Dépense personnelle', amount: '-0.99', percentage: 100, selectedCategory: '' },
  ]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [activeVentilationIndex, setActiveVentilationIndex] = useState(null);
  
  const categories = {
    Revenues: ['Apport personnel', 'Recette', 'Recette secondaire', 'Redevance de collaboration perçue', 'Autre gain divers', 'Vente d’une immobilisation', 'Emprunt', 'Caution reçue'],
    Remunerations: ['Prélèvement personnel', 'Dépense personnelle', 'Rétrocession versée', 'Redevance de collaboration versée', 'Honoraires payés', '[Salariés] Salaire net', '[Salariés] Impôt à la source', '[Salariés] Charge sociale'],
    Functionnement: ['Immobilisation', 'Matériel et outillage', 'Achat', 'Frais divers', 'Télécom, fournitures, documents', 'Frais d’acte et de contentieux', 'Débours pour vos clients', 'Virement interne'],
    Deplacements: ['À catégoriser', 'Formation', 'Réception et congrès', 'Restaurant et repas d’affaires', 'Frais de repas hors domicile', 'Frais de déplacement', 'Véhicule et carburant', 'Location de matériel'],
    FraisFixes: ['Emprunt', 'Compte commun ou SCM', 'Loyer et charge locative', 'Caution versée', 'Entretien et réparation', 'Abonnement logiciel', 'Eau, gaz, électricité', 'Assurance professionnelle'],
    CotisationsEtTaxes: ['Cotisation sociale Urssaf', 'Cotisation retraite', 'Cotisation facultative', 'Cotisation professionnelle', 'CFE', 'Autre impôt', 'Amende et pénalité']
  };

  const icons = {
    Revenues: <FcBullish />,
    Remunerations: <FcDebt />,
    Functionnement: <FcFactory />,
    Deplacements: <FcAutomotive />,
    FraisFixes: <FcAlarmClock />,
    CotisationsEtTaxes: <FcDonate />
  };

  const iconColor = useColorModeValue('gray.200', 'gray.300');
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue("green.100", "green.700");
  const activeBg = useColorModeValue("blue.300", "blue.800");

  const handleAmountChange = (index, value) => {
    const newVentilations = [...ventilations];
    newVentilations[index].amount = value;
    setVentilations(newVentilations);
  };

  const handlePercentageChange = (index, value) => {
    if (value >= 0 && value <= 100) {
    const newVentilations = [...ventilations];
    newVentilations[index].percentage = value;
    setVentilations(newVentilations);
    }
  };

  const addVentilation = () => {
    const newId = ventilations.length + 1;
    setVentilations([...ventilations, { id: newId, category: '', amount: '', percentage: 0, selectedCategory: '' }]);
  };

  const removeVentilation = index => {
    setVentilations(ventilations.filter((_, i) => i !== index));
  };

  const openCategoryModal = (index) => {
    setActiveVentilationIndex(index);
    setIsCategoryModalOpen(true);
  };

  const onCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
  };

  const handleCategorySelect = (category) => {
    const newVentilations = [...ventilations];
    newVentilations[activeVentilationIndex].selectedCategory = category;
    setVentilations(newVentilations);
    onCategoryModalClose();
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>Ventilation(s)</Text>
      {ventilations.map((ventilation, index) => (
        <Box key={ventilation.id} mb={4} p={4} bg="white" borderRadius="lg" boxShadow="sm">
          <Flex justify="space-between" align="center">
            <Text fontWeight="medium">Ventilation {index + 1}</Text>
            <Tooltip label="Supprimer cette ventilation" hasArrow placement="top">
              <IconButton
                aria-label="Remove ventilation"
                icon={<FcFullTrash />}
                size="sm"
                variant="ghost"
                onClick={() => removeVentilation(index)}
                color={iconColor}
              />
            </Tooltip>
          </Flex>
          <Stack spacing={4} mt={4}>
            <FormControl>
              <FormLabel>Catégorie</FormLabel>
              <Input
                placeholder="Sélectionnez une catégorie..."
                readOnly
                onClick={() => openCategoryModal(index)}
                value={ventilation.selectedCategory}
                mb={4}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Montant</FormLabel>
              <InputGroup>
                <Input type="number" value={ventilation.amount} onChange={(e) => handleAmountChange(index, e.target.value)} />
                <InputRightElement pointerEvents="none" children={<MdEuro color={iconColor} />} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Pourcentage</FormLabel>
              <InputGroup>
                <Input type="number" value={ventilation.percentage} onChange={(e) => handlePercentageChange(index, e.target.value)} />
                <InputRightElement pointerEvents="none" children={<FaPercent color={iconColor} />} />
              </InputGroup>
            </FormControl>
          </Stack>
        </Box>
      ))}
      <Button leftIcon={<FaPlus />} colorScheme="blue" variant="outline" onClick={addVentilation} mt={2}>
        Ajouter une ventilation
      </Button>
      {/* Modal for category selection */}
      <Modal isOpen={isCategoryModalOpen} onClose={onCategoryModalClose} size="full" overflow="auto">
        <ModalOverlay />
        <ModalContent m={0} maxW="100vw">
          <ModalHeader>
            Affecter une Catégories
            <IconButton
              aria-label="Close modal"
              icon={<FaTimes />}
              onClick={onCategoryModalClose}
              position="absolute"
              right="8px"
              top="8px"
              size="sm"
            />
          </ModalHeader>
          <ModalBody>
            <Container maxW="container.xxl">
              <SimpleGrid columns={6} spacing={5}>
                {Object.keys(categories).map((categoryKey) => (
                  <Box p={5} borderWidth="1px" borderRadius="lg" key={categoryKey}>
                    <Flex align="center" fontSize="xl">
                      {icons[categoryKey]}
                      <Heading as="h3" ml={3} fontSize="xl">{categoryKey}</Heading>
                    </Flex>
                    <VStack align="start">
                      {categories[categoryKey].map((item, index) => (
                        <Tag size="md" variant="solid" key={index} _hover={{
                          background: hoverBg,
                          transform: 'scale(1.1)',
                          transition: 'background-color 0.2s, transform 0.2s'
                        }} _active={{
                          background: activeBg,
                          transform: 'scale(0.9)',
                          transition: 'background-color 0.1s, transform 0.1s'
                        }} onClick={(event) => {
                          event.preventDefault();
                          handleCategorySelect(item);
                        }}>
                          {item}
                        </Tag>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const ExpenseTransactionDetail = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    libelle: '',
    date_transaction: new Date(),
    montant_total: 0,
    ventilations: JSON.stringify([])
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitTransaction = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          libelle: formData.libelle,
          date_transaction: formData.date_transaction,
          montant_total: formData.montant_total,
          ventilations: formData.ventilations
        }
      ]);

    if (error) console.error("Erreur lors de l'ajout de la transaction :", error);
    else {
      console.log('Transaction ajoutée avec succès !', data);
      onToggle();  // Fermer le modal après l'ajout
    }
  };

  return (
    <>
      <ExpenseFormHeader onToggle={onToggle} onSubmitTransaction={handleSubmitTransaction} />
      <Box
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        maxW="1400px"
        m="0 auto"
        w="100%"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          width="100%"
          maxWidth="1400px"
          margin="0 auto"
        >
          <ExpenseInformation formData={formData} onChange={handleInputChange} />
          <ExpenseVentilationComponent />
        </SimpleGrid>
      </Box>
    </>
  );
};

const TransactionDetailModal = ({ isDetailOpen, onToggle }) => {
  return (
    <Modal isOpen={isDetailOpen} onClose={onToggle} size="full" overflow="auto">
      <ModalOverlay />
      <ModalContent m={0} maxW="100vw">
        <ExpenseTransactionDetail onToggle={onToggle} />
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailModal;
