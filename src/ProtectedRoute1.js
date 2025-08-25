import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./auth";

const ProtectiveRoute = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = auth.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    checkAuth();
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a loading spinner component
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content if authenticated
  return children;
};

export default ProtectiveRoute;