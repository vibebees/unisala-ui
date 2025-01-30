module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat',    // new feature
      'fix',     // bug fix
      'docs',    // documentation
      'style',   // formatting, etc; no code change
      'refactor',// refactoring code
      'test',    // adding tests, refactoring tests
      'chore',   // updating build tasks, package manager configs, etc
      'perf'     // performance improvements
    ]],
    'type-case': [2, 'always', 'lower'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72]
  }
};