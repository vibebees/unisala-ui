# Architecture Implementation Guide

This document provides detailed implementation guidance for the Clean Architecture patterns used in this codebase.

## 🏗️ Architecture Overview

This application implements **Clean Architecture** with **SOLID** principles, providing:
- Clear separation of concerns
- High testability
- Framework independence
- Maintainable and scalable code structure

## 📁 Layer Structure

### Core Layer (`src/core/`)

The innermost layer containing pure business logic with no external dependencies.

#### Domain Models (`src/core/domain/`)

```typescript
// src/core/domain/user.ts
export interface User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly displayName: string;
  readonly profile: UserProfile;
  readonly preferences: UserPreferences;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Rich domain models with business rules
export interface UserProfile {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly bio?: string;
  readonly university?: string;
}
```

#### Error Types (`src/core/errors.ts`)

```typescript
export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly httpStatus: number;
  
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends DomainError {
  readonly code = 'VALIDATION_ERROR';
  readonly httpStatus = 400;
}
```

#### Result Pattern (`src/core/result.ts`)

```typescript
export type Result<T, E = DomainError> = 
  | { success: true; data: T; error?: never }
  | { success: false; error: E; data?: never };

export function Ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

export function Err<E extends DomainError>(error: E): Result<never, E> {
  return { success: false, error };
}
```

### Infrastructure Layer (`src/infrastructure/`)

Handles external concerns and implements interfaces defined by the core layer.

#### API Client (`src/infrastructure/api/client.ts`)

```typescript
export interface APIClient {
  query<TData, TVars>(
    query: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): Promise<Result<TData, TransportError>>;
  
  mutate<TData, TVars>(
    mutation: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): Promise<Result<TData, TransportError>>;
}

export class ApolloAPIClient implements APIClient {
  constructor(private readonly apolloClient: ApolloClient<any>) {}
  
  async query<TData, TVars>(
    query: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): Promise<Result<TData, TransportError>> {
    return this.executeWithRetry(async () => {
      try {
        const result = await this.apolloClient.query({
          query,
          variables,
          fetchPolicy: 'cache-first',
        });
        return Ok(result.data);
      } catch (error) {
        return Err(this.mapApolloErrorToTransportError(error));
      }
    }, config);
  }
}
```

#### Service Facades (`src/infrastructure/api/services/`)

```typescript
// src/infrastructure/api/services/user.service.ts
export class UserService {
  constructor(private readonly apiClient: APIClient) {}

  async login(email: string, code: number): Promise<Result<UserAuth, TransportError>> {
    const result = await this.apiClient.mutate<AuthResponseData>(
      VERIFY_EMAIL_MUTATION,
      { email, verificationCode: code }
    );

    if (!result.success) return result;

    const userAuth = mapAuthResponseDTOToDomain(result.data);
    return Ok(userAuth);
  }
}
```

#### DTOs and Mappers (`src/infrastructure/dto/`, `src/infrastructure/mappers/`)

```typescript
// src/infrastructure/dto/user.dto.ts
export interface UserDTO {
  readonly _id: string;
  readonly email: string;
  readonly username: string;
  readonly displayName: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// src/infrastructure/mappers/user.mapper.ts
export function mapUserDTOToDomain(dto: UserDTO): User {
  return {
    id: dto._id,
    email: dto.email,
    username: dto.username,
    displayName: dto.displayName,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    // ... map other properties
  };
}
```

### UI Layer (`src/ui/`)

Pure presentation components with no business logic or external dependencies.

#### Components (`src/ui/components/`)

```typescript
// src/ui/components/PostCard.tsx
interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike, 
  onShare, 
  className 
}) => {
  return (
    <div className={cn("card", className)}>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-muted-foreground">{post.excerpt}</p>
      
      <div className="flex gap-2 mt-4">
        <Button 
          onClick={() => onLike(post.id)}
          variant="outline"
        >
          Like ({post.metrics.likes})
        </Button>
        <Button 
          onClick={() => onShare(post.id)}
          variant="outline"
        >
          Share
        </Button>
      </div>
    </div>
  );
};
```

#### Error Boundaries (`src/ui/components/ErrorBoundary.tsx`)

```typescript
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    errorReporter.reportError(error, ErrorSeverity.HIGH, {
      component: 'ErrorBoundary',
      errorInfo: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return <DefaultErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
```

### Application Layer (`src/app/`)

Coordinates between layers and manages application-wide concerns.

#### State Management (`src/app/stores/`)

```typescript
// src/app/stores/user.store.ts
export const useUserStore = create<UserStore>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        // State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, code: number) => {
          set(state => { state.isLoading = true; });
          
          const userService = getServiceRegistry().userService;
          const result = await userService.login(email, code);
          
          if (result.success) {
            set(state => {
              state.user = mapUserAuthToUser(result.data);
              state.isAuthenticated = true;
              state.isLoading = false;
            });
          } else {
            set(state => {
              state.error = result.error.message;
              state.isLoading = false;
            });
          }
          
          return result;
        },
      })),
      { name: 'user-store' }
    )
  )
);
```

