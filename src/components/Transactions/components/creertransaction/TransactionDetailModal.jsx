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
import { chakra } from '@chakra-ui/react';
import { fr } from 'date-fns/locale';
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
      onClick={() => onSelect && onSelect(file)}
      cursor={onSelect ? "pointer" : "default"}
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
            e.stopPropagation();
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

// Composant pour gérer les justificatifs existants (déjà uploadés dans Supabase)
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
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('red.100', 'gray.700');

  if (!justificatifs || justificatifs.length === 0) {
    return null;
  }

  return (
    <VStack spacing={4} align="stretch" mt={4}>
      <HStack justify="space-between">
        <Text fontSize="md" fontWeight="semibold" color="gray.700">
          Justificatifs existants ({justificatifs.length})
        </Text>
        <Button
          leftIcon={<FaPlus />}
          size="sm"
          colorScheme="blue"
          variant="outline"
          onClick={onUploadClick}
          isLoading={isUploading}
        >
          Ajouter
        </Button>
      </HStack>

      {justificatifs.map((justificatif) => {
        const isImage = justificatif.type_fichier?.startsWith('image/');
        const urlParts = justificatif.url_stockage?.split('/') || [];
        const filePath = `justificatifs/${urlParts[urlParts.length - 1]}`;

        return (
          <Box
            key={justificatif.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            bg={bgColor}
          >
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={1} flex="1">
                {editingFileName === justificatif.id ? (
                  <HStack w="100%">
                    <Input
                      value={newFileName}
                      onChange={(e) => onFileNameChange(e.target.value)}
                      size="sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onSaveEdit(justificatif.id);
                        }
                      }}
                    />
                    <IconButton
                      icon={<FaSave />}
                      size="sm"
                      colorScheme="green"
                      onClick={() => onSaveEdit(justificatif.id)}
                      aria-label="Sauvegarder"
                    />
                    <IconButton
                      icon={<FaTimes />}
                      size="sm"
                      onClick={onCancelEdit}
                      aria-label="Annuler"
                    />
                  </HStack>
                ) : (
                  <HStack>
                    <FaPaperclip />
                    <Text fontWeight="medium">{justificatif.nom_fichier}</Text>
                    <IconButton
                      icon={<FaEdit />}
                      size="xs"
                      variant="ghost"
                      onClick={() => onStartEdit(justificatif.id, justificatif.nom_fichier)}
                      aria-label="Renommer"
                    />
                  </HStack>
                )}
                <Text fontSize="sm" color="gray.600">
                  Type: {justificatif.type_fichier} • Taille: {(justificatif.taille_fichier / 1024).toFixed(2)} Ko
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Ajouté le {new Date(justificatif.created_at).toLocaleDateString('fr-FR')}
                </Text>
              </VStack>
              <HStack>
                <Button
                  colorScheme="blue"
                  size="sm"
                  leftIcon={<FaFileAlt />}
                  onClick={() => window.open(justificatif.url_stockage, '_blank')}
                >
                  Voir
                </Button>
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => onDeleteClick(justificatif, filePath)}
                  aria-label="Supprimer"
                />
              </HStack>
            </Flex>
            {isImage && justificatif.url_stockage && (
              <Box mt={4}>
                <Image
                  src={justificatif.url_stockage}
                  alt={justificatif.nom_fichier}
                  maxH="400px"
                  objectFit="contain"
                  borderRadius="md"
                />
              </Box>
            )}
          </Box>
        );
      })}
    </VStack>
  );
};

