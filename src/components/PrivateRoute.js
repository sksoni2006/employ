import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../utils/auth';

function PrivateRoute({ children }) {
  const location = useLocation();

  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;