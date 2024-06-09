module.exports = {
    branches: ['test'],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/git',
      [
        '@semantic-release/exec',
        {
          prepareCmd: 'ionic build --prod',
        },
      ],
    ],
  };
