import React from 'react';
import { Input, InputGroup, InputLeftElement, Button, Flex, Heading, Icon, useColorModeValue } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { FcHeatMap } from "react-icons/fc";
import { BsPlus } from 'react-icons/bs';

const TransactionsHeader = ({ onToggleFilter }) => {
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
      boxShadow="sm"
    >
      <Heading size="md">Transactions</Heading>
      <Flex alignItems="center">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdSearch color="gray.500" />}
          />
          <Input
            type="search"
            placeholder="Rechercher"
            bgColor={inputBgColor}
            boxShadow="base"
            maxW="400px"
          />
        </InputGroup>
        <Button
          leftIcon={<FcHeatMap />}
          ml={2}
          colorScheme={filterButtonColorScheme}
          variant="solid"
          onClick={onToggleFilter}
        >
          Filtrer
        </Button>
      </Flex>
      <Button
        rightIcon={<BsPlus />}
        colorScheme={addButtonColorScheme}
        ml={2}
        borderRadius="full"
        boxShadow="md"
      >
        Ajouter
      </Button>
    </Flex>
  );
};

export default TransactionsHeader;
