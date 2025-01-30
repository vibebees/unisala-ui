module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [
        2,
        "always",
        ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore"]
      ],
      "scope-empty": [2, "never"], // Ensures that scope is not empty (fix() required)
      "scope-case": [2, "always", "lower-case"], // Enforces lowercase scopes
      "subject-empty": [2, "never"], // Ensures commit messages have subjects
      "header-max-length": [2, "always", 72] // Limits commit message length
    }
  };
  