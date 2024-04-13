import React from 'react';
import { Flex, Heading, Menu, MenuButton, MenuList, MenuItem, Button, Icon } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdSearch, MdFilterList } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';

const DocumentBanner = () => {
  const yearOptions = ['Exercice 2024', 'Exercice 2023', 'Exercice 2022'];

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px"
      borderColor="gray.200" // Match the borderColor of TransactionsHeader
      p={4}
      boxShadow="sm" // Match the boxShadow of TransactionsHeader
    >
      <Heading size="md">Documents</Heading>
      <Flex>
        <Menu>
          <MenuButton as={Button} rightIcon={<IoIosArrowDown />} size="lg" rounded="md" ml={2}>
            {yearOptions[1]} {/* Default selected value */}
          </MenuButton>
          <MenuList>
            {yearOptions.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default DocumentBanner;
