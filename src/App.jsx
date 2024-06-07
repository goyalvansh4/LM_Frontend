import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/style.css';
//import Dashboard from './pages/Dashboard';
import Login from './Authentication/Login';
import Dashboard from './pages/Dashboard';
import Card from './pages/Card';
import SignUp from './Authentication/SignUp';

function App() {

  return (
      <Routes>
        <Route  path="/*" element={<Login />} /> 
        <Route  path="/signup" element={<SignUp />} />
        <Route exact path="/admin/*" element={<Dashboard />} />
      </Routes>
  );

  
}

export default App;