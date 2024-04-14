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
  Text,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { FcFullTrash } from 'react-icons/fc'; // Importing FcFullTrash icon

const VentilationComponent = () => {
  const [ventilations, setVentilations] = useState([
    { category: 'Télécom, fournitures, docum.', amount: '-7.99', percentage: 100 },
  ]);

  // Define color mode value hooks
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const addVentilation = () => {
    setVentilations([...ventilations, { category: '', amount: '', percentage: 0 }]);
  };

  const removeVentilation = index => {
    const newVentilations = ventilations.filter((_, i) => i !== index);
    setVentilations(newVentilations);
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Ventilation(s)
      </Text>
      {ventilations.map((ventilation, index) => (
        <Flex key={index} mb={4} p={4} bg="white" borderRadius="lg" boxShadow="sm" align="center">
          <Stack spacing={4} flex={1}>
            <Text fontWeight="medium">Ventilation {index + 1}</Text>
            <FormControl>
              <FormLabel>Catégorie</FormLabel>
              <Select placeholder="Sélectionnez une catégorie" defaultValue={ventilation.category}>
                {/* Add category options here */}
                <option value="telecom">Télécom, fournitures, docum.</option>
                {/* ... other categories */}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Montant</FormLabel>
              <Input type="number" value={ventilation.amount} />
            </FormControl>
            <FormControl>
              <FormLabel>Pourcentage</FormLabel>
              <Input type="number" value={ventilation.percentage} />
            </FormControl>
          </Stack>
          <IconButton
            aria-label="Remove ventilation"
            icon={<FcFullTrash />}
            size="lg"
            variant="ghost"
            onClick={() => removeVentilation(index)}
            isRound // To give the button a round shape
          />
        </Flex>
      ))}
      <Button leftIcon={<FaPlus />} colorScheme="blue" variant="outline" onClick={addVentilation} mt={2}>
        Ajouter une ventilation
      </Button>
    </Box>
  );
};

export default VentilationComponent;
