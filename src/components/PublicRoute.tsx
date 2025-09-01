import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useAuth } from '@/hooks/useAuth';
// import { useAuth } from '../hooks/useAuth';

interface AuthStore {
   isAuthenticated: boolean;
}

const PublicRoute = () => {
   const { isAuthenticated } = useAuthStore() as AuthStore;
   const { isLoading } = useAuth();

   if (isLoading) {
      return null; // Avoid rendering during auth check
   }

   return !isAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default PublicRoute;
