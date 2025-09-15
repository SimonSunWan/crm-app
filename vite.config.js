import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";

export default defineConfig(({ mode }) => ({
  plugins: [uni()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@/": resolve(__dirname, "./"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
}));
