module.exports = {
  apps: [
    {
      name: 'unisala-astro',
      script: './astro-server.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'unisala-llm',  // Name of the LLM server process
      script: './unisala-svelte/build/start-llm-server.mjs',  // Path to the LLM server script
      env: {
        NODE_ENV: 'production',
        PORT: 4173  // Port for the LLM server
      }
    }
  ]
};
/*


module.exports = {
  apps: [
    {
      name: 'unisala-astro',
      script: './astro-server.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
*/

