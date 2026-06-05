import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// Plain Vite + React SPA targeting Cloudflare Pages (static).
// Sandbox-friendly host/port settings preserved so the Lovable preview keeps working.
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  build: {
    target: "ES2022",
    minify: "esbuild",
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@tanstack/react-router"],
  }
});
