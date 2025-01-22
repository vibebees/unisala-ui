import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icons from 'astro-icon';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { visualizer } from 'rollup-plugin-visualizer';
import node from '@astrojs/node';

export default defineConfig({
  server: {
    port: 3000
  },
  renderers: [react()],
  integrations: [
    react(),
    icons({
      collections: {
        lucide: '@iconify-json/lucide'
      }
    }),
    tailwind({ applyBaseStyles: false }),
    sitemap()
  ],
  output: "server",
  adapter: node({
    mode: 'standalone' // 'standalone' is recommended for production
  }),
  site: "https://unisala.com",
  vite: {
    plugins: [visualizer({
      open: true,
      filename: 'stats.html'
    })]
  }
});