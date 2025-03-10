import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Store: path.resolve(__dirname, "./src/store"),
    },
  },
  base: "/patient-admin-panel/",
});
