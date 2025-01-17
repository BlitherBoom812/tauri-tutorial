import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteRsw } from 'vite-plugin-rsw'; // ✅ 新增

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    ViteRsw()
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  }
}));
