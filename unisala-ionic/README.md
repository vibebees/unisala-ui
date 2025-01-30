# Unisala Ionic

A cross-platform web and mobile application built with Ionic and React. Features component library organized using Atomic Design principles and graph-based dynamic UI generation.

## Overview

Unisala Ionic leverages Ionic Framework's cross-platform capabilities to deliver a consistent experience across web browsers and native mobile apps. The same codebase powers both web and mobile experiences, with platform-specific optimizations where needed.

## Platforms Supported

- 🌐 Web Browsers (Progressive Web App)
- 📱 iOS Native App
- 🤖 Android Native App

## Tech Stack

- Ionic Framework for cross-platform UI
- React for component architecture
- TypeScript for type safety
- Capacitor for native features
- Vite for building
- Cypress for E2E testing
- Tailwind CSS for styling
- PWA support for web installations

## Architecture

### Atomic Design Structure

Components are organized following Atomic Design principles, enabling consistent UI across all platforms:

```
src/
└── components/
    ├── analytics/          # Cross-platform analytics
    │   ├── ButtonTrack.js
    │   └── LinkTrack.tsx
    │
    ├── packages/          # Feature packages
    │   └── createAPost/
    │       ├── atoms/     # Basic UI elements
    │       ├── molecules/ # Combined elements
    │       │   ├── Form.tsx
    │       │   ├── FormAvatar.tsx
    │       │   └── ImageUpload.tsx
    │       ├── organism/  # Complex components
    │       │   ├── FormTab.tsx
    │       │   └── PostModalOnClick.tsx
    │       └── template/  # Layout templates
    │
    └── createSpace/      # Space creation feature
```

## Getting Started

### Web Development

```bash
# Start web development server
pnpm dev

# Build for web deployment
pnpm build

# Preview production build
pnpm preview
```

### Mobile Development

```bash
# iOS setup
pnpm build
npx cap add ios
npx cap sync ios
npx cap open ios

# Android setup
pnpm build
npx cap add android
npx cap sync android
npx cap open android
```

## Platform-Specific Features

### Web (PWA)
- Progressive Web App capabilities
- Desktop responsive layouts
- Browser API integrations
- Web-specific optimizations

### Mobile (iOS/Android)
- Native UI components
- Device API access
- Touch gestures
- Platform-specific features

### Shared Features
- Authentication system
- Data management
- Analytics tracking
- Core business logic

## Development Guidelines

### Cross-Platform Considerations

1. **Responsive Design**
   - Use Ionic's responsive utilities
   - Test across different screen sizes
   - Consider touch and mouse interactions

2. **Platform Detection**
```typescript
import { isPlatform } from '@ionic/react';

const MyComponent = () => {
  if (isPlatform('ios')) {
    return <IOSStyleComponent />;
  }
  return <DefaultComponent />;
};
```

3. **Capacitor Plugins**
```typescript
import { Camera } from '@capacitor/camera';

// Works on both mobile and web
const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: 'uri'
  });
  // Handle image
};
```

## Component Development

- Use Ionic components for cross-platform consistency
- Follow Atomic Design principles
- Implement responsive layouts
- Add platform-specific code when needed

Example:
```typescript
import { IonButton, IonIcon, isPlatform } from '@ionic/react';

const CrossPlatformButton = () => {
  const buttonStyle = isPlatform('ios')
    ? 'ios-style'
    : 'material-style';

  return (
    <IonButton className={buttonStyle}>
      Click Me
    </IonButton>
  );
};
```

## Build & Deployment

### Web Deployment
```bash
# Build for web
pnpm build:web

# Deploy to hosting service
pnpm deploy:web
```

### Mobile Deployment
```bash
# iOS
pnpm build:ios
npx cap sync ios

# Android
pnm build:android
npx cap sync android
```

## Contributing

See [DEVELOPMENT.ENGINEERING.MD](DEVELOPMENT.ENGINEERING.MD) for detailed guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details