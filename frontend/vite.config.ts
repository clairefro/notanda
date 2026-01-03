import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }): UserConfig => {
  const rootDir = path.resolve(__dirname, "..");
  const env = loadEnv(mode, rootDir, "");

  console.log("Loading .env from:", rootDir);
  console.log("BE_PORT:", env.BE_PORT);

  return {
    plugins: [
      react({
        jsxRuntime: "automatic",
      }),
    ],
    build: {
      outDir: "dist",
    },
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${env.BE_PORT || 3000}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
