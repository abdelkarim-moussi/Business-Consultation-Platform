import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles, ...rest }) => {
  const { user } = useAuth();
 
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.accountType)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
