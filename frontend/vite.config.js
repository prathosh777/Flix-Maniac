import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {ENV_variables} from "../backend/config/envVariables.js"
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: ENV_variables.NODE_ENV === 'production' 
        ? 'https://flix-maniac.vercel.app/'
        : 'http://localhost:5000',
      },
    },
  },
});

