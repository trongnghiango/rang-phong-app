import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  pulicDir: './assets',
  build: {
    // Template for index.html
    index: resolve(__dirname, './dist/index.html'),

    // Paths
    assetsRoot: resolve(__dirname, './dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',  // Modify the code here
  }
})
