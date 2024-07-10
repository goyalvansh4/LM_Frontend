import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = () => {
  const token = Cookies.get("auth_token");
  const role = Cookies.get("role");
  
  return (token && role === 'user') ? <Outlet /> : <Navigate to="/" />;
};

export default UserPrivateRoute;
