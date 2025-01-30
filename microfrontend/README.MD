### Important: Production-Ready Builds for Port 8080

Ensure that for port 8080, both the microfrontend components are production-ready. This means you must build both components:
- **Ionic Build**: Execute `ionic build` which outputs to `dist/`.
- **Next.js Universal Build**: Execute `next build` which outputs to `.next/`.

Only after both builds are complete and successful, you can use port 8080.

## Cannot use dev server mode for 8080, it might yield error
If both servers are running locally without these builds, **<span style="color:red;">port 8080 cannot be used</span>**.




//for prod

CDN = 'https://d2wpk2fhu8mz8q.cloudfront.net/'

// for test
CDN = 'https://d1f4xt2gnrpjhx.cloudfront.net/'


