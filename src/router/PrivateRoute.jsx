import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = Cookies.get("auth_token");

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
