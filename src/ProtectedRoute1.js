import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./auth";

const ProtectiveRoute1 = ({ children }) => {
  const location = useLocation();

  if (!auth.isAuthenticated()) {
    return <Navigate to="/drdashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectiveRoute1;
