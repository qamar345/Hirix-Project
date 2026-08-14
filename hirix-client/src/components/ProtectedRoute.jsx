import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Gates a route on the client so an unauthenticated visitor (or one with
// the wrong role) is redirected instead of seeing a broken authenticated
// shell whose data silently fails to load underneath. This is
// defense-in-depth for UX only - the API is the real authorization
// boundary, this component does not replace server-side checks.
const ProtectedRoute = ({ allow, redirectTo = "/", children }) => {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const role = sessionStorage.getItem("role");

  const isAuthorized = isLoggedIn && (!allow || allow.includes(role));

  if (!isAuthorized) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
