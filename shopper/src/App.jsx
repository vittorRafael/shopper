//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Produtos from './components/Produtos';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
