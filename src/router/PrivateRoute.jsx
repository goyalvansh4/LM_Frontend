import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = Cookies.get("auth_token");
  const role = Cookies.get("role");
  
  return (token && role === 'admin') ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
