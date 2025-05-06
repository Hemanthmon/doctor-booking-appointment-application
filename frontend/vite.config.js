// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Important for Vercel to know where to look
  },
  server: {
    port: 5173, // Optional: only used when running `npm run dev`
  },
});
