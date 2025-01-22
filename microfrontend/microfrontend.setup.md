# README for `server.conf` Setup

## Overview

This README provides guidance on the `server.conf` file used in a microfrontend architecture that involves a Next.js application and an Ionic app. The configuration leverages Nginx as a reverse proxy to efficiently route requests based on URL paths to the appropriate application.


## Why Use `server.conf` in Microfrontend Architecture?

Microfrontend architectures allow different frontend app to work independently on their parts of the application, which can then be combined into a cohesive whole. This approach offers several benefits:

- **Scalability**: Each part of the frontend can be scaled independently based on demand.
- **Maintainability**: Smaller codebases are easier to manage and understand.
- **Flexibility**: Teams can use different frameworks and technologies that best suit their needs.

The `server.conf` file is crucial in this setup as it configures Nginx to direct traffic appropriately, ensuring that requests are handled by the correct microfrontend. This setup helps in avoiding conflicts and ensures that each part of the application can operate independently without interference.



## Configuration Details

### Server Setup

- **Port**: 8080
- **Server Name**: localhost

### Routing Details

     -> /           -> Next.js (http://localhost:3001)
     -> /thread/    -> Next.js (http://localhost:3001)
     -> /topic/major/ -> Next.js (http://localhost:3001)
     -> /_next/static/ -> Next.js (http://localhost:3001)
     -> /assets/    -> Ionic app (http://localhost:3000)
     -> /login      -> Ionic app (http://localhost:3000)
     -> /           -> Ionic app (http://localhost:3000) [Fallback for all unspecified routes]





- **Next.js Application**:
  - **Root Path (`/`)**, **Thread Path (`/thread/`)**, and **Major Topic Path (`/topic/major/`)** are configured to proxy requests to `http://localhost:3001`.
  - These configurations ensure that HTTP/1.1 is used and that WebSocket upgrades are supported.

- **Static Files and Assets**:
  - **Static Files Path (`/_next/static/`)**: Serves or proxies static files for the Next.js application.
  - **General Assets**: Any other asset requests like images or scripts are also proxied to the Next.js application.

- **Ionic App**:
  - **Assets Path (`/assets/`)**: Proxies asset requests to `http://localhost:3000`, with added security headers and caching.
  - **Fallback Route (`/`)**: All other unspecified routes are served by the Ionic app.

### Additional Headers and Settings

- **Connection Upgrades**: Supports WebSocket connections.
- **Security and Caching**: Implements security headers (`X-Frame-Options`, `X-XSS-Protection`) and caching (`expires 7d`) for enhanced security and performance.

## Usage Instructions

1. **Installation**:
   - Ensure Nginx is installed on your system.

2. **Configuration**:
   - Place the `server.conf` file in the `/etc/nginx/conf.d/` directory.

3. **Applying Changes**:
   - Reload Nginx to apply the configuration changes: