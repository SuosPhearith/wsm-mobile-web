import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist', // Output directory
    assetsInlineLimit: 100000000, // Ensure all assets are inlined
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // simple build
// export default defineConfig({
//   plugins: [react(),],
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
// })
