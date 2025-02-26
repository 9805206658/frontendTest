import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://backendtest-1-kora.onrender.com',
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
