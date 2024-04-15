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

const InformationsSupplementaires = () => {
  // Add state and handleChange functions if this form should be interactive
  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <VStack spacing={4}>
        <FormControl id="situation-conjoint">
          <FormLabel>Situation du conjoint dans l'entreprise</FormLabel>
          <Select placeholder="Sélectionnez la situation">
            <option value="not-working">ne travaille pas dans l'entreprise</option>
            {/* Other options */}
          </Select>
        </FormControl>
        <FormControl id="association-gestion-agree">
          <FormLabel>Association de Gestion Agréée</FormLabel>
          <Select placeholder="Sélectionnez l'association">
            <option value="aga-psl">AGA-PSL</option>
            {/* Other options */}
          </Select>
        </FormControl>
        <FormControl id="annee-adhesion">
          <FormLabel>Année d'adhésion</FormLabel>
          <Input type="number" defaultValue="2022" />
        </FormControl>
        <FormControl id="local-professionnel">
          <FormLabel>Local professionnel</FormLabel>
          <Select placeholder="Sélectionnez l'usage">
            <option value="free">usage gratuit</option>
            {/* Other options */}
          </Select>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Avez-vous un cabinet secondaire ?</FormLabel>
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

export default InformationsSupplementaires;
