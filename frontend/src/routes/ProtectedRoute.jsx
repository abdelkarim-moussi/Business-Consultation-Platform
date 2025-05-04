import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, rules }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (rules && !rules.includes(user.accountType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
