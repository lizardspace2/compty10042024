import React from 'react';
import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

export function InformationsPersonnelles() {
  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="first-name">
        <FormLabel>Prénom</FormLabel>
        <Input placeholder="Guillaume" />
      </FormControl>
      <FormControl id="last-name">
        <FormLabel>Nom</FormLabel>
        <Input placeholder="Recipon" />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input placeholder="guillaume.recipon@live.fr" />
      </FormControl>
      <FormControl id="telephone">
        <FormLabel>Téléphone</FormLabel>
        <Input placeholder="" />
      </FormControl>
    </VStack>
  );
}
