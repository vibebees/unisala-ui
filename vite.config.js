import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'servers': path.resolve(__dirname, './src/servers'),
      'components': path.resolve(__dirname, './src/components'),
      'utils': path.resolve(__dirname, './src/utils'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'Icons': path.resolve(__dirname, './src/Icons'),
      '@graphql': path.resolve(__dirname, './src/graphql'), // Renamed alias

    }
  },
  esbuild: {
    include: /src\/.*\.(jsx|js)$/, // Make sure this regex pattern matches both .js and .jsx files
    exclude: [],
  },
  
  plugins: [
    react({
      include: ['**/*.jsx', '**/*.js']
    }),
    legacy()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
