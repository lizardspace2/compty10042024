import React from 'react';
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export function ResumeAbonnementPremium() {
  const bg = useColorModeValue("red.50", "gray.700");
  const borderColor = useColorModeValue("red.400", "red.300");

  return (
    <VStack
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      bg={bg}
      borderColor={borderColor}
      alignItems="start"
      spacing={4}
      shadow="md"
    >
      <Text fontSize="xl" fontWeight="bold">
        Compty Premium
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        12€ <Text as="span" fontSize="md">/mois HT</Text>
      </Text>
      <Text color="gray.500">Soit 14,40 € TTC</Text>
      <Button colorScheme="pink" size="sm">
        Changer de régime d'imposition
      </Button>
      <Text mt={4} mb={2} fontSize="lg" fontWeight="semibold">
        Toutes les fonctionnalités d'Compty + :
      </Text>
      <List spacing={2}>
        {['Déclaration de CA à l\'Urssaf', 'Déclaration de TVA', 'Aide à la déclaration du revenu', 'Volet fiscal 2042 C-Pro', 'Volet social SSI / PAMC', 'Pilotage', 'Support client par live-chat et email'].map((feature) => (
          <ListItem key={feature}>
            <ListIcon as={CheckIcon} color="green.500" />
            {feature}
          </ListItem>
        ))}
      </List>
    </VStack>
  );
}
