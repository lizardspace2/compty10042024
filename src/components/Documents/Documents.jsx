import React, { useState } from 'react';
import DeclarationDocument from './components/DeclarationDocument';
import Justificatifs from './components/Justificatifs';
import DossierDocument from './components/DossierDocument';
import DocumentBanner, { ExerciceFiscalDocumentsContext } from './components/DocumentBanner';
import { Box } from '@chakra-ui/react';

function Documents() {
  const [selectedExercice, setSelectedExercice] = useState(null);

  return (
    <ExerciceFiscalDocumentsContext.Provider value={{ selectedExercice, setSelectedExercice }}>
      <Box bg="gray.50" minH="100vh">
        <DocumentBanner />
        <Box maxWidth="1000px" textAlign="center" mx="auto" p={6}>
          <DeclarationDocument />
          <Justificatifs />
          <DossierDocument />
        </Box>
      </Box>
    </ExerciceFiscalDocumentsContext.Provider>
  );
}

export default Documents;
