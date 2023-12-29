import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteRsw } from 'vite-plugin-rsw'; // ✅ 新增
// import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    ViteRsw(),
    // new MonacoWebpackPlugin({
    //   // available options are documented at https://github.com/microsoft/monaco-editor/blob/main/webpack-plugin/README.md#options
    //   languages: ['json']
    // })
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
