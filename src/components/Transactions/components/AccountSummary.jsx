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
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box p={4} maxW="400px" w="full" mx="auto">
      <Menu isOpen={isOpen} matchWidth>
        {/* Mouse events added here to control the visibility of the dropdown */}
        <MenuButton 
          as={Button} 
          rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />} 
          onMouseEnter={onOpen} // Open dropdown on mouse enter
          onMouseLeave={onClose} // Close dropdown on mouse leave
          onClick={onToggle} // Toggle on click as well
          w="full"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="semibold">Solde total:</Text>
            <Text fontWeight="bold">4 972,79 €</Text>
          </Flex>
        </MenuButton>
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}> {/* Keep dropdown open when hovered */}
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
