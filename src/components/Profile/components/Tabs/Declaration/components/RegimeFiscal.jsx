import React from 'react';
import { Radio, RadioGroup, Stack, Box } from '@chakra-ui/react';

const RegimeFiscal = () => {
  const [value, setValue] = React.useState('control');

  return (
    <Box border="1px" borderRadius="md" p={4} display="flex">
      <RadioGroup onChange={setValue} value={value} width="100%">
        <Stack direction="row" spacing={4} width="100%">
          <Radio value="control" width="50%">Régime de la déclaration contrôlée (2035)</Radio>
          <Radio value="microBNC" width="50%">Régime micro-BNC</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default RegimeFiscal;
