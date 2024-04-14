import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Center,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { GoPaperclip } from 'react-icons/go';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import CategoryComponent from './CategoryComponent';
import TransactionDetailHeader from './transactiondetail/TransactionDetailHeader';
import TransactionDetail from './TransactionDetail';

function TransactionItem() {
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose, onClose } = useDisclosure();
  const { isOpen: isCategoryModalOpen, onOpen: onCategoryModalOpen, onClose: onCategoryModalClose } = useDisclosure();
  const { isOpen: isCategoryOpen, onOpen: onCategoryOpen, onClose: onCategoryClose } = useDisclosure();
  const { isOpen: isDetailOpen, onToggle: onDetailToggle } = useDisclosure();
  const { isOpen: isKeywordModalOpen, onOpen: onKeywordModalOpen, onClose: onKeywordModalClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const dateColor = useColorModeValue('gray.600', 'gray.300');
  const amountColor = useColorModeValue('red.500', 'red.300');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  const [keyword, setKeyword] = useState('');

  const handleConfirm = () => {
    console.log('Keyword or hashtag:', keyword);
    // Handle the submit action here
    onKeywordModalClose(); // Close the modal after action
  };

  return (
    <>
      <Flex
        p={4}
        bg={bgColor}
        borderRadius="lg"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
        transition="background 0.3s ease"
      >
        <Text fontSize="lg" fontWeight="bold" color={dateColor}>
          09 avr.
        </Text>

        <Tooltip hasArrow label="Lier un justificatif à la transaction" placement="top" closeOnClick={false}>
          <Box display="flex" alignItems="center">
            <Icon
              as={GoPaperclip}
              w={5}
              h={5}
              onClick={onUploadOpen}
              sx={{ _hover: { transform: 'scale(1.2)' }, transition: 'transform 0.2s ease-in-out' }}
            />
          </Box>
        </Tooltip>

        <Tooltip hasArrow label="Cliquer pour Annoter" placement="top" closeOnClick={false}>
          <Box onClick={onKeywordModalOpen}>
            <Text fontWeight="medium" onClick={onKeywordModalOpen}>
              Prlv Sepa Synamobile Rum Recipon
            </Text>
            <Text fontSize="sm" color={dateColor} onClick={onKeywordModalOpen}>
              Guillaume Marie Franco
            </Text>
          </Box>
        </Tooltip>

        <Text
          fontSize="lg"
          color="gray.500"
          onClick={onCategoryModalOpen}
          _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          Télécom, fournitures, docum.
        </Text>

        <Text fontSize="lg" fontWeight="bold" color={amountColor} onClick={onDetailToggle}>
          -799 €
        </Text>
      </Flex>

      <Modal isOpen={isCategoryModalOpen} onClose={onCategoryModalClose} size="full" overflow="auto">
        <ModalOverlay />
        <ModalContent m={0} maxW="100vw">
          <ModalHeader>
            Catégories
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
            <CategoryComponent />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUploadOpen} onClose={onUploadClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Prlv Sepa Symamobile Rum Recipon Guillaume Marie Franco
            <IconButton
              aria-label="Close modal"
              icon={<FaTimes />}
              onClick={onClose}
              position="absolute"
              right="8px"
              top="8px"
              size="sm"
            />
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Text>9 avr. 2024 - Montant : -7,99 €</Text>
              <Center
                p={10}
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
                w="full"
                bg="gray.50"
              >
                <VStack spacing={3}>
                  <FaCloudUploadAlt size="3em" />
                  <Text textAlign="center">
                    Déposez ici les justificatifs que vous souhaitez attacher à cette transaction
                  </Text>
                  <Text fontSize="sm">Formats autorisés : PNG / JPG / PDF</Text>
                  <Text fontSize="sm">Taille max : 10MB par justificatif</Text>
                  <Button as="label" size="md" colorScheme="pink">
                    Sélectionner des fichiers
                    <Input type="file" hidden multiple />
                  </Button>
                </VStack>
              </Center>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isKeywordModalOpen} onClose={onKeywordModalClose}>
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
            <Button variant='ghost' onClick={onKeywordModalClose}>Annuler</Button>
            <Button colorScheme='pink' ml={3} onClick={handleConfirm}>
              Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDetailOpen} onClose={onDetailToggle} size="full" overflow="auto">
        <ModalOverlay />
        <ModalContent m={0} maxW="100vw">
          <TransactionDetailHeader onClose={onDetailToggle} />
          <TransactionDetail />
        </ModalContent>
      </Modal>
    </>
  );
}

export default TransactionItem;
