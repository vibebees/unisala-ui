import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icons from 'astro-icon';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { visualizer } from 'rollup-plugin-visualizer';
import node from '@astrojs/node'; // Import the node adapter

export default defineConfig({
  server: {
    port: 3001
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
    sitemap(),
    node({  mode: 'ssr'})
  ],
  output: "hybrid",
  site: "https://unisala.com",
  vite: {
    plugins: [visualizer({
      open: true, // This will automatically open the stats page in your default browser
      filename: 'stats.html' // Outputs an HTML file in the root of your project
    })]
  }
});
