import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    cors: true,
    hmr: {
      overlay: true,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
    // Optimize bundling
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: [
            "lucide-react",
            "framer-motion",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  preview: {
    port: 4173,
    host: true,
  },
  // Add custom definitions for SEO
  define: {
    "import.meta.env.VITE_SITE_URL": JSON.stringify("https://llmprompts.xyz"),
    "import.meta.env.VITE_SITE_TITLE": JSON.stringify(
      "LLMPrompts.xyz - Best AI Prompts for ChatGPT, Claude, Gemini & More"
    ),
    "import.meta.env.VITE_SITE_DESCRIPTION": JSON.stringify(
      "Discover high-quality AI prompts for ChatGPT, Claude, Gemini, Perplexity, Grok, and more. Enhance your AI interactions with our curated collection of powerful prompts."
    ),
  },
}));
