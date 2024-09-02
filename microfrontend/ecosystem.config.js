module.exports = {
  apps: [
    {
      name: 'unisala-ionic',
      script: 'http-server',
      args: '-p 3000 ./unisala-ionic/dist --proxy http://localhost:3000?',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'unisala-astro',
      script: './unisala-astro/dist/start-astro-server.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};

