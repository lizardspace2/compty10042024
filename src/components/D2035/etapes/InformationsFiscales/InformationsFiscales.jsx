import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Select,
  Text,
  VStack
} from '@chakra-ui/react';

const InformationsFiscales = () => {
  // You would manage state and onChange handlers here for a dynamic form

  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Informations relatives à l'exercice fiscal
      </Text>
      <Text mb={4}>
        Parfait, vous avez bien saisi les informations requises par les organismes de gestion.
      </Text>
      <VStack spacing={4}>
        <FormControl id="date-debut-exercice">
          <FormLabel>Date de début de l'exercice 2023</FormLabel>
          <Input placeholder="Date de début" type="date" defaultValue="2023-01-01" />
        </FormControl>
        <FormControl id="situation-tva">
          <FormLabel>Situation au regard de la TVA</FormLabel>
          <Select placeholder="Sélectionnez la situation">
            <option value="exonere-tva">exonéré de TVA</option>
            {/* Other options */}
          </Select>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Avez-vous perçu des revenus professionnels d'une activité libérale exercée à l'étranger ?</FormLabel>
          <RadioGroup defaultValue="non">
            <Stack spacing={5} direction="row">
              <Radio value="oui">Oui</Radio>
              <Radio value="non">Non</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Avez-vous une activité salariée à côté de votre activité libérale ?</FormLabel>
          <RadioGroup defaultValue="non">
            <Stack spacing={5} direction="row">
              <Radio value="oui">Oui</Radio>
              <Radio value="non">Non</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default InformationsFiscales;
