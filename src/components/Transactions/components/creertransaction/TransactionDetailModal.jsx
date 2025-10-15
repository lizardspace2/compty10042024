import { supabase } from './../../../../supabaseClient';
import React, { useState, useEffect, useRef } from 'react';
import { AttachmentIcon, CloseIcon } from '@chakra-ui/icons';
import { useEntreprise } from '../../../../contexts/EntrepriseContext';
import { createTransaction, updateTransactionComplete } from '../../../../services/transactionsService';
import { useToast, useDisclosure } from '@chakra-ui/react';
import {
  Box, Button, FormControl, FormLabel, Input, VStack, Select,
  IconButton, InputGroup, InputRightElement, Modal, useColorModeValue,
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, Text, Image, HStack, Flex, Tooltip, SimpleGrid, Heading, Stack, Container, Tag,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
import { chakra } from '@chakra-ui/react';
import { fr } from 'date-fns/locale';
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { FaPlus, FaPercent, FaTimes, FaPaperclip, FaSave, FaEdit, FaTrash, FaFileAlt } from 'react-icons/fa';
import { MdEuro } from 'react-icons/md';
import { FcFullTrash, FcBullish, FcDebt, FcFactory, FcAutomotive, FcAlarmClock, FcDonate } from 'react-icons/fc';


const ExpenseFormHeader = ({ onToggle, onSubmitTransaction, isUploading, isEditing }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4} bg="red.50" boxShadow="md">
      <Heading as="h3" size="lg">
        {isEditing ? 'Modification de la transaction' : 'Ajout d\'une dépense professionnelle'}
      </Heading>
      <Box>
        <Button mr={3} onClick={onToggle} isDisabled={isUploading}>
          Fermer
        </Button>
        <Button
          colorScheme="pink"
          onClick={onSubmitTransaction}
          isLoading={isUploading}
          loadingText={isEditing ? "Modification en cours..." : "Ajout en cours..."}
        >
          {isEditing ? 'Modifier' : 'Ajouter'}
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

// Nouveau composant pour gérer les justificatifs existants
const JustificatifsManager = ({
  justificatifs,
  editingFileName,
  newFileName,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteClick,
  onFileNameChange,
  onUploadClick,
  isUploading
}) => {
  const fileBg = useColorModeValue('red.50', 'gray.700');
  const fileBorderColor = useColorModeValue('red.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'red.50');

  if (!justificatifs || justificatifs.length === 0) {
    return null;
  }

  return (
    <VStack spacing={2} align="stretch" mt={2}>
      <Text fontSize="sm" fontWeight="semibold" color="gray.600">
        Justificatifs existants ({justificatifs.length})
      </Text>
      {justificatifs.map((justificatif) => {
        const isImage = justificatif.type_fichier?.startsWith('image/');
        const filePath = justificatif.url_stockage?.split('/').pop();

        return (
          <Box
            key={justificatif.id}
            borderWidth="1px"
            borderRadius="lg"
            p={3}
            bg={fileBg}
            borderColor={fileBorderColor}
          >
            {editingFileName === justificatif.id ? (
              <HStack w="100%">
                <Input
                  value={newFileName}
                  onChange={(e) => onFileNameChange(e.target.value)}
                  size="sm"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') onSaveEdit(justificatif.id);
                  }}
                />
                <IconButton
                  icon={<FaSave />}
                  size="sm"
                  colorScheme="green"
                  onClick={() => onSaveEdit(justificatif.id)}
                  aria-label="Enregistrer"
                />
                <IconButton
                  icon={<FaTimes />}
                  size="sm"
                  onClick={onCancelEdit}
                  aria-label="Annuler"
                />
              </HStack>
            ) : (
              <HStack justifyContent="space-between">
                <HStack spacing={2} flex={1}>
                  {isImage && justificatif.url_stockage ? (
                    <Image
                      src={justificatif.url_stockage}
                      boxSize="40px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  ) : (
                    <FaPaperclip color={textColor} />
                  )}
                  <VStack align="start" spacing={0} flex={1}>
                    <Text fontWeight="medium" fontSize="sm" color={textColor}>
                      {justificatif.nom_fichier}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {justificatif.type_fichier} • {(justificatif.taille_fichier / 1024).toFixed(2)} Ko
                    </Text>
                  </VStack>
                </HStack>
                <HStack spacing={1}>
                  {isImage && justificatif.url_stockage && (
                    <IconButton
                      icon={<AttachmentIcon />}
                      size="xs"
                      variant="ghost"
                      onClick={() => window.open(justificatif.url_stockage, '_blank')}
                      aria-label="Voir"
                    />
                  )}
                  <IconButton
                    icon={<FaEdit />}
                    size="xs"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => onStartEdit(justificatif.id, justificatif.nom_fichier)}
                    aria-label="Renommer"
                  />
                  <IconButton
                    icon={<FaTrash />}
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onDeleteClick(justificatif, filePath)}
                    aria-label="Supprimer"
                  />
                </HStack>
              </HStack>
            )}
          </Box>
        );
      })}
      <Button
        leftIcon={<FaPlus />}
        size="sm"
        colorScheme="blue"
        variant="outline"
        onClick={onUploadClick}
        isLoading={isUploading}
      >
        Ajouter un justificatif
      </Button>
    </VStack>
  );
};

