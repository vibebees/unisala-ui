          data-astro-reload

          helps reload the page on navigating



          # Navigator

A utility function for handling client-side navigation with URL state preservation.

## Usage

```typescript
import { navigator } from '@/utils/lib/URLupdate';

// Basic navigation
navigator('/new-path');

// Preserve current URL in redirect parameter
navigator('/auth');  // /auth?redirect=/current/path

// Return to preserved URL
navigator('');  // Goes to the URL stored in redirect parameter
```

## How It Works

1. **URL State Preservation**
   - Current URL is automatically stored in `redirect` parameter
   - Preserves query parameters and path structure
   - Useful for auth flows and form completions

2. **Navigation Patterns**

   ```typescript
   // Scenario 1: Preserve State (e.g., Thread => Login => Thread)
   navigator('/auth');  // Stores current path in redirect

   // Scenario 2: New State (e.g., Register => Welcome => Discover)
   navigator('/welcome-form');  // Keeps redirect parameter

   // Scenario 3: Return to Stored URL
   navigator('');  // Goes to stored redirect URL or defaults to /new-story
   ```

## Examples

```typescript
// Auth redirect with return path
const handleProtectedAction = () => {
  if (!authenticated) {
    navigator('/auth');  // Will return here after auth
    return;
  }
  // Protected action code
};

// Multi-step form with preserved destination
const handleFormStep = () => {
  navigator('/welcome-form/step-two');  // Preserves original redirect
};

// Return to original URL
const handleCompletion = () => {
  navigator('');  // Returns to preserved URL
};
```

## Return Priority
1. Explicitly passed URL
2. Redirect parameter from URL
3. Default path (/new-story)