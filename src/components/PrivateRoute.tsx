// import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import useAuthStore from '@/store/authStore';
import { Navigate, Outlet } from 'react-router-dom';
// import useAuthStore from '../store/authStore';
// import { useAuth } from '../hooks/useAuth';

interface AuthStore {
   isAuthenticated: boolean;
}

const PrivateRoute = () => {
   const { isAuthenticated } = useAuthStore() as AuthStore;
   const { isLoading } = useAuth();

   if (isLoading) {
      return null; // Avoid rendering during auth check
   }

   return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
