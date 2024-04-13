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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const VentilationComponent = () => {
  const [ventilations, setVentilations] = useState([
    { category: 'Télécom, fournitures, docum.', amount: '-7.99' },
  ]);
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const addVentilation = () => {
    // Add new ventilation logic
    setVentilations([...ventilations, { category: '', amount: '' }]);
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Ventilation(s)
      </Text>
      {ventilations.map((ventilation, index) => (
        <Box key={index} mb={4} p={4} bg="white" borderRadius="lg" boxShadow="sm">
          <Text mb={2} fontWeight="medium">Ventilation {index + 1}</Text>
          <Stack spacing={4}>
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
              <Flex>
                <Input type="number" value={ventilation.amount} />
                <Text ml={2} alignSelf="center" fontWeight="medium">€</Text>
              </Flex>
            </FormControl>
          </Stack>
        </Box>
      ))}
      <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" onClick={addVentilation} mt={2}>
        Ajouter une ventilation
      </Button>
    </Box>
  );
};

export default VentilationComponent;
