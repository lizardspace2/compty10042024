// TransactionsHeader.js
import React from 'react';
import { Input, InputGroup, InputLeftElement, Button, Flex, Heading, Icon, useColorModeValue } from '@chakra-ui/react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import { FcHeatMap } from "react-icons/fc";
import { BsPlus } from 'react-icons/bs';

const TransactionsHeader = () => {
  // You can use useColorModeValue to switch colors for different color modes (light/dark)
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBgColor = useColorModeValue('white', 'gray.700');
  const filterButtonColorScheme = useColorModeValue('gray', 'blue');
  const addButtonColorScheme = useColorModeValue('pink', 'green');

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px"
      borderColor={borderColor}
      p={4}
      boxShadow="sm" // Add a slight shadow to match the design
    >
      <Heading size="md">Transactions</Heading>
      <Flex>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdSearch color="gray.500" />} // Changed icon
          />
          <Input
            type="search"
            placeholder="Rechercher"
            bgColor={inputBgColor}
            boxShadow="base" // Add shadow to the input field
          />
        </InputGroup>
        <Button
          leftIcon={<FcHeatMap />}
          ml={2}
          colorScheme={filterButtonColorScheme}
          variant="solid" // You can choose "outline" or "ghost" depending on your design
        >
          Filtrer
        </Button>
        <Button
          rightIcon={<BsPlus />}
          colorScheme={addButtonColorScheme}
          ml={2}
          borderRadius="full"
          boxShadow="md" // Add a stronger shadow to the 'Add' button
        >
          Ajouter
        </Button>
      </Flex>
    </Flex>
  );
};

export default TransactionsHeader;
