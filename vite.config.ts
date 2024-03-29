import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'datasource': path.resolve(__dirname, './src/datasource'),
      'components': path.resolve(__dirname, './src/components'),
      'utils': path.resolve(__dirname, './src/utils'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'features': path.resolve(__dirname, './src/features'),

    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  esbuild: {
    // loader: "jsx",
    // include: /src\/.*\.jsx?$/,
    loader: "tsx",
    include: /src\/.*\.[tj]sx?$/,
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
