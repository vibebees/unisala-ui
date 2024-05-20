# Next-Uni


This is Unisala micro frontend a Next.js project designed to run on port 3001. This README provides essential information on setting up, running, and maintaining the application.

    This is designed for seo optimization and performance. we will develop new pages meant for SEO using this application.

All the stories tagged with  **<span style="color:green;">epic i.e value attraction </span>** shall be developed here.

## Prerequisites

Before setting up the Unisala application, ensure you have the following installed:
- Node.js (20)
- npm or Yarn

## Installation


```bash
npm install
```

or if you prefer using Yarn:

```bash
yarn install
```

## Running the Application

The Unisala application is configured to run on port 3001. You can start the server using the following commands:

### Development

To start the development server on port 3001, you can use:

```bash
npm run dev
```

or with Yarn:

```bash
yarn dev
```

### Production

For production environments, build the application first and then start it:

```bash
npm run build
npm run start
```

or using Yarn:

```bash
yarn build
yarn start
```

## Accessing the Application

Once the server is running, access the Unisala application by navigating to:

```
http://localhost:3001
```


## Integration with Microfrontend on Port 8080

To integrate the Unisala application with a microfrontend architecture running on port 8080, follow these steps:

1. **Ensure Production Builds**: Both the Unisala application and the microfrontend components must be built for production. For Unisala, use the build commands provided above.

2. **Configure Reverse Proxy**: Set up a reverse proxy (e.g., Nginx, Apache) to route traffic between the microfrontend gateway on port 8080 and the Unisala application on port 3001.


# Main Goal for adding this micro frontend
## SEO Optimization and Performance

To enhance SEO and reduce load times, consider the following strategies:

- **Server-Side Rendering (SSR)**: Utilize SSR for critical content to improve SEO and initial load times.
- **Code Splitting**: Implement code splitting to reduce the size of the initial JavaScript bundle, enhancing load times.