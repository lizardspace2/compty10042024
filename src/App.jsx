import React from 'react';
import { ChakraProvider, Box, Flex, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar'; // Assurez-vous d'importer le composant Navbar depuis son fichier

function App() {
  return (
    <ChakraProvider>
      <Flex h="100vh"> {/* Définir la hauteur de l'élément Flex à 100vh */}
        {/* Navbar à gauche */}
        <Box minW="200px">
          <Navbar />
        </Box>
        
        {/* Contenu principal à droite */}
        <Box flex="1" p={5}>
          {/* Contenu de votre application */}
          <Text>Bienvenue dans l'application!</Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
