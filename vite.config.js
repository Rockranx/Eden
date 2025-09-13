import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,
    proxy: {
      '/alchemy': {
        target: 'https://eth-mainnet.g.alchemy.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/alchemy/, '')
      },
      '/opensea': {
        target: 'https://api.opensea.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/alchemy/, '')
      },
      // string shorthand
      // with options
      "/api": {
        target: "https://us-central1-digital-eden.cloudfunctions.net/app", 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});