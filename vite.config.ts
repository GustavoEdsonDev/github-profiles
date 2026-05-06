import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite' // Adicionei este pois vi que você usa Tailwind v4

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // Resolve os imports com '@/' baseados no seu tsconfig
    tailwindcss(),   // Ativa o suporte ao Tailwind v4 no Vite
  ],
})