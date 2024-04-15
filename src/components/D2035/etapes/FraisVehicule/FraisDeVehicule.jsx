import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Input,
  Link,
} from '@chakra-ui/react';

const FraisDeVehicule = () => {
  const [value, setValue] = useState('km');

  return (
    <Box maxWidth="container.xl" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Retraiter les frais de véhicule
      </Text>
      <Text mb={4}>
        Souhaitez-vous opter pour le barème kilométrique ou bien rester aux frais réels ? En cas de doute ou si vous n'avez pas de frais de véhicule régulier, nous conseillons d'opter pour le barème kilométrique comme expliqué sur <Link color="blue.500" href="/blog">notre blog</Link>.
      </Text>
      <FormControl as="fieldset" mb={4}>
        <FormLabel as="legend">Comment voulez-vous comptabiliser vos frais de véhicules ?</FormLabel>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="km">Barème kilométrique</Radio>
            <Radio value="noVehicle">Je n'ai pas utilisé de véhicule</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Text mb={4}>
        Parfait, il n'y a aucune transaction non ventilée dans Véhicule et carburant.
      </Text>
      <FormControl mb={4}>
        <FormLabel>Proportion de kilomètres personnels :</FormLabel>
        <Input placeholder="-- %" />
      </FormControl>
      {/* Place other components or buttons here as needed */}
    </Box>
  );
};

export default FraisDeVehicule;
