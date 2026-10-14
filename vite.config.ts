import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Images are the heaviest asset on this site; keep separate hashed files
    // so browsers can cache them independently of the JS/CSS bundles.
    assetsInlineLimit: 2048,
  },
});
