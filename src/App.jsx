import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import Login from './Authentication/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './router/PrivateRoute';

function App() {
  return (
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        {/* Private Route - Protected */}
        <Route path="/admin/*" element={<PrivateRoute />}>
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
  );
}

export default App;