const ExpenseInformation = ({ formData, onChange, setFormData, files, setFiles }) => {
  const toast = useToast();
  const [annotations, setAnnotations] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const [selectedFile, setSelectedFile] = useState(null);
  const maxFiles = 10;

  // États pour gérer les justificatifs existants
  const [editingFileName, setEditingFileName] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [justificatifToDelete, setJustificatifToDelete] = useState(null);
  const [isUploadingJustificatif, setIsUploadingJustificatif] = useState(false);
  const { isOpen: isDeleteJustificatifOpen, onOpen: onDeleteJustificatifOpen, onClose: onDeleteJustificatifClose } = useDisclosure();
  const cancelJustificatifRef = useRef();
  const fileInputRef = useRef();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <VStack spacing={4} align="stretch">
        <FormControl id="transaction-label">
          <FormLabel>Libellé</FormLabel>
          <Input value={formData.libelle} onChange={onChange} name="libelle" />
        </FormControl>

        <FormControl id="transaction-date">
          <FormLabel>Date</FormLabel>
          <ChakraDatePicker
            selected={formData.date_transaction}
            onChange={(date) => setFormData(prev => ({ ...prev, date_transaction: date }))}
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
            step="0.01"
            value={formData.montant_total}
            onChange={onChange}
            name="montant_total"
          />
        </FormControl>

        <FormControl id="transaction-moyen-paiement">
          <FormLabel>Moyen de paiement</FormLabel>
          <Select
            value={formData.moyen_paiement}
            onChange={onChange}
            name="moyen_paiement"
            placeholder="Sélectionner un moyen"
          >
            <option value="virement">Virement</option>
            <option value="carte">Carte bancaire</option>
            <option value="cheque">Chèque</option>
            <option value="especes">Espèces</option>
            <option value="prelevement">Prélèvement</option>
          </Select>
        </FormControl>

        <FormControl id="transaction-annotations">
          <FormLabel>Annotations</FormLabel>
          <InputGroup>
            <Input
              placeholder="Ajouter des mots clés"
              value={formData.annotations}
              onChange={onChange}
              name="annotations" // Ensure this matches the state key
            />
            {annotations && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear annotations"
                  icon={<CloseIcon />}
                  size="sm"
                  onClick={() => setAnnotations('')}
                  isRound={true}
                  style={closeButtonStyle}
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
              borderColor="red.100"
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
                            bg={useColorModeValue('red.50', 'gray.800')}
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

const ExpenseVentilationComponent = ({ ventilations, onVentilationChange, onAddVentilation, onRemoveVentilation }) => {
  const [ventilationsState, setVentilations] = useState([
    { id: 1, amount: '', percentage: 100, selectedCategory: 'Dépense personnelle' },
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
  const borderColor = useColorModeValue('red.100', 'gray.600');
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
    const newId = ventilationsState.length + 1;
    setVentilations([...ventilationsState, { id: newId, amount: '', percentage: 0, selectedCategory: '' }]);
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
    // S'assurer que l'index est valide
    if (activeVentilationIndex != null && ventilations[activeVentilationIndex]) {
        onVentilationChange(activeVentilationIndex, 'selectedCategory', category);
        onCategoryModalClose();
    } else {
        console.error("Index de ventilation non valide lors de la sélection de la catégorie");
    }
};



  // Calculer le total des pourcentages
  const totalPourcentage = ventilations.reduce((sum, v) => sum + parseFloat(v.percentage || 0), 0);
  const isValidTotal = Math.abs(totalPourcentage - 100) < 0.01;

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <VStack spacing={2} align="stretch" mb={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="semibold">Ventilation(s)</Text>
          <HStack spacing={2}>
            <Text fontSize="sm" fontWeight="medium">Total:</Text>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={isValidTotal ? 'green.500' : 'red.500'}
            >
              {totalPourcentage.toFixed(2)}%
            </Text>
            {isValidTotal ? (
              <Text fontSize="sm" color="green.500">✓</Text>
            ) : (
              <Text fontSize="sm" color="red.500">⚠</Text>
            )}
          </HStack>
        </Flex>
        {!isValidTotal && (
          <Box bg="orange.50" p={2} borderRadius="md" borderLeft="3px solid" borderColor="orange.400">
            <Text fontSize="xs" color="orange.700">
              ⚠ Le total des pourcentages doit être exactement 100%.
              {totalPourcentage < 100 ? ` Il manque ${(100 - totalPourcentage).toFixed(2)}%.` : ` Il y a ${(totalPourcentage - 100).toFixed(2)}% en trop.`}
            </Text>
          </Box>
        )}
      </VStack>
      {ventilations.map((vent, index) => (
        <Box key={vent.id} p={4} bg="red.50" shadow="sm" mb={4} rounded="md">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading size="md" mb={4}>Ventilation {index + 1}</Heading>
            <IconButton
              icon={<FaTimes />}
              onClick={() => onRemoveVentilation(index)}
              aria-label="Remove ventilation"
            />
          </Flex>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Catégorie</FormLabel>
              <Input
                value={vent.selectedCategory}
                onChange={(e) => onVentilationChange(index, 'selectedCategory', e.target.value)}
                placeholder="Select Category"
                readOnly
                onClick={() => openCategoryModal(index)}

              />
            </FormControl>
            <FormControl>
              <FormLabel>Montant</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  value={vent.amount}
                  onChange={(e) => onVentilationChange(index, 'amount', e.target.value)}
                />
                <InputRightElement children={<MdEuro />} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Pourcentage</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  value={vent.percentage}
                  onChange={(e) => onVentilationChange(index, 'percentage', e.target.value)}
                />
                <InputRightElement children={<FaPercent />} />
              </InputGroup>
            </FormControl>
          </Stack>
        </Box>
      ))}
      <Button leftIcon={<FaPlus />} onClick={onAddVentilation} colorScheme="blue">
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

const ExpenseTransactionDetail = ({ onToggle, onTransactionAdded, transactionType, transactionToEdit }) => {
  const { entreprise } = useEntreprise();
  const toast = useToast();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Déterminer le moyen de paiement initial basé sur le type de transaction
  const initialMoyenPaiement = (transactionType === 'depense_especes' || transactionType === 'recette_especes')
    ? 'especes'
    : '';

  const getInitialFormData = () => {
    if (transactionToEdit) {
      return {
        id: transactionToEdit.id,
        libelle: transactionToEdit.libelle || '',
        date_transaction: transactionToEdit.date_transaction ? new Date(transactionToEdit.date_transaction) : new Date(),
        montant_total: transactionToEdit.montant_total || 0,
        annotations: transactionToEdit.annotations || '',
        justificatifs: transactionToEdit.justificatifs || [],
        moyen_paiement: transactionToEdit.moyen_paiement || '',
        compte_bancaire_id: transactionToEdit.compte_bancaire_id || '',
        type_transaction: transactionToEdit.type_transaction || 'depense',
        statut: transactionToEdit.statut || 'en_attente',
        ventilations: transactionToEdit.ventilations && transactionToEdit.ventilations.length > 0
          ? transactionToEdit.ventilations.map((v, index) => ({
              id: index + 1,
              amount: v.montant || '',
              percentage: v.pourcentage || 0,
              selectedCategory: v.categorie_nom || ''
            }))
          : [{ id: 1, amount: '', percentage: 100, selectedCategory: 'Dépense personnelle' }]
      };
    }
    return {
      libelle: '',
      date_transaction: new Date(),
      montant_total: 0,
      annotations: '',
      justificatifs: [],
      moyen_paiement: initialMoyenPaiement,
      compte_bancaire_id: '',
      type_transaction: 'depense',
      statut: 'en_attente',
      ventilations: [
        { id: 1, amount: '', percentage: 100, selectedCategory: 'Dépense personnelle' }
      ]
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  // Mettre à jour le formulaire quand transactionToEdit change
  useEffect(() => {
    setFormData(getInitialFormData());
  }, [transactionToEdit]);

  // useEffect pour recalculer les montants des ventilations quand le montant total change
  useEffect(() => {
    if (formData.montant_total > 0) {
      const updatedVentilations = formData.ventilations.map(vent => {
        if (vent.percentage > 0) {
          const montantCalcule = (parseFloat(vent.percentage) / 100) * parseFloat(formData.montant_total);
          return { ...vent, amount: montantCalcule.toFixed(2) };
        }
        return vent;
      });
      setFormData(prev => ({ ...prev, ventilations: updatedVentilations }));
    }
  }, [formData.montant_total]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVentilationChange = (index, field, value) => {
    const updatedVentilations = formData.ventilations.map((vent, idx) => {
        if (idx === index) {
            const updatedVent = { ...vent, [field]: value };

            // Si on modifie le pourcentage, calculer automatiquement le montant
            if (field === 'percentage' && formData.montant_total) {
              const montantCalcule = (parseFloat(value) / 100) * parseFloat(formData.montant_total);
              updatedVent.amount = montantCalcule.toFixed(2);
            }

            // Si on modifie le montant, calculer automatiquement le pourcentage
            if (field === 'amount' && formData.montant_total) {
              const pourcentageCalcule = (parseFloat(value) / parseFloat(formData.montant_total)) * 100;
              updatedVent.percentage = pourcentageCalcule.toFixed(2);
            }

            return updatedVent;
        }
        return vent;
    });
    setFormData(prev => ({ ...prev, ventilations: updatedVentilations }));
};


  const addVentilation = () => {
    setFormData(prev => ({
      ...prev,
      ventilations: [...prev.ventilations, { id: prev.ventilations.length + 1, category: '', amount: '', percentage: 0, selectedCategory: '' }]
    }));
  };

  const removeVentilation = (index) => {
    const newVentilations = formData.ventilations.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ventilations: newVentilations }));
  };

  const handleSubmitTransaction = async () => {
    if (!entreprise?.id) {
      toast({
        title: 'Erreur',
        description: 'Vous devez d\'abord créer une entreprise',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Valider que le total des pourcentages = 100%
    const totalPourcentage = formData.ventilations.reduce((sum, v) => sum + parseFloat(v.percentage || 0), 0);
    if (Math.abs(totalPourcentage - 100) > 0.01) {
      toast({
        title: 'Erreur de ventilation',
        description: `Le total des pourcentages doit être exactement 100% (actuellement: ${totalPourcentage.toFixed(2)}%)`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Valider que toutes les ventilations ont une catégorie
    const ventilationsSansCategorie = formData.ventilations.filter(v => !v.selectedCategory);
    if (ventilationsSansCategorie.length > 0) {
      toast({
        title: 'Erreur de ventilation',
        description: 'Toutes les ventilations doivent avoir une catégorie sélectionnée',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsUploading(true);

    try {
      // Préparer les données de la transaction
      const transactionData = {
        entreprise_id: entreprise.id,
        libelle: formData.libelle,
        date_transaction: formData.date_transaction.toISOString().split('T')[0],
        montant_total: parseFloat(formData.montant_total),
        type_transaction: formData.type_transaction,
        moyen_paiement: formData.moyen_paiement || null,
        compte_bancaire_id: formData.compte_bancaire_id || null,
        annotations: formData.annotations || null,
        statut: formData.statut,
        ventilations: formData.ventilations.map(v => ({
          categorie_nom: v.selectedCategory,
          montant: parseFloat(v.amount) || 0,
          pourcentage: parseFloat(v.percentage) || 0
        }))
      };

      let transaction;
      let transactionError;

      // Créer ou modifier la transaction
      if (transactionToEdit) {
        // Mode modification
        const result = await updateTransactionComplete(formData.id, transactionData);
        transaction = result.data;
        transactionError = result.error;
      } else {
        // Mode création
        const result = await createTransaction(transactionData);
        transaction = result.data;
        transactionError = result.error;
      }

      if (transactionError) {
        throw transactionError;
      }

      console.log(`Transaction ${transactionToEdit ? 'modifiée' : 'ajoutée'} avec succès !`, transaction);

      // Uploader les justificatifs si présents
      if (files.length > 0) {
        for (const file of files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${transaction.id}_${Date.now()}.${fileExt}`;
          const filePath = `justificatifs/${fileName}`;

          // Upload vers Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Erreur upload fichier:', uploadError);
            continue; // Continue avec les autres fichiers
          }

          // Récupérer l'URL publique
          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);

          // Enregistrer dans la base de données
          const { error: justificatifError } = await supabase
            .from('justificatifs')
            .insert([{
              transaction_id: transaction.id,
              nom_fichier: file.name,
              type_fichier: file.type,
              taille_fichier: file.size,
              url_stockage: publicUrl
            }]);

          if (justificatifError) {
            console.error('Erreur enregistrement justificatif:', justificatifError);
          }
        }
      }

      // Call the callback to refresh the transactions list BEFORE closing
      if (onTransactionAdded) {
        await onTransactionAdded();
      }

      toast({
        title: 'Succès',
        description: `Transaction ${transactionToEdit ? 'modifiée' : 'créée'} avec succès${files.length > 0 ? ` avec ${files.length} justificatif(s)` : ''}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Réinitialiser le formulaire
      setFiles([]);
      onToggle();

    } catch (error) {
      console.error(`Erreur lors de ${transactionToEdit ? 'la modification' : 'l\'ajout'} de la transaction :`, error);
      toast({
        title: 'Erreur',
        description: `Impossible de ${transactionToEdit ? 'modifier' : 'créer'} la transaction`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <>
      <ExpenseFormHeader
        onToggle={onToggle}
        onSubmitTransaction={handleSubmitTransaction}
        isUploading={isUploading}
        isEditing={!!transactionToEdit}
      />
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
          <ExpenseInformation
            formData={formData}
            onChange={handleInputChange}
            setFormData={setFormData}
            files={files}
            setFiles={setFiles}
          />
          <ExpenseVentilationComponent
            ventilations={formData.ventilations}
            onVentilationChange={handleVentilationChange}
            onAddVentilation={addVentilation}
            onRemoveVentilation={removeVentilation}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};


const TransactionDetailModal = ({ isDetailOpen, onToggle, onTransactionAdded, transactionType, transactionToEdit }) => {
  return (
    <Modal isOpen={isDetailOpen} onClose={onToggle} size="full" overflow="auto">
      <ModalOverlay />
      <ModalContent m={0} maxW="100vw">
        <ExpenseTransactionDetail
          onToggle={onToggle}
          onTransactionAdded={onTransactionAdded}
          transactionType={transactionType}
          transactionToEdit={transactionToEdit}
        />
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailModal;