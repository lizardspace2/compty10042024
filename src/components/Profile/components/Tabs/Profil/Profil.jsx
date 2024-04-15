import React from 'react';
import { Box } from '@chakra-ui/react';
import { InformationsComptablesForm } from './components/InformationsComptablesForm';
import { FormulaireComplet } from './components/FormulaireComplet';

export function Profil() {
    return (
        <Box p={4} borderWidth="1px" borderRadius="lg">
            <FormulaireComplet/>
            <InformationsComptablesForm />
        </Box>
    );
}
