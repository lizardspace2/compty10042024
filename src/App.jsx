import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pilotage from './components/Pilotage/Pilotage';
import Transactions from './components/Transactions/Transactions';
import Todo from './components/Afaire/Todo';
import Documents from './components/Documents/Documents';
import Accompaniment from './components/Accompagnement/Accompaniment';
import Sponsorship from './components/Sponsorship';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex h="100vh" overflowY="hidden">
          <Box position="fixed" h="full" w="250px" overflowY="auto">
            <Navbar />
          </Box>
          <Box flex="1" pl="270px" pr={5} pt={5} overflowY="auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pilotage" element={<Pilotage />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/accompaniment" element={<Accompaniment />} />
              <Route path="/sponsorship" element={<Sponsorship />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