#### Feature Slices (`src/app/features/`)

```typescript
// src/app/features/editor/EditorFeature.tsx
export const EditorFeature: React.FC = () => {
  const addNotification = useAppStore(state => state.addNotification);

  const handlePostPublished = (postId: string) => {
    addNotification({
      type: 'success',
      title: 'Post Published!',
      message: 'Your post has been published successfully.',
    });
    
    // Navigate to published post
    window.location.href = `/threads/${postId}`;
  };

  return (
    <ErrorBoundary>
      <NotePadTemplate 
        onPublished={handlePostPublished}
        onSaved={() => addNotification({ type: 'info', title: 'Draft Saved' })}
      />
    </ErrorBoundary>
  );
};
```

## 🔧 Implementation Patterns

### Service Layer Pattern

All external API calls go through service facades:

```typescript
// ✅ Good: Using service layer
const postService = usePostService();
const result = await postService.createPost(postData);

// ❌ Bad: Direct GraphQL in component
const [addPost] = useMutation(ADD_POST_MUTATION);
```

### Result Pattern for Error Handling

All operations that can fail return Result types:

```typescript
// Service method
async createPost(data: CreatePostData): Promise<Result<Post, TransportError>> {
  const result = await this.apiClient.mutate(CREATE_POST_MUTATION, data);
  
  if (!result.success) {
    return Err(result.error);
  }
  
  return Ok(mapPostDTOToDomain(result.data));
}

// Component usage
const handleSubmit = async () => {
  const result = await postService.createPost(formData);
  
  if (!result.success) {
    toast.error(result.error.message);
    return;
  }
  
  // Success handling
  onSuccess(result.data);
};
```

### Dependency Injection

Services are injected through a service registry:

```typescript
// Service registration
export function initializeServiceRegistry(apiClient: APIClient): ServiceRegistry {
  return new ServiceRegistry(apiClient);
}

// Service consumption
export function useUserService(): UserService {
  return getServiceRegistry().userService;
}
```

### State Management with Zustand

State is managed through typed stores with selectors:

```typescript
// Precise selectors (no unnecessary re-renders)
const currentDraft = useDraftsStore(state => 
  state.currentDraftId ? state.drafts[state.currentDraftId] : null
);

// Actions (stable references)
const saveDraft = useDraftsStore(state => state.saveDraft);
```

## 🧪 Testing Implementation

### Unit Testing with Vitest

```typescript
// src/core/domain/__tests__/user.test.ts
describe('User Domain', () => {
  it('should create valid user', () => {
    const user = createUser({
      email: 'test@example.com',
      username: 'testuser',
      displayName: 'Test User',
    });
    
    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });
});
```

### Component Testing with MSW

```typescript
// src/ui/templates/__tests__/NotePad.test.tsx
const server = setupServer(
  graphql.mutation('CreatePost', (req, res, ctx) => {
    return res(ctx.data({ createPost: mockPost }));
  })
);

describe('NotePad', () => {
  it('should publish post successfully', async () => {
    render(
      <NotePad onPublished={mockOnPublished} />
    );
    
    await user.type(screen.getByRole('textbox'), 'Test content');
    await user.click(screen.getByRole('button', { name: /publish/i }));
    
    expect(mockOnPublished).toHaveBeenCalledWith('post-id');
  });
});
```

### Service Testing

```typescript
// src/infrastructure/api/services/__tests__/user.service.test.ts
describe('UserService', () => {
  it('should login successfully', async () => {
    const mockClient = createMockAPIClient();
    const userService = new UserService(mockClient);
    
    const result = await userService.login('test@example.com', 123456);
    
    expect(result.success).toBe(true);
    expect(result.data.userId).toBeDefined();
  });
});
```

## 📊 Performance Considerations

### Bundle Optimization

```typescript
// Route-based code splitting
const EditorFeature = lazy(() => import('@/app/features/editor/EditorFeature'));

// Component-level splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Selective Re-renders

```typescript
// Precise selectors prevent unnecessary re-renders
const title = useDraftsStore(state => 
  state.currentDraftId ? state.drafts[state.currentDraftId]?.title : ''
);

// Memoized components
const MemoizedPostCard = memo(PostCard);
```

### Error Boundary Placement

```typescript
// Feature-level error boundaries
<ErrorBoundary fallback={FeatureErrorFallback}>
  <EditorFeature />
</ErrorBoundary>

// Route-level error boundaries
<ErrorBoundary fallback={PageErrorFallback}>
  <PostDetailPage />
</ErrorBoundary>
```

## 🔍 Code Quality Enforcement

### ESLint Rules

```javascript
// eslint.config.js
export default [
  {
    rules: {
      // Prevent direct GraphQL imports in UI
      "no-restricted-imports": ["error", {
        "patterns": [{
          "group": ["**/graphql/**"],
          "importNames": ["*"],
          "message": "Use service layer instead of direct GraphQL imports"
        }]
      }]
    }
  }
];
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

This implementation guide provides the foundation for building maintainable, testable, and scalable applications following clean architecture principles.