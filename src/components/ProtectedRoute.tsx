import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, userType } = useAuth();
  const location = useLocation();

  //TODO: check if exists user data and token in localstorage
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('auth-token');

  //TODO: make reqiest to validate token

  if ((!user || !token ) && !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const url = new URL(window.location.href);
  const path = url.pathname
  console.log("🚀 ~ path:", path)

  return element;
};

export default ProtectedRoute;
