import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
// Dummy authentication function (replace with your real auth logic)
const isAuthenticated = () => {
    // get me
  return !!localStorage.getItem("token"); // Example: check if a token exists
};

const PrivateRoute = ({ children }: Props) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
