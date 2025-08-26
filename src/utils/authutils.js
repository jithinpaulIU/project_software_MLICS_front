import { logout } from "./logoutUtils";

export const handleAuthError = (error, navigate) => {
  if (error.response?.status === 401) {
    logout(navigate);
    return true; // Indicates that logout was triggered
  }
  return false; // No logout triggered
};

export const createAuthInterceptor = (navigate) => {
  return (error) => {
    if (error.response?.status === 401) {
      logout(navigate);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  };
};
