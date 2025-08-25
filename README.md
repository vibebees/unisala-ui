# Unisala UI

The open-source UI components and utilities powering [Unisala.com](https://unisala.com). Built with React, TypeScript, and Tailwind CSS. Poweredby Astro.

## Overview

Unisala UI is a collection of reusable components, hooks, and utilities designed for building modern web applications. It includes everything from basic UI elements to complex features like engagement tracking and user metrics.

## Features

- 🎨 Complete design system with customizable components
- 📊 User engagement tracking and streak metrics
- 🌙 Dark mode support
- 📱 Responsive layouts
- ♿️ Accessible components
- 🧪 Comprehensive test coverage
- 📦 Tree-shakeable exports

## Getting Started

```bash
# Clone the repository
git clone https://github.com/unisala/ui.git

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test
```

## Project Structure

```
ui/
├── components/         # React components
├── hooks/             # Custom React hooks
├── utils/
│   ├── metrics/       # Analytics and metrics utilities
│   └── styles/        # Theme and style utilities
├── tests/             # Test suites
└── stories/           # Storybook documentation
```






## Contributing

We welcome contributions!
Working on our[Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add or update tests as needed
5. Update documentation
6. Submit a pull request

### Code Style

- We use ESLint and Prettier for code formatting
- Components should be functional and use hooks
- Tests are required for all new features
- Follow the existing file structure

## Local Development

```bash
# Start development server
pnpm dev

# Run test suite
pnpm test

# Build for production
pnpm build

# Run Storybook
pnpm storybook
```

## Testing

We use Vitest for testing. Run the test suite:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to all the contributors who have helped make Unisala UI possible!
