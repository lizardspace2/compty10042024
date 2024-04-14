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
  InputLeftElement,
  Text,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { FaPlus, FaPercent } from 'react-icons/fa'; // Import FaPercent for percentage
import { MdEuro } from 'react-icons/md'; // Import MdEuro for euro symbol
import { FcFullTrash } from 'react-icons/fc';

const VentilationComponent = () => {
  const [ventilations, setVentilations] = useState([
    { category: 'Dépense personnelle', amount: '-0.99', percentage: 100 },
  ]);

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
              />
            </Tooltip>
          </Flex>
          <FormControl mt={4}>
            <FormLabel>Catégorie</FormLabel>
            <Select placeholder="Sélectionnez une catégorie" defaultValue={ventilation.category}>
              {/* Add category options here */}
              <option value="personal">Dépense personnelle</option>
              {/* ... other categories */}
            </Select>
          </FormControl>
        <FormControl mt={4}>
          <FormLabel>Montant</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdEuro />} // Use MdEuro icon here
            />
            <Input type="number" value={ventilation.amount} />
          </InputGroup>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Pourcentage</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaPercent />} // Use FaPercent icon here
            />
            <Input type="number" value={ventilation.percentage} />
          </InputGroup>
        </FormControl>
      </Box>
    ))}
      <Button leftIcon={<FaPlus />} colorScheme="blue" variant="outline" onClick={addVentilation} mt={2}>
        Ajouter une ventilation
      </Button>
    </Box>
  );
};

export default VentilationComponent;
