import React from 'react';
import { FormControl, FormLabel, Input, Button, VStack, Text, Select } from '@chakra-ui/react';

export function InformationsComptablesForm() {
  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="siret">
        <FormLabel>SIRET</FormLabel>
        <Input placeholder="SIRET" defaultValue="82104845100040" />
      </FormControl>
      <FormControl id="business-name">
        <FormLabel>Nom de votre entreprise (dénomination)</FormLabel>
        <Input placeholder="Nom de l'entreprise" defaultValue="Guillaume Recipon EI" />
        <Text fontSize="sm" mt={2}>
          La dénomination utilisée pour votre activité professionnelle doit inclure votre nom, ou nom d'usage, précédé ou suivi immédiatement des mots : "Entrepreneur Individuel" ou des initiales : "EI"
        </Text>
      </FormControl>
      <FormControl id="profession">
        <FormLabel>Profession</FormLabel>
        <Select defaultValue="Médecin spécialiste">
          {/* Replace these with actual options */}
          <option value="Médecin généraliste">Médecin généraliste</option>
          <option value="Médecin spécialiste">Médecin spécialiste</option>
          <option value="Dentiste">Dentiste</option>
        </Select>
      </FormControl>
      <FormControl id="association">
        <FormLabel>Association de Gestion Agréée</FormLabel>
        <Select defaultValue="AGA-PSL">
          {/* Replace these with actual options */}
          <option value="AGA-PSL">AGA-PSL</option>
          <option value="AGA-XYZ">AGA-XYZ</option>
          <option value="AGA-123">AGA-123</option>
        </Select>
      </FormControl>
      <FormControl id="fiscal-obligation">
        <FormLabel>Référence d'obligation fiscale</FormLabel>
        <Select defaultValue="BNC1">
          {/* Replace these with actual options */}
          <option value="BNC1">BNC1</option>
          <option value="BNC2">BNC2</option>
          <option value="BIC1">BIC1</option>
        </Select>
      </FormControl>
      <Button mt={4} colorScheme="blue">
        Enregistrer
      </Button>
    </VStack>
  );
}
