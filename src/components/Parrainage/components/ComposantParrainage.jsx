import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  useClipboard,
  useToast,
} from '@chakra-ui/react';

const ComposantParrainage = () => {
  const [emails, setEmails] = useState('');
  const referralLink = 'https://www.indy.fr?promocode=REF_B3...';
  const { hasCopied, onCopy } = useClipboard(referralLink);
  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    toast({
      title: 'Lien copié!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleParrainage = () => {
    // Handle the referral logic here
    console.log('Parrainer avec les emails:', emails);
    setEmails('');
  };

  return (
    <VStack
      spacing={4}
      p={5}
      boxShadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      align="stretch"
    >
      <Text fontWeight="semibold">Parrainage</Text>
      <Box>
        <Text fontSize="sm">Partagez cette URL partout où vous parlez d’Indy</Text>
        <HStack my={2}>
          <Input value={referralLink} isReadOnly />
          <Button onClick={handleCopy} colorScheme="pink">
            {hasCopied ? 'Copié' : 'Copier'}
          </Button>
        </HStack>
      </Box>
      <Box>
        <Text fontSize="sm">Parrainez vos proches indépendants</Text>
        <HStack my={2}>
          <Input
            placeholder="emma@email.fr, lucas@email.fr"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
          <Button colorScheme="pink" onClick={handleParrainage}>
            Parrainer
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default ComposantParrainage;
