import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import RegimeFiscal from './components/RegimeFiscal';
import InfoOffreRegimeFiscal from './components/InfoOffreRegimeFiscal';
export function Declarations() {
    return (
      <Box>
        <RegimeFiscal/>
        <InfoOffreRegimeFiscal/>
      </Box>
    );
  }