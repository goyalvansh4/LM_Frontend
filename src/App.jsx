import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import UserLogin from './Authentication/UserLogin';
import Dashboard from './partials/ADMIN/AdminPages/Dashboard';
import UserDashboard from './partials/USER/UsersPages/UserDashboard';
import PrivateRoute from './router/PrivateRoute';
import UserPrivateRoute from './router/UserPrivateRoute';
import Login from './Authentication/Login';

function App() {
  return (
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/login" element={<Login />} />
        {/* Private Route - Protected */}
        <Route path="/admin/*" element={<PrivateRoute />}>
          <Route path="*" element={<Dashboard />} />
        </Route>
        <Route path="/user/*" element={<UserPrivateRoute />}>
          <Route path="*" element={<UserDashboard />} />
        </Route>
      </Routes>
  );
}

export default App;