const ExpenseInformation = ({ formData, onChange, setFormData, files, setFiles }) => {
  const toast = useToast();
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');
  const maxFiles = 10;

  // États pour gérer les justificatifs existants - Inspiré de TransactionsImproved.jsx
  const [editingFileName, setEditingFileName] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [editingLocalFileIndex, setEditingLocalFileIndex] = useState(null);
  const [newLocalFileName, setNewLocalFileName] = useState('');
  const [justificatifToDelete, setJustificatifToDelete] = useState(null);
  const [isUploadingJustificatif, setIsUploadingJustificatif] = useState(false);
  const { isOpen: isDeleteJustificatifOpen, onOpen: onDeleteJustificatifOpen, onClose: onDeleteJustificatifClose } = useDisclosure();
  const cancelJustificatifRef = useRef();
  const fileInputRef = useRef();

  const deleteFile = (fileToDelete) => {
    setFiles(files.filter(file => file !== fileToDelete));
    URL.revokeObjectURL(fileToDelete.preview);
  };

  const clearFiles = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  const handleRenameLocalFile = (index) => {
    if (!newLocalFileName.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le nom de fichier ne peut pas être vide',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    const updatedFiles = files.map((file, idx) => {
      if (idx === index) {
        // Créer un nouveau fichier avec le nouveau nom
        const newFile = new File([file], newLocalFileName.trim(), { type: file.type });
        // Conserver la preview
        Object.assign(newFile, { preview: file.preview });
        return newFile;
      }
      return file;
    });

    setFiles(updatedFiles);
    setEditingLocalFileIndex(null);
    setNewLocalFileName('');

    toast({
      title: 'Succès',
      description: 'Fichier renommé',
      status: 'success',
      duration: 2000,
    });
  };

  // Gestion des justificatifs existants - Inspiré de TransactionsImproved.jsx
  const handleDeleteJustificatifClick = (justificatif, filePath) => {
    setJustificatifToDelete({ justificatif, filePath });
    onDeleteJustificatifOpen();
  };

  const handleDeleteJustificatifConfirm = async () => {
    if (!justificatifToDelete) return;

    const { justificatif, filePath } = justificatifToDelete;

    try {
      // Supprimer le fichier du storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Supprimer l'entrée de la base de données
      const { error: dbError } = await supabase
        .from('justificatifs')
        .delete()
        .eq('id', justificatif.id);

      if (dbError) throw dbError;

      toast({
        title: 'Succès',
        description: 'Justificatif supprimé',
        status: 'success',
        duration: 3000,
      });

      // Mettre à jour le formData en supprimant le justificatif
      const updatedJustificatifs = formData.justificatifs.filter(j => j.id !== justificatif.id);
      setFormData(prev => ({ ...prev, justificatifs: updatedJustificatifs }));
    } catch (error) {
      console.error('Erreur lors de la suppression du justificatif:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le justificatif',
        status: 'error',
        duration: 3000,
      });
    } finally {
      onDeleteJustificatifClose();
      setJustificatifToDelete(null);
    }
  };

  const handleRenameJustificatif = async (justificatifId) => {
    if (!newFileName.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le nom de fichier ne peut pas être vide',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('justificatifs')
        .update({ nom_fichier: newFileName.trim() })
        .eq('id', justificatifId);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Justificatif renommé',
        status: 'success',
        duration: 3000,
      });

      setEditingFileName(null);
      setNewFileName('');

      // Mettre à jour le formData avec le nouveau nom
      const updatedJustificatifs = formData.justificatifs.map(j =>
        j.id === justificatifId ? { ...j, nom_fichier: newFileName.trim() } : j
      );
      setFormData(prev => ({ ...prev, justificatifs: updatedJustificatifs }));
    } catch (error) {
      console.error('Erreur lors du renommage du justificatif:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de renommer le justificatif',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleUploadJustificatif = async (event) => {
    const uploadFiles = Array.from(event.target.files || []);
    if (uploadFiles.length === 0) return;

    // Si la transaction n'a pas encore d'ID, ajouter les fichiers localement
    if (!formData.id) {
      const newFiles = uploadFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      setFiles(prevFiles => [...prevFiles, ...newFiles].slice(0, maxFiles));

      toast({
        title: 'Fichiers ajoutés',
        description: `${uploadFiles.length} fichier(s) seront uploadés lors de la création`,
        status: 'info',
        duration: 3000,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Si la transaction a un ID, uploader directement vers Supabase
    setIsUploadingJustificatif(true);

    try {
      const newJustificatifs = [];

      for (const file of uploadFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${formData.id}_${Date.now()}.${fileExt}`;
        const filePath = `justificatifs/${fileName}`;

        // Upload vers Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Récupérer l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        // Enregistrer dans la base de données
        const { data: justificatifData, error: dbError } = await supabase
          .from('justificatifs')
          .insert([{
            transaction_id: formData.id,
            nom_fichier: file.name,
            type_fichier: file.type,
            taille_fichier: file.size,
            url_stockage: publicUrl
          }])
          .select()
          .single();

        if (dbError) throw dbError;

        newJustificatifs.push(justificatifData);
      }

      toast({
        title: 'Succès',
        description: `${uploadFiles.length} justificatif(s) ajouté(s)`,
        status: 'success',
        duration: 3000,
      });

      // Mettre à jour le formData avec les nouveaux justificatifs
      const updatedJustificatifs = [...(formData.justificatifs || []), ...newJustificatifs];
      setFormData(prev => ({ ...prev, justificatifs: updatedJustificatifs }));
    } catch (error) {
      console.error('Erreur lors de l\'upload du justificatif:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le justificatif',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsUploadingJustificatif(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
          <Input
            placeholder="Ajouter des mots clés"
            value={formData.annotations}
            onChange={onChange}
            name="annotations"
          />
        </FormControl>
        {/* Justificatifs */}
        <FormControl id="transaction-justifications">
          <FormLabel>Justificatifs</FormLabel>
          <InputGroup>
            <Input
              placeholder="Ajouter des justificatifs"
              background={inputBg}
              value={files.map(file => file.name).join(', ')}
              onClick={() => setIsFileModalOpen(true)}
              readOnly
              cursor="pointer"
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

        {/* Input file caché pour l'upload - Toujours présent */}
        <Input
          type="file"
          ref={fileInputRef}
          display="none"
          multiple
          accept="image/*,application/pdf"
          onChange={handleUploadJustificatif}
        />

        {/* Gestionnaire de justificatifs existants - Inspiré de TransactionsImproved.jsx */}
        {formData.id && formData.justificatifs && (
          <>
            <JustificatifsManager
              justificatifs={formData.justificatifs}
              editingFileName={editingFileName}
              newFileName={newFileName}
              onStartEdit={(id, name) => {
                setEditingFileName(id);
                setNewFileName(name);
              }}
              onSaveEdit={handleRenameJustificatif}
              onCancelEdit={() => {
                setEditingFileName(null);
                setNewFileName('');
              }}
              onDeleteClick={handleDeleteJustificatifClick}
              onFileNameChange={setNewFileName}
              onUploadClick={() => fileInputRef.current?.click()}
              isUploading={isUploadingJustificatif}
            />
          </>
        )}

        {/* Modal Justificatifs - Design de TransactionsImproved.jsx */}
        <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Flex justify="space-between" align="center" pr={10}>
                <Text>Justificatifs - {formData.libelle || 'Nouvelle transaction'}</Text>
                <Button
                  leftIcon={<FaPlus />}
                  colorScheme="blue"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  isLoading={isUploadingJustificatif}
                  loadingText="Upload..."
                >
                  Ajouter
                </Button>
              </Flex>
            </ModalHeader>
            <ModalCloseButton top={4} />
            <ModalBody pb={6}>
              {/* Afficher les justificatifs existants (pour transactions avec ID) */}
              {formData.id && formData.justificatifs && formData.justificatifs.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {formData.justificatifs.map((justificatif) => {
                    const urlParts = justificatif.url_stockage?.split('/') || [];
                    const filePath = `justificatifs/${urlParts[urlParts.length - 1]}`;

                    return (
                      <Box
                        key={justificatif.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        borderColor={borderColor}
                        bg={bgColor}
                      >
                        <Flex justify="space-between" align="center">
                          <VStack align="start" spacing={1} flex="1">
                            {editingFileName === justificatif.id ? (
                              <HStack w="100%">
                                <Input
                                  value={newFileName}
                                  onChange={(e) => setNewFileName(e.target.value)}
                                  size="sm"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleRenameJustificatif(justificatif.id);
                                    }
                                  }}
                                />
                                <IconButton
                                  icon={<FaSave />}
                                  size="sm"
                                  colorScheme="green"
                                  onClick={() => handleRenameJustificatif(justificatif.id)}
                                  aria-label="Sauvegarder"
                                />
                                <IconButton
                                  icon={<FaTimes />}
                                  size="sm"
                                  onClick={() => {
                                    setEditingFileName(null);
                                    setNewFileName('');
                                  }}
                                  aria-label="Annuler"
                                />
                              </HStack>
                            ) : (
                              <HStack>
                                <FaPaperclip />
                                <Text fontWeight="medium">{justificatif.nom_fichier}</Text>
                                <IconButton
                                  icon={<FaEdit />}
                                  size="xs"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingFileName(justificatif.id);
                                    setNewFileName(justificatif.nom_fichier);
                                  }}
                                  aria-label="Renommer"
                                />
                              </HStack>
                            )}
                            <Text fontSize="sm" color="gray.600">
                              Type: {justificatif.type_fichier} • Taille: {(justificatif.taille_fichier / 1024).toFixed(2)} Ko
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              Ajouté le {new Date(justificatif.created_at).toLocaleDateString('fr-FR')}
                            </Text>
                          </VStack>
                          <HStack>
                            <Button
                              colorScheme="blue"
                              size="sm"
                              leftIcon={<FaFileAlt />}
                              onClick={() => window.open(justificatif.url_stockage, '_blank')}
                            >
                              Voir
                            </Button>
                            <IconButton
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDeleteJustificatifClick(justificatif, filePath)}
                              aria-label="Supprimer"
                            />
                          </HStack>
                        </Flex>
                        {justificatif.type_fichier?.startsWith('image/') && (
                          <Box mt={4}>
                            <Image
                              src={justificatif.url_stockage}
                              alt={justificatif.nom_fichier}
                              maxH="400px"
                              objectFit="contain"
                              borderRadius="md"
                            />
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </VStack>
              ) : files.length > 0 ? (
                /* Afficher les fichiers locaux (avant création de transaction) */
                <VStack spacing={4} align="stretch">
                  {files.map((file, index) => {
                    const isImage = file.type.startsWith('image/');
                    return (
                      <Box
                        key={index}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        borderColor={borderColor}
                        bg={bgColor}
                      >
                        <Flex justify="space-between" align="center">
                          <VStack align="start" spacing={1} flex="1">
                            {editingLocalFileIndex === index ? (
                              <HStack w="100%">
                                <Input
                                  value={newLocalFileName}
                                  onChange={(e) => setNewLocalFileName(e.target.value)}
                                  size="sm"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleRenameLocalFile(index);
                                    }
                                  }}
                                />
                                <IconButton
                                  icon={<FaSave />}
                                  size="sm"
                                  colorScheme="green"
                                  onClick={() => handleRenameLocalFile(index)}
                                  aria-label="Sauvegarder"
                                />
                                <IconButton
                                  icon={<FaTimes />}
                                  size="sm"
                                  onClick={() => {
                                    setEditingLocalFileIndex(null);
                                    setNewLocalFileName('');
                                  }}
                                  aria-label="Annuler"
                                />
                              </HStack>
                            ) : (
                              <HStack>
                                <FaPaperclip />
                                <Text fontWeight="medium">{file.name}</Text>
                                <IconButton
                                  icon={<FaEdit />}
                                  size="xs"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingLocalFileIndex(index);
                                    setNewLocalFileName(file.name);
                                  }}
                                  aria-label="Renommer"
                                />
                              </HStack>
                            )}
                            <Text fontSize="sm" color="gray.600">
                              Type: {file.type} • Taille: {(file.size / 1024).toFixed(2)} Ko
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              À uploader lors de la création
                            </Text>
                          </VStack>
                          <HStack>
                            {isImage && file.preview && (
                              <Image
                                src={file.preview}
                                alt={file.name}
                                boxSize="50px"
                                objectFit="cover"
                                borderRadius="md"
                              />
                            )}
                            <IconButton
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => deleteFile(file)}
                              aria-label="Supprimer"
                            />
                          </HStack>
                        </Flex>
                        {isImage && file.preview && (
                          <Box mt={4}>
                            <Image
                              src={file.preview}
                              alt={file.name}
                              maxH="400px"
                              objectFit="contain"
                              borderRadius="md"
                            />
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </VStack>
              ) : (
                /* État vide */
                <Flex justify="center" align="center" h="200px" flexDirection="column">
                  <FaFileAlt size={48} color="gray" />
                  <Text mt={4} color="gray.600">Aucun justificatif disponible</Text>
                  <Button
                    mt={4}
                    leftIcon={<FaPlus />}
                    colorScheme="blue"
                    onClick={() => fileInputRef.current?.click()}
                    isLoading={isUploadingJustificatif}
                  >
                    Ajouter un justificatif
                  </Button>
                </Flex>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* AlertDialog pour confirmer la suppression d'un justificatif - Inspiré de TransactionsImproved.jsx */}
        <AlertDialog
          isOpen={isDeleteJustificatifOpen}
          leastDestructiveRef={cancelJustificatifRef}
          onClose={onDeleteJustificatifClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                <HStack spacing={3}>
                  <Box
                    bg="red.100"
                    p={2}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FaFileAlt size={20} color="#E53E3E" />
                  </Box>
                  <Text>Supprimer le justificatif</Text>
                </HStack>
              </AlertDialogHeader>
              <AlertDialogCloseButton />

              <AlertDialogBody>
                <VStack align="stretch" spacing={4}>
                  <Text>
                    Êtes-vous sûr de vouloir supprimer ce justificatif ? Cette action est irréversible.
                  </Text>
                  {justificatifToDelete && (
                    <Box
                      p={4}
                      bg="blue.50"
                      borderRadius="lg"
                      border="1px"
                      borderColor="blue.200"
                    >
                      <VStack align="start" spacing={2}>
                        <HStack spacing={2}>
                          <FaPaperclip color="#3182CE" />
                          <Text fontSize="sm" fontWeight="semibold">
                            {justificatifToDelete.justificatif.nom_fichier}
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Type: {justificatifToDelete.justificatif.type_fichier}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Taille: {(justificatifToDelete.justificatif.taille_fichier / 1024).toFixed(2)} Ko
                        </Text>
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelJustificatifRef} onClick={onDeleteJustificatifClose}>
                  Annuler
                </Button>
                <Button colorScheme="red" onClick={handleDeleteJustificatifConfirm} ml={3}>
                  Supprimer
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
    </Box>
  );
};

const ExpenseVentilationComponent = ({ ventilations, onVentilationChange, onAddVentilation, onRemoveVentilation }) => {
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

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('red.100', 'gray.600');
  const hoverBg = useColorModeValue("green.100", "green.700");
  const activeBg = useColorModeValue("blue.300", "blue.800");

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