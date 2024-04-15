import React from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const RegimeFiscal = () => {
  const [value, setValue] = React.useState('control');

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="control">Régime de la déclaration contrôlée (2035)</Radio>
        <Radio value="microBNC">Régime micro-BNC</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default RegimeFiscal;
