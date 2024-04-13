import React from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  Stack,
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { MdDateRange, MdEuroSymbol } from 'react-icons/md';

const FilterPanel = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      bg={inputBgColor}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Plage de dates</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={MdDateRange} color="gray.500" />}
            />
            <Input type="text" placeholder="Début - Fin" />
          </InputGroup>
        </FormControl>
        
        <FormControl>
          <FormLabel>Plage de montants</FormLabel>
          <HStack>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={MdEuroSymbol} color="gray.500" />}
              />
              <Input placeholder="min" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={MdEuroSymbol} color="gray.500" />}
              />
              <Input placeholder="max" />
            </InputGroup>
          </HStack>
        </FormControl>
        
        <FormControl>
          <FormLabel>Entrées / sorties</FormLabel>
          <HStack spacing={1}>
            <Button flex={1} variant="outline">Tous</Button>
            <Button flex={1} variant="outline">Entrées</Button>
            <Button flex={1} variant="outline">Sorties</Button>
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>Catégories</FormLabel>
          <Select placeholder="Toutes">
            {/* Map your categories here */}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Justificatifs</FormLabel>
          <HStack spacing={1}>
            <Button flex={1} variant="outline">Tous</Button>
            <Button flex={1} variant="outline">Avec</Button>
            <Button flex={1} variant="outline">Sans</Button>
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>Types de transaction</FormLabel>
          <Select placeholder="Toutes">
            {/* Map your transaction types here */}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default FilterPanel;
