import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Text,
  useRadioGroup,
} from '@chakra-ui/react';

export const BillingForm = () => {
  const [value, setValue] = useState('Non');

  // This function would handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the value state when form is submitted
    console.log(value);
    // Add your logic to handle submission like sending data to an API
  };

  // For custom radio button styles, you could create a custom RadioCard component
  // If you want to use Chakra's default Radio component, it can be simpler.

  const options = ['Oui', 'Non'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'facturation',
    defaultValue: value,
    onChange: setValue,
  });

  const group = getRootProps();

  return (
    <Box p={5} boxShadow="md" borderWidth="1px" borderRadius="md">
      <Text fontSize="xl" mb={4}>
        Facturation
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl as="fieldset">
          <FormLabel as="legend">Souhaitez-vous gérer votre facturation avec Compty ?</FormLabel>
          <RadioGroup defaultValue={value} onChange={setValue}>
            <HStack {...group}>
              {options.map((option) => {
                const radio = getRadioProps({ value: option });
                return (
                  <Radio {...radio} key={option}>
                    {option}
                  </Radio>
                );
              })}
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button mt={4} colorScheme="pink" type="submit">
          Enregistrer
        </Button>
      </form>
    </Box>
  );
};
