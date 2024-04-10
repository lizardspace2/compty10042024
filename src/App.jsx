import React from 'react';
import { ChakraProvider, Box, Flex, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'; // Make sure to import the Navbar component from its file

function Dashboard() {
  return <Text>Dashboard Content</Text>;
}

function Transactions() {
  return <Text>Transactions Content</Text>;
}

function Tasks() {
  return <Text>Tasks Content</Text>;
}

function Documents() {
  return <Text>Documents Content</Text>;
}

function Accompagnement() {
  return <Text>Accompagnement Content</Text>;
}

function Parrainage() {
  return <Text>Parrainage Content</Text>;
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex h="100vh">
          {/* Navbar on the left */}
          <Box minW="200px">
            <Navbar />
          </Box>
          
          {/* Main content on the right */}
          <Box flex="1" p={5}>
            {/* Content of your application */}
            <Switch>
              <Route path="/profile"> {/* Route for profile page */}
                <Text>Profile Content</Text>
              </Route>
              <Route path="/dashboard"> {/* Route for dashboard page */}
                <Dashboard />
              </Route>
              <Route path="/transactions"> {/* Route for transactions page */}
                <Transactions />
              </Route>
              <Route path="/tasks"> {/* Route for tasks page */}
                <Tasks />
              </Route>
              <Route path="/documents"> {/* Route for documents page */}
                <Documents />
              </Route>
              <Route path="/accompaniment"> {/* Route for accompaniment page */}
                <Accompagnement />
              </Route>
              <Route path="/sponsorship"> {/* Route for sponsorship page */}
                <Parrainage />
              </Route>
              <Route path="/"> {/* Default route */}
                <Text>Bienvenue dans l'application!</Text>
              </Route>
            </Switch>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
