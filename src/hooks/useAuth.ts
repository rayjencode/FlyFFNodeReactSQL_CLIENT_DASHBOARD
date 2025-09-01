// src/hooks/useAuth.js
import { useQuery, useQueryClient } from '@tanstack/react-query';
// import useAuthStore, { AuthUser } from '../store/authStore';
// import axios from 'axios';
import { useEffect } from 'react';
import apiClient from '@/api/_axios';
import useAuthStore, { type AuthUser } from '@/store/authStore';

interface AuthStore {
   token: string | null;
   user: AuthUser | null;
   isAuthenticated: boolean;
   setAuth: (token: string, user: AuthUser) => void;
   clearAuth: () => void;
}

const verifyToken = async (token: string): Promise<AuthUser> => {
   if (!token) throw new Error('No token');
   const { data } = await apiClient.get<AuthUser>('/auth-admin/is-auth', {
      headers: { Authorization: `Bearer ${token}` },
   });

   return data;
};

export const useAuth = () => {
   const { token, setAuth, clearAuth } = useAuthStore() as AuthStore;
   const queryClient = useQueryClient();
   const {
      isLoading,
      error,
      data: userData,
   } = useQuery<AuthUser, Error>({
      queryKey: ['auth', token],
      queryFn: () =>
         token ? verifyToken(token) : Promise.reject(new Error('No token')),
      enabled: !!token,
      retry: false,
   });

   useEffect(() => {
      if (token && userData) {
         setAuth(token, userData);
      }
   }, [token, userData, setAuth]);

   useEffect(() => {
      if (error) {
         clearAuth();
         queryClient.invalidateQueries({ queryKey: ['auth'] });
      }
   }, [error, clearAuth, queryClient]);

   const clearAuthWithCache = () => {
      clearAuth();
      queryClient.invalidateQueries({ queryKey: ['auth'] });
   };

   return { isLoading, error, clearAuthWithCache };
};
