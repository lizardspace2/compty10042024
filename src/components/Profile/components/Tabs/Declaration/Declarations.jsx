import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import RegimeFiscal from './components/RegimeFiscal';
import InfoOffreRegimeFiscal from './components/InfoOffreRegimeFiscal';

export function Declarations() {
  return (
    <Box maxWidth="1000px" margin="auto" padding="20px">
      <RegimeFiscal />
      <Box mt={8}> {/* Ajoute de l'espace entre les éléments */}
        <InfoOffreRegimeFiscal />
      </Box>
    </Box>
  );
}
