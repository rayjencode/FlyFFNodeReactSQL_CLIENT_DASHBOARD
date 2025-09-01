// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUser {
   name: string;
   email: string;
}

interface AuthState {
   token: string | null;
   user: AuthUser | null;
   isAuthenticated: boolean;
   setAuth: (token: string, user: AuthUser) => void;
   clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         token: null,
         user: null,
         isAuthenticated: false,
         setAuth: (token, user) => {
            // console.log(`---> user`, user);
            // console.log(`---> user`, typeof user);
            // console.log(`---> name`, typeof user.name);
            // console.log(`---> email`, typeof user.email);
            if (
               user &&
               typeof user === 'object' &&
               typeof user.email === 'string' &&
               typeof user.name === 'string'
            ) {
               set({ token, user, isAuthenticated: true });
               // console.log('------valid user object:');
            } else {
               console.log('Rejected invalid user object:');
               // console.warn('Rejected invalid user object:', user);
            }
         },
         clearAuth: () =>
            set({ token: null, user: null, isAuthenticated: false }),
      }),
      {
         name: 'x-user',
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default useAuthStore;
