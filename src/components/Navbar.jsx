import React from 'react';
import { Box, VStack, Text, Divider, Icon, Button } from '@chakra-ui/react';
import { FaHome, FaRegListAlt, FaRegCreditCard, FaRegFileAlt, FaUserFriends, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link component from React Router

function Navbar() {
  return (
    <Box bg="pink.100" w="100%" p={4} color="black" h="100%" display="flex" flexDirection="column">
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="bold">indy</Text>
        </Box>
        <Divider />
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
      </VStack>
      {/* Separated Parrainage button */}
      <Link to="/sponsorship" style={{ textDecoration: 'none' }}>
        <Button as="button" display="flex" justifyContent="flex-start" variant="ghost" mt="auto" rounded="full">
          <Icon as={FaPaperPlane} />
          <Text ml={2}>Parrainage</Text>
        </Button>
      </Link>
    </Box>
  );
}

export default Navbar;
