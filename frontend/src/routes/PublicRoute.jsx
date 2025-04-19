import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return children;
  }

  let accountType = null;

  try {
    const decoded = jwtDecode(token);
    accountType = decoded?.accountType;
  } catch (error) {
    console.error("Invalid token:", error);
 
    sessionStorage.removeItem("token");
    return children;
  }

  if (accountType === "consultant") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;
