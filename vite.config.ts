
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [reactRouter()],
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',
  // GSAP's Node entry is a UMD build whose default export breaks under ESM;
  // bundling it makes the build-time pre-render use the ES module version.
  ssr: {
    noExternal: ['gsap'],
  },
  build: {
    // Optimize build output
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    // Vendor chunks apply to the browser bundle only; the build-time
    // pre-render bundle runs in Node and doesn't benefit from splitting.
    rollupOptions: isSsrBuild ? undefined : {
      output: {
        manualChunks: {
          // Separate vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three'],
          'ui-vendor': ['@radix-ui/react-dialog'],
          'gsap-vendor': ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'three',
    ],
  },
}));
