import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    // Combine all other aliases into a single object
    'servers': path.resolve(__dirname, './src/servers'),
    'component': path.resolve(__dirname, './src/component'),
    'utils': path.resolve(__dirname, './src/utils'),
    'hooks': path.resolve(__dirname, './src/hooks'),
    'Icons': path.resolve(__dirname, './src/Icons'),
    '@graphql': path.resolve(__dirname, './src/graphql'), // Renamed alias
    'store': path.resolve(__dirname, './src/store'),
    'features': path.resolve(__dirname, './src/features'),
    // Use regular expressions to allow named exports
    '^servers(.*)$': path.resolve(__dirname, './src/servers$1'),
    '^component(.*)$': path.resolve(__dirname, './src/component$1'),
    '^utils(.*)$': path.resolve(__dirname, './src/utils$1'),
    '^hooks(.*)$': path.resolve(__dirname, './src/hooks$1'),
    '^Icons(.*)$': path.resolve(__dirname, './src/Icons$1'),
    '^@graphql(.*)$': path.resolve(__dirname, './src/graphql$1'),
    '^store(.*)$': path.resolve(__dirname, './src/store$1'),
    '^features(.*)$': path.resolve(__dirname, './src/features$1'),
    },
    
  },
  esbuild: {
    loader: 'jsx',
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
