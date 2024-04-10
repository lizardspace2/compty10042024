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
        <Button leftIcon={<Icon as={FaUserCircle} />} justifyContent="flex-start" variant="ghost" rounded="full">
          Bonjour Guillaume
        </Button>
        <Button leftIcon={<Icon as={FaHome} />} justifyContent="flex-start" variant="ghost" rounded="full">
          Pilotage
        </Button>
        <Button leftIcon={<Icon as={FaRegCreditCard} />} justifyContent="flex-start" variant="ghost" rounded="full">
          Transactions
        </Button>
        <Button leftIcon={<Icon as={FaRegListAlt} />} justifyContent="flex-start" variant="ghost" position="relative" rounded="full">
          À faire
          <Text as="span" position="absolute" top="-1" right="-1" p="1" fontSize="xs" fontWeight="bold" color="white" bg="red.500" borderRadius="full">
            1
          </Text>
        </Button>
        <Button leftIcon={<Icon as={FaRegFileAlt} />} justifyContent="flex-start" variant="ghost" rounded="full">
          Documents
        </Button>
        <Button leftIcon={<Icon as={FaUserFriends} />} justifyContent="flex-start" variant="ghost" rounded="full">
          Accompagnement
        </Button>
        <Divider />
      </VStack>
      {/* Separated Parrainage button */}
      <Button leftIcon={<Icon as={FaPaperPlane} />} justifyContent="flex-start" variant="ghost" mt="auto" rounded="full">
        Parrainage
      </Button>
    </Box>
  );
}

export default Navbar;
