import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Auth from "./auth";

const ProtectiveRoute = ({ children }) => {
  const location = useLocation();

  if (!Auth.isAuthenticated()) {
    return <Navigate to="/admindashboard" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectiveRoute;