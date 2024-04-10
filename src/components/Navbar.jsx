import React from 'react';
import { Box, VStack, Text, Button, Divider, Icon } from '@chakra-ui/react';
import { FaHome, FaRegListAlt, FaRegCreditCard, FaRegFileAlt, FaUserFriends, FaUserCircle, FaPaperPlane } from 'react-icons/fa';

function Navbar() {
  return (
    <Box bg="pink.100" w="100%" p={4} color="black" h="100%" display="flex" flexDirection="column">
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="bold">indy</Text>
        </Box>
        <Divider />
        <Button leftIcon={<Icon as={FaUserCircle} />} justifyContent="flex-start" variant="ghost">
          Bonjour Guillaume
        </Button>
        <Button leftIcon={<Icon as={FaHome} />} justifyContent="flex-start" variant="ghost">
          Pilotage
        </Button>
        <Button leftIcon={<Icon as={FaRegCreditCard} />} justifyContent="flex-start" variant="ghost">
          Transactions
        </Button>
        <Button leftIcon={<Icon as={FaRegListAlt} />} justifyContent="flex-start" variant="ghost" position="relative">
          À faire
          <Text as="span" position="absolute" top="-1" right="-1" p="1" fontSize="xs" fontWeight="bold" color="white" bg="red.500" borderRadius="full">
            1
          </Text>
        </Button>
        <Button leftIcon={<Icon as={FaRegFileAlt} />} justifyContent="flex-start" variant="ghost">
          Documents
        </Button>
        <Button leftIcon={<Icon as={FaUserFriends} />} justifyContent="flex-start" variant="ghost">
          Accompagnement
        </Button>
        <Divider />
        <Button leftIcon={<Icon as={FaPaperPlane} />} justifyContent="flex-start" variant="ghost">
          Parrainage
        </Button>
      </VStack>
    </Box>
  );
}

export default Navbar;
