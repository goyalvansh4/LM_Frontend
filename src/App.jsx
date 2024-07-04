import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/style.css';
import Login from './Authentication/Login';
import Dashboard from './pages/Dashboard';

function App() {

  return (
      <Routes>
        <Route  path="/*" element={<Login />} />
        <Route exact path="/admin/*" element={<Dashboard />} />
      </Routes>
  );

  
}

export default App;
