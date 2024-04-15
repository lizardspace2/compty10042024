import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Input,
  Textarea,
  VStack,
  Select
} from '@chakra-ui/react';

const InformationsComplementaires = () => {
  // You would manage state and onChange handlers here for a dynamic form

  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <VStack spacing={5}>
        <FormControl as="fieldset">
          <FormLabel as="legend">Avez-vous des salariés ?</FormLabel>
          <RadioGroup defaultValue="non">
            <Stack spacing={5} direction="row">
              <Radio value="oui">Oui</Radio>
              <Radio value="non">Non</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl as="fieldset">
          <FormLabel as="legend">Êtes-vous en cessation d'activité ?</FormLabel>
          <RadioGroup defaultValue="non">
            <Stack spacing={5} direction="row">
              <Radio value="oui">Oui</Radio>
              <Radio value="non">Non</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl id="procedure-collective">
          <FormLabel>En cas d'ouverture d'une procédure collective</FormLabel>
          <Select placeholder="Sélectionnez l'option">
            <option value="non-concerne">non concerné</option>
            {/* Other options */}
          </Select>
        </FormControl>

        <FormControl id="faits-significatifs">
          <FormLabel>Faits significatifs</FormLabel>
          <Textarea placeholder="Faits significatifs" />
        </FormControl>

        <FormControl id="notes-complementaires">
          <FormLabel>Notes complémentaires</FormLabel>
          <Textarea placeholder="Notes complémentaires" />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default InformationsComplementaires;
