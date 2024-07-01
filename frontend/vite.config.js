import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true // Automatically open the browser on start
  },
  base: '/', // Ensure this is set correctly
});

