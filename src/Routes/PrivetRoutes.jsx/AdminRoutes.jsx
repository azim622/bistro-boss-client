import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // Ensure Navigate is imported
import useAuth from '../../hooks/useAuth';
import UseAdmin from '../../hooks/UseAdmin';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth(); // Check user authentication
  const [isAdmin, isAdminLoading] = UseAdmin(); // Check admin role
  const location = useLocation(); // Current location for redirecting

  // Show loading spinner if data is being fetched
  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  // If user is authenticated and isAdmin, render children
  if (user && isAdmin) {
    return children;
  }

  // If not admin, redirect to home with state
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoutes;
