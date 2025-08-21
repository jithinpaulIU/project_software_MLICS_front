import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Auth from "./auth";

const ProtectiveRoute = ({ children }) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // If Auth.isAuthenticated() is async, use:
      // const authenticated = await Auth.isAuthenticated();
      const authenticated = Auth.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return <div>Loading...</div>; // Or a nice loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectiveRoute;