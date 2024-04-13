import React from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
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
    <Box p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200" w="full">
      <Menu isOpen={isOpen}>
        <MenuButton as={Button} rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />} onClick={onToggle} w="full" justifyContent="space-between">
          <Box>
            <Text fontWeight="semibold">Solde total:</Text>
            <Text fontWeight="bold">4 972,79 €</Text>
          </Box>
        </MenuButton>
        <MenuList>
          <VStack alignItems="flex-start" p={4}>
            <MenuItem>
              <Flex justifyContent="space-between" w="full">
                <Text fontWeight="bold">1. Boursobank (ex Boursorama)</Text>
                <Text fontWeight="bold">4 972,79 €</Text>
              </Flex>
            </MenuItem>
            <Text fontSize="sm" alignSelf="flex-end">M Recipon Guillaume</Text>
            <Text fontSize="sm" alignSelf="flex-end">le 13/04/2024</Text>
          </VStack>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AccountSummary;
