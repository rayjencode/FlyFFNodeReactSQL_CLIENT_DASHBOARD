import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react({
         jsxImportSource: 'react', // Ensures JSX transforms are properly configured
         babel: {
            plugins: [
               [
                  'styled-components',
                  {
                     displayName: true,
                  },
               ],
            ],
         },
      }),
   ],
   css: {
      modules: {
         localsConvention: 'camelCase',
         generateScopedName: '[local]__[hash:base64:5]',
      },
   },
   build: {
      sourcemap: true, // This ensures source maps are generated for better debugging
      assetsDir: 'assets', // Specify the directory for assets
      copyPublicDir: true, // Ensure public directory is copied to the build output
   },
   server: {
      port: 3000,
   },
   resolve: {
      alias: {
         '@': '/src',
      },
   },
});
