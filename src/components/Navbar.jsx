import React from 'react';
import {
  Box,
  VStack,
  Text,
  Divider,
  Icon,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import {
  FaHome,
  FaRegListAlt,
  FaRegCreditCard,
  FaRegFileAlt,
  FaUserFriends,
  FaUserCircle,
  FaPaperPlane,
  FaChevronDown,
} from 'react-icons/fa';
import { FcBusinessman, FcImport, FcLike } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const redirectToProfile = () => {
    navigate('/profile');
  };

  const redirectToParrainage = () => {
    navigate('/parrainage');
  };

  const redirectToSeDeconnecter = () => {
    navigate('/sedeconnecter');
  };

  return (
    <Box
      bg="red.50"
      w="100%"
      h="100vh"
      display="flex"
      flexDirection="column"
      borderRight="1px"
      borderColor="red.100"
      boxShadow="sm"
    >
      <VStack spacing={2} align="stretch" flex="1" p={4}>
        {/* Logo */}
        <Box textAlign="center" py={4}>
          <Text fontSize="2xl" fontWeight="bold" color="red.500">
            Compty
          </Text>
        </Box>

        <Divider />

        {/* User Menu */}
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            w="full"
            justifyContent="flex-start"
            rightIcon={<FaChevronDown />}
            px={4}
            py={6}
            _hover={{ bg: 'red.50' }}
            _active={{ bg: 'red.100' }}
          >
            <Flex align="center">
              <Avatar size="sm" name="Guillaume" bg="red.400" mr={3} />
              <Text fontWeight="medium">Guillaume</Text>
            </Flex>
          </MenuButton>
          <MenuList borderRadius="xl" boxShadow="xl">
            <MenuItem icon={<Icon as={FcBusinessman} />} onClick={redirectToProfile}>
              Paramètres
            </MenuItem>
            <MenuItem icon={<Icon as={FcLike} />} onClick={redirectToParrainage}>
              1 mois offert
            </MenuItem>
            <MenuItem icon={<Icon as={FcImport} />} onClick={redirectToSeDeconnecter}>
              Se déconnecter
            </MenuItem>
          </MenuList>
        </Menu>

        <Divider />

        {/* Navigation Links */}
        <VStack spacing={1} align="stretch" flex="1">
          <Link to="/pilotage" style={{ textDecoration: 'none' }}>
            <Button
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              leftIcon={<Icon as={FaHome} />}
              px={4}
              py={6}
              _hover={{ bg: 'red.50' }}
              _active={{ bg: 'red.100' }}
            >
              Pilotage
            </Button>
          </Link>

          <Link to="/transactions" style={{ textDecoration: 'none' }}>
            <Button
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              leftIcon={<Icon as={FaRegCreditCard} />}
              px={4}
              py={6}
              _hover={{ bg: 'red.50' }}
              _active={{ bg: 'red.100' }}
            >
              Transactions
            </Button>
          </Link>

          <Link to="/todo" style={{ textDecoration: 'none' }}>
            <Button
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              leftIcon={<Icon as={FaRegListAlt} />}
              position="relative"
              px={4}
              py={6}
              _hover={{ bg: 'red.50' }}
              _active={{ bg: 'red.100' }}
            >
              À faire
              <Box
                position="absolute"
                top={2}
                right={2}
                bg="red.500"
                color="white"
                borderRadius="full"
                w={5}
                h={5}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="bold"
              >
                1
              </Box>
            </Button>
          </Link>

          <Link to="/documents" style={{ textDecoration: 'none' }}>
            <Button
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              leftIcon={<Icon as={FaRegFileAlt} />}
              px={4}
              py={6}
              _hover={{ bg: 'red.50' }}
              _active={{ bg: 'red.100' }}
            >
              Documents
            </Button>
          </Link>

          <Link to="/accompaniment" style={{ textDecoration: 'none' }}>
            <Button
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              leftIcon={<Icon as={FaUserFriends} />}
              px={4}
              py={6}
              _hover={{ bg: 'red.50' }}
              _active={{ bg: 'red.100' }}
            >
              Accompagnement
            </Button>
          </Link>
        </VStack>

        <Divider />

        {/* Parrainage Link */}
        <Link to="/parrainage" style={{ textDecoration: 'none' }}>
          <Button
            variant="ghost"
            w="full"
            justifyContent="flex-start"
            leftIcon={<Icon as={FaPaperPlane} />}
            px={4}
            py={6}
            _hover={{ bg: 'red.50' }}
            _active={{ bg: 'red.100' }}
          >
            Parrainage
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default Navbar;
