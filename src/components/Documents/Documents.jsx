import React from 'react';
import DeclarationDocument from './components/DeclarationDocument';
import Justificatifs from './components/Justificatifs';
import DossierDocument from './components/DossierDocument';
import DocumentBanner from './components/DocumentBanner';
import { Box } from '@chakra-ui/react';

function Documents() {
  return (
    <Box bg="gray.50" minH="100vh">
      <DocumentBanner />
      <Box maxWidth="1000px" textAlign="center" mx="auto" p={6}>
        <DeclarationDocument />
        <Justificatifs />
        <DossierDocument />
      </Box>
    </Box>
  );
}

export default Documents;
