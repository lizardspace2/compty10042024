import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pilotage from './components/Pilotage/Pilotage';
import Transactions from './components/Transactions/Transactions';
import Todo from './components/Afaire/Todo';
import Documents from './components/Documents/Documents';
import Accompaniment from './components/Accompagnement/Accompaniment';
import Sponsorship from './components/Sponsorship';
import D2035 from './components/D2035/D2035'; // Make sure the path is correct

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/d2035" element={<D2035 />} />
          <Route path="*" element={<LayoutWithSidebar />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

const LayoutWithSidebar = () => {
  const location = useLocation(); // Obtenez l'emplacement actuel
  const showSidebar = location.pathname !== '/d2035'; // Ne montrez la barre latérale que pour les routes autres que '/d2035'

  return (
    <Flex h="100vh" overflowY="hidden">
      {showSidebar && (
        <Box position="fixed" h="full" w="250px" overflowY="auto">
          <Navbar />
        </Box>
      )}
      <Box flex="1" pl={showSidebar ? "270px" : "0"} pr={5} pt={5} overflowY="auto">
        <Routes>
          <Route path="/" element={<Pilotage />} />
          <Route path="/pilotage" element={<Pilotage />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/accompaniment" element={<Accompaniment />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          {/* La route /d2035 est déjà définie à l'extérieur de ce layout. */}
        </Routes>
      </Box>
    </Flex>
  );
};

export default App;
