import React from 'react';
import { Box } from '@chakra-ui/react';
import { FormulaireAdresse } from './components/FormulaireAdresse';
import { InformationsComptablesForm } from './components/InformationsComptablesForm';
import { InformationsPersonnelles } from './components/InformationsPersonnelles';

export function Profil() {
    return (
        <Box p={4} borderWidth="1px" borderRadius="lg">
            <InformationsPersonnelles />
            <FormulaireAdresse />
            <InformationsComptablesForm />
        </Box>
    );
}
