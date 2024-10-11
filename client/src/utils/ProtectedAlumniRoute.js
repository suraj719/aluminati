import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAlumniRoute({ children }) {
  const token = document.cookie.includes("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
