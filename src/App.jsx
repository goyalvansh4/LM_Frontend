import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import Dashboard from './partials/ADMIN/AdminPages/Dashboard';
import Login from './Authentication/Login';

function App() {
  return (
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        {/* Private Route - Protected */}
        {/* <Route path="/admin/*" element={<PrivateRoute />}> */}
          <Route path="/admin/*" element={<Dashboard />} />
        {/* </Route> */}
      </Routes>
  );
}

export default App;
