import React from 'react';
import DeclarationDocument from './components/DeclarationDocument';
import Justificatifs from './components/Justificatifs';
import DossierDocument from './components/DossierDocument';
import DocumentBanner from './components/DocumentBanner';
import { Box } from '@chakra-ui/react';

function Documents() {
  return (
    <div>
      <DocumentBanner />
      <Box maxWidth="1000px" textAlign="center" mx="auto" >
        <DeclarationDocument />
        <Justificatifs />
        <DossierDocument />
      </Box>
    </div>
  );
}

export default Documents;
