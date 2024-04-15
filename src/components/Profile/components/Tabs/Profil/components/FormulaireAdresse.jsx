import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
  Button,
  useColorModeValue
} from '@chakra-ui/react';

export function FormulaireAdresse() {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");

  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="adresse">
        <FormLabel>Adresse</FormLabel>
        <HStack spacing={3}>
          <Input placeholder="N°" defaultValue="51" />
          <Input placeholder="Type de voie" defaultValue="Rue" />
          <Input placeholder="Nom de la voie / Lieu dit" defaultValue="De la republique" />
        </HStack>
      </FormControl>
      <HStack spacing={3}>
        <FormControl id="code-postal" flex="1">
          <FormLabel>Code postal</FormLabel>
          <Input placeholder="Code postal" defaultValue="69600" />
        </FormControl>
        <FormControl id="ville" flex="2">
          <FormLabel>Ville</FormLabel>
          <Input placeholder="Ville" defaultValue="Oullins" />
        </FormControl>
      </HStack>
      <Button
        mt={4}
        bg={buttonBg}
        color={buttonColor}
        _hover={{
          bg: useColorModeValue("blue.600", "blue.300"),
        }}>
        Enregistrer
      </Button>
    </VStack>
  );
}
