import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App"
      },
      shared: ["react", "react-dom", "react-router-dom"]
    })
  ],
    build: {
      target: 'esnext',
      modulePreload: false,
      minify: false,
      cssCodeSplit: false
    },
    
})
