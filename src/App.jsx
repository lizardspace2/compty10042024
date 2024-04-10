// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pilotage from './components/Pilotage';
import Transactions from './components/Transactions';
import Todo from './components/Todo';
import Documents from './components/Documents';
import Accompaniment from './components/Accompaniment';
import Sponsorship from './components/Sponsorship';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pilotage" element={<Pilotage />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/accompaniment" element={<Accompaniment />} />
              <Route path="/sponsorship" element={<Sponsorship />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
