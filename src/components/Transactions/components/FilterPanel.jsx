import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
const useDatePickerStyle = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgColor = useColorModeValue('white', 'gray.700');
  return {
    className: "chakra-datepicker",
    style: {
      borderColor: borderColor,
      backgroundColor: bgColor,
      borderRadius: 'var(--chakra-radii-md)',
      padding: 'var(--chakra-space-2)',
      width: '100%',
      fontSize: 'var(--chakra-fontSizes-md)',
      lineHeight: 'var(--chakra-lineHeights-normal)',
    }
  }
};

const FilterPanel = () => {
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const inputBgColor = useColorModeValue('white', 'gray.700');
    const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const datePickerStyle = useDatePickerStyle();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [menuButtonWidth, setMenuButtonWidth] = useState(null);
  const menuButtonRef = useRef(null);
  
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
          <HStack>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              {...datePickerStyle}
              // Custom popper placement
              popperPlacement="bottom-start"

            />
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              {...datePickerStyle}
              // Custom popper placement
              popperPlacement="bottom-end"

            />
          </HStack>
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
