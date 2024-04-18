import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import { FaPlus, FaPercent, FaTimes } from 'react-icons/fa';
import { MdEuro } from 'react-icons/md';
import { FcFullTrash } from 'react-icons/fc';
import CategoryComponent from '../CategoryComponent';

const ExpenseVentilationComponent = () => {
  const [ventilations, setVentilations] = useState([
    { category: 'Dépense personnelle', amount: '-0.99', percentage: 100 },
  ]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // State to control modal visibility

  const iconColor = useColorModeValue('gray.200', 'gray.300');
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const addVentilation = () => {
    setVentilations([...ventilations, { category: '', amount: '', percentage: 0 }]);
  };

  const removeVentilation = index => {
    const newVentilations = ventilations.filter((_, i) => i !== index);
    setVentilations(newVentilations);
  };

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const onCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Ventilation(s)
      </Text>
      {ventilations.map((ventilation, index) => (
        <Box key={index} mb={4} p={4} bg="white" borderRadius="lg" boxShadow="sm">
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
              {/* Replace Select with Button */}
              <Button onClick={openCategoryModal} variant="outline">
                Sélectionnez une catégorie
              </Button>
            </FormControl>
            <FormControl>
              <FormLabel>Montant</FormLabel>
              <InputGroup>
                <Input type="number" value={ventilation.amount} />
                <InputRightElement pointerEvents="none" children={<MdEuro color={iconColor} />} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Pourcentage</FormLabel>
              <InputGroup>
                <Input type="number" value={ventilation.percentage} />
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
            <CategoryComponent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ExpenseVentilationComponent;
