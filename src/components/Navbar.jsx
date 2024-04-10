import React from 'react';
import { Box, VStack, Text, Divider, Icon, Button, Spacer } from '@chakra-ui/react'; // Importez Spacer depuis chakra-ui
import { FaHome, FaRegListAlt, FaRegCreditCard, FaRegFileAlt, FaUserFriends, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Box bg="pink.100" w="100%" p={4} color="black" h="100vh" display="flex" flexDirection="column"> {/* Assurez-vous que la hauteur du conteneur est suffisante pour pousser le contenu vers le bas */}
      <VStack spacing={4} align="stretch" flex="1">
        <Box>
          <Text fontSize="lg" fontWeight="bold">indy</Text>
        </Box>
        <Divider />
        {/* Les liens existants restent inchangés */}
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" rounded="full">
            <Icon as={FaUserCircle} />
            <Text ml={2}>Bonjour Guillaume</Text>
          </Button>
        </Link>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
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
        <Link to="/tasks" style={{ textDecoration: 'none' }}>
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
        <Link to="/accompaniment" style={{ textDecoration: 'none' }}>
          <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" rounded="full">
            <Icon as={FaUserFriends} />
            <Text ml={2}>Accompagnement</Text>
          </Button>
        </Link>
        <Divider />
        <Spacer /> {/* Ce Spacer va pousser tout ce qui se trouve en dessous vers le bas du conteneur. */}
        <Link to="/sponsorship" style={{ textDecoration: 'none' }}>
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
