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
} from '@chakra-ui/react';
import {
  FaHome,
  FaRegListAlt,
  FaRegCreditCard,
  FaRegFileAlt,
  FaUserFriends,
  FaUserCircle,
  FaPaperPlane,
  FaCaretDown,
} from 'react-icons/fa';
import { FcBusinessman, FcImport, FcLike } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom'; // Utilisation de useNavigate

function Navbar() {
  const navigate = useNavigate(); // Initialisation de useNavigate

  // Fonction de redirection vers la route /profile
  const redirectToProfile = () => {
    navigate('/profile');
  };

  // Fonction de redirection vers la route /parrainage
  const redirectToParrainage = () => {
    navigate('/parrainage');
  };

    // Fonction de redirection vers la route /parrainage
    const redirectToSeDeconnecter = () => {
      navigate('/sedeconnecter');
    };

  return (
    <Box bg="pink.100" w="100%" p={4} color="black" h="100vh" display="flex" flexDirection="column">
      <VStack spacing={4} align="stretch" flex="1">
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">Compty 🚀</Text>
        </Box>
        <Divider />
        <Menu>
          <MenuButton as={Button} display="flex" justifyContent="flex-start" variant="ghost" rounded="full" rightIcon={<FaCaretDown />}>
            <Flex>
              <Icon as={FaUserCircle} />
              <Text ml={2}>Bonjour Guillaume</Text>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<Icon as={FcBusinessman} />} onClick={redirectToProfile}>Paramètres</MenuItem>
            <MenuItem icon={<Icon as={FcLike} color="red.500" />} onClick={redirectToParrainage}>1 mois offert</MenuItem>
            <MenuItem icon={<Icon as={FcImport} />} onClick={redirectToSeDeconnecter}>Se déconnecter</MenuItem>
          </MenuList>
        </Menu>
        <Link to="/pilotage" style={{ textDecoration: 'none' }}> {/* Updated path */}
          <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" rounded="full">
            <Icon as={FaHome} />
            <Text ml={2}>Pilotage</Text>
          </Button>
        </Link>
        <Link to="/transactions" style={{ textDecoration: 'none' }}>
          <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" rounded="full">
            <Icon as={FaRegCreditCard} />
            <Text ml={2}>Transactions</Text>
          </Button>
        </Link>
        <Link to="/todo" style={{ textDecoration: 'none' }}> {/* Updated path */}
          <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" rounded="full" position="relative">
            <Icon as={FaRegListAlt} />
            <Text ml={2}>À faire</Text>
            <Text as="span" position="absolute" top="-1" right="-1" p="1" fontSize="xs" fontWeight="bold" color="white" bg="red.500" borderRadius="full">
              1
            </Text>
          </Button>
        </Link>
        <Link to="/documents" style={{ textDecoration: 'none' }}>
          <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" rounded="full">
            <Icon as={FaRegFileAlt} />
            <Text ml={2}>Documents</Text>
          </Button>
        </Link>
        <Link to="/accompaniment" style={{ textDecoration: 'none' }}> {/* Updated path */}
          <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" rounded="full">
            <Icon as={FaUserFriends} />
            <Text ml={2}>Accompagnement</Text>
          </Button>
        </Link>
        <Divider />
        <Spacer />
        <Link to="/parrainage" style={{ textDecoration: 'none' }}>
          <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" rounded="full">
            <Icon as={FaPaperPlane} />
            <Text ml={2}>Parrainage</Text>
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default Navbar;
