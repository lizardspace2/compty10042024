import React from 'react';
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AccountSummary = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box p={4} bg="white" maxW="400px" w="full" mx="auto">
      <Menu isOpen={isOpen} matchWidth>
        <MenuButton as={Button} rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />} onClick={onToggle} w="full">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="semibold">Solde total:</Text>
            <Text fontWeight="bold">4 972,79 €</Text>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem minH="48px">
            <Box w="full">
              <Flex justify="space-between" align="center" w="full">
                <Box flex="1">
                  <Text fontWeight="bold" noOfLines={1}>
                    1. Boursobank (ex Boursorama)
                  </Text>
                  <Text fontSize="sm">M Recipon Guillaume</Text>
                </Box>
                <Box flex="1" textAlign="right">
                  <Text fontWeight="bold" noOfLines={1}>
                    4 972,79 €
                  </Text>
                  <Text fontSize="sm">le 13/04/2024</Text>
                </Box>
              </Flex>
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AccountSummary;
