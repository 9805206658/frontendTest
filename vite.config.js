import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // This will forward all requests starting with "/api" to your backend
        target: 'https://backendtest-1-kora.onrender.com',
        changeOrigin: true,
        secure: false, // Set to true if the backend uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes "/api" before sending request
      },
    },
  },
});
