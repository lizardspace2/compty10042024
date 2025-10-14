import React from 'react';
import { Flex, Heading, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';

const PilotageBanner = () => {
  const yearOptions = ['Exercice 2024', 'Exercice 2023', 'Exercice 2022'];

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="red.50"
      borderBottom="1px"
      borderColor="red.100"
      p={6}
      boxShadow="sm"
    >
      <Heading size="lg" color="gray.800">Pilotage</Heading>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<IoIosArrowDown />}
          variant="outline"
          borderRadius="xl"
          borderColor="gray.300"
          _hover={{ bg: 'red.50', borderColor: 'red.400' }}
        >
          {yearOptions[0]}
        </MenuButton>
        <MenuList borderRadius="xl" boxShadow="xl">
          {yearOptions.map((year, index) => (
            <MenuItem key={index} _hover={{ bg: 'red.50' }}>
              {year}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default PilotageBanner;
