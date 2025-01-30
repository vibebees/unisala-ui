module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore']
      ],
      'scope-enum': [
        2,
        'always',
        [
          'auth',
          'api',
          'ui',
          'astro',
          'deps',
          'config',
          'release'
        ]
      ],
      'scope-empty': [2, 'never'],
      'subject-case': [0]
    }
  };