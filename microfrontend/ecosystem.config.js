module.exports = {
  apps: [
    {
      name: 'unisala-astro',
      script: './unisala-astro/dist/start-astro-server.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
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

