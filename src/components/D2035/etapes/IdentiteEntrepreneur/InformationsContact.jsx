import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text
} from '@chakra-ui/react';

const InformationsContact = () => {
  // Replace with form handling logic as necessary
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <VStack spacing={4}>
        <FormControl id="code-postal">
          <FormLabel>Code Postal</FormLabel>
          <Input placeholder="Code Postal" defaultValue="69600" />
        </FormControl>
        <FormControl id="ville">
          <FormLabel>Ville</FormLabel>
          <Input placeholder="Ville" defaultValue="Oullins" />
        </FormControl>
        <FormControl id="pays">
          <FormLabel>Pays</FormLabel>
          <Input placeholder="Pays" defaultValue="France" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" defaultValue="guillaume.recipon@live.fr" />
        </FormControl>
        <FormControl id="telephone">
          <FormLabel>Téléphone</FormLabel>
          <Input placeholder="Téléphone" defaultValue="0773020538" />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default InformationsContact;
