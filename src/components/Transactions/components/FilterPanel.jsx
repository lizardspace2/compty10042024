import React, { useState, useRef, useEffect } from 'react';
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
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
    Checkbox,
    useDisclosure,
  } from '@chakra-ui/react';
  import { MdDateRange, MdEuroSymbol } from 'react-icons/md';
  import { FaChevronDown,FaChevronUp } from "react-icons/fa";

const FilterPanel = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBgColor = useColorModeValue('white', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [menuButtonWidth, setMenuButtonWidth] = useState(null);
  const menuButtonRef = useRef(null);

  // Handle category change
  const handleCategoryChange = (value) => {
    setSelectedCategories(value);
  };

  useEffect(() => {
    if (menuButtonRef.current) {
      setMenuButtonWidth(menuButtonRef.current.offsetWidth);
    }
  }, [menuButtonRef]);

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
          <Menu closeOnSelect={false} onOpen={onOpen} onClose={onClose}>
            <MenuButton 
              as={Button} 
              rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />} 
              w="full" 
              borderWidth="1px" 
              borderColor={borderColor}
              ref={menuButtonRef} // Reference to get the width
            >
              {selectedCategories.length > 0 ? `${selectedCategories.length} selected` : 'Select categories'}
            </MenuButton>
            <MenuList minWidth={`${menuButtonWidth}px`} maxWidth={`${menuButtonWidth}px`}>
              <MenuOptionGroup defaultValue={selectedCategories} type="checkbox" onChange={handleCategoryChange}>
              <MenuItemOption value="all">
                  <Checkbox isChecked={selectedCategories.length === 4}>Tout sélectionner</Checkbox>
                </MenuItemOption>
              <MenuItemOption value="purchase">
                <Checkbox isChecked={selectedCategories.includes('purchase')}>Achat</Checkbox>
              </MenuItemOption>              </MenuOptionGroup>
            </MenuList>
          </Menu>
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