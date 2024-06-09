# Commit Message Guidelines

Welcome to Unisala. To maintain a clean and organized commit history, we use Commitlint to enforce consistent commit message formatting. Please adhere to the following guidelines when making commits to this repository:

## Commit Message Format

Each commit message should follow this format:

`<type>[optional scope]: <description>`

- `<type>`: Describes the type of change being made. Choose from the following types:
  - **feat**: A new feature
  - **fix**: A bug fix
  - **docs**: Documentation changes
  - **style**: Changes that do not affect the meaning of the code (e.g., formatting, white-space, etc.)
  - **refactor**: Code changes that neither fix a bug nor add a feature
  - **test**: Adding missing tests or correcting existing tests
  - **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
- `<scope>` (optional): Describes the scope of the change (e.g., module name, component name).
- `<description>`: A concise description of the change.

## Examples

### Fixing a Bug

```
  git commit -m "fix(renaming semantic config): renaming release.config"
```

### Refactoring Code

```
refactor(auth): Refactor login form component
```

### Updating Documentation

```
docs(readme): Update installation instructions
```

### Adding a New Feature

```
 git commit -m "feat(adding semantic release): add Semantic Release for versioningfix"
```

## Additional Notes

- Include a detailed commit message body if necessary to provide additional context.
- Use imperative mood in the subject line (e.g., "Fix" instead of "Fixed" or "Fixes").
- Separate the subject from the body with a blank line.
- Use bullet points for lists in the body of the commit message if applicable.

Thank you for following these guidelines! Consistent commit messages help us maintain a high-quality codebase and make collaboration smoother for everyone.

### References

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Commitlint](https://commitlint.js.org/#/)
- [Husky](https://typicode.github.io/husky/#/)
