import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,
    proxy: {
    
    
      "/api": {
        target: "https://api-7fandbxhsq-uc.a.run.app", 
        // target: "http://localhost:5001", 
        changeOrigin: true,
       
      },
    },
  },
});