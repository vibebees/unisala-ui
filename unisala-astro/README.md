# Unisala Platform

A next-generation content creation and community platform built with enterprise-grade architecture and top-1% software engineering practices.

## Architecture Overview

This application follows **Clean Architecture** principles with **SOLID** design patterns, providing exceptional maintainability, testability, and scalability.

### Core Technologies

- **Frontend**: Astro + React + TypeScript (strict mode)
- **State Management**: Zustand with middleware (persist, immer)
- **Styling**: Tailwind CSS + Radix UI components
- **API Layer**: Apollo GraphQL with unified client abstraction
- **Testing**: Vitest + Playwright + MSW
- **CI/CD**: GitHub Actions with comprehensive quality gates

## Project Structure

```
src/
├── core/                 # Pure domain logic (no framework dependencies)
│   ├── domain/          # Domain entities and value objects
│   ├── errors.ts        # Domain error types
│   └── result.ts        # Functional error handling
│
├── infrastructure/      # External concerns (APIs, persistence)
│   ├── api/            # API client and service layer
│   ├── dto/            # Data transfer objects
│   ├── mappers/        # DTO ↔ Domain transformations
│   └── errors.ts       # Infrastructure error handling
│
├── ui/                  # Pure UI components (no business logic)
│   ├── components/     # Reusable UI components
│   └── templates/      # Page-level UI templates
│
├── app/                 # Application coordination layer
│   ├── features/       # Feature slices (routing, components, logic)
│   ├── stores/         # Global state management
│   └── bootstrap.ts    # Application initialization
│
├── config/              # Configuration and constants
└── tests/               # Test utilities and setup
```

## Key Features

### 🏗️ Clean Architecture
- **Ports and Adapters**: Clean separation of business logic from external concerns
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Single Responsibility**: Each module has one reason to change
- **Interface Segregation**: Clients depend only on interfaces they use

### 🔒 Type Safety
- **Strict TypeScript**: `strict: true` with advanced compiler options
- **No `any` Types**: <0.5% any usage across the codebase
- **Domain Types**: Rich domain models with proper typing
- **DTO Validation**: Runtime validation at API boundaries

### ⚡ State Management
- **Zustand Stores**: Lightweight, performant state management
- **Selective Subscriptions**: Precise selectors prevent unnecessary re-renders
- **Persistent State**: Automatic state persistence with rehydration
- **Cross-Component State**: Centralized state eliminates prop drilling

### 🌐 API Layer
- **Service Facades**: Clean abstractions over GraphQL operations
- **Result Pattern**: Functional error handling without exceptions
- **Retry Logic**: Built-in retry with exponential backoff
- **Type Safety**: End-to-end type safety from API to UI

### 🛡️ Error Handling
- **Error Boundaries**: React error boundaries with fallback UI
- **Structured Errors**: Classified error types with context
- **Error Reporting**: Centralized error reporting with fingerprinting
- **No Silent Failures**: All errors properly handled or bubbled up

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone and install dependencies
git clone <repository-url>
cd unisala-astro
npm install
```

### Development

```bash
# Start development server
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Testing
npm run test
npm run test:coverage
```

### Building

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## Development Workflow

### Code Quality Standards

Our codebase maintains top-1% quality through:

- **TypeScript Strict Mode**: Zero `any` types policy
- **ESLint Rules**: Architecture boundary enforcement
- **Test Coverage**: 80%+ coverage requirements
- **Bundle Size**: <200kb production bundle
- **Performance**: Lighthouse scores >90

### Git Workflow

1. **Feature Branches**: Create feature branches from `main`
2. **Quality Gates**: All PRs must pass CI checks
3. **Code Reviews**: Peer review required for all changes
4. **Automated Testing**: Comprehensive test suite runs on every PR

### Architecture Guidelines

#### Creating New Features

1. **Domain First**: Define domain models in `src/core/domain/`
2. **Service Layer**: Create API services in `src/infrastructure/api/services/`
3. **State Management**: Add stores in `src/app/stores/` if needed
4. **UI Components**: Build pure UI in `src/ui/`
5. **Feature Coordination**: Wire together in `src/app/features/`

#### Component Guidelines

```tsx
// ✅ Good: Pure UI component
export const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  return (
    <div className="card">
      <h2>{post.title}</h2>
      <button onClick={() => onLike(post.id)}>Like</button>
    </div>
  );
};

// ✅ Good: Feature coordination
export const PostFeature: React.FC = () => {
  const postService = usePostService();
  const posts = usePostStore(state => state.posts);
  
  const handleLike = async (postId: string) => {
    const result = await postService.likePost(postId);
    // Handle result...
  };
  
  return <PostCard post={post} onLike={handleLike} />;
};
```

## API Documentation

### Service Layer

The application uses a service layer pattern to abstract API operations:

```typescript
// User operations
const userService = useUserService();
await userService.login(email, verificationCode);
await userService.updateProfile(updateData);

// Post operations  
const postService = usePostService();
await postService.createPost(postData);
await postService.getFeed(feedQuery);
```

### State Management

Zustand stores provide reactive state management:

```typescript
// User state
const user = useUserStore(state => state.user);
const login = useUserStore(state => state.login);

// Draft state
const currentDraft = useDraftsStore(state => 
  state.currentDraftId ? state.drafts[state.currentDraftId] : null
);
```

## Testing Strategy

### Unit Testing
- **Vitest**: Fast unit test runner
- **Domain Logic**: Test business rules in isolation
- **Utilities**: Test pure functions

### Integration Testing
- **MSW**: Mock API responses for integration tests
- **Component Testing**: Test component behavior with realistic data
- **Store Testing**: Test state management logic

### E2E Testing
- **Playwright**: Cross-browser end-to-end testing
- **Critical Flows**: Test user journeys and business processes
- **Visual Regression**: Prevent UI regressions

## Performance

### Bundle Optimization
- **Code Splitting**: Route-based code splitting
- **Tree Shaking**: Eliminate unused code
- **Bundle Analysis**: Regular bundle size monitoring

### Runtime Performance
- **Selective Re-renders**: Zustand selectors prevent unnecessary updates
- **Memoization**: Strategic use of React.memo and useMemo
- **Lazy Loading**: Components and routes loaded on demand

### Monitoring
- **Lighthouse CI**: Automated performance regression detection
- **Bundle Size Monitoring**: CI fails on bundle size increases
- **Core Web Vitals**: Track real-world performance metrics

## Contributing

1. Read the [Architecture Guidelines](docs/architecture-guidelines.md)
2. Follow the [Code Style Guide](docs/code-style.md)
3. Ensure all tests pass: `npm run test`
4. Run type checking: `npm run typecheck`
5. Submit PR with clear description

## License

MIT License - see [LICENSE](LICENSE) for details.