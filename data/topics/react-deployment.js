export const reactDeploymentContent = {
  slug: "react-deployment",
  briefDescription: [
    "React projects built with Vite or Create React App are compiled into static assets (HTML, CSS, JS) that run entirely in the browser. To build for production, run npm run build — this bundles, minifies, and tree-shakes the code into an optimized dist/ or build/ folder. The output is static files you can host on any file server. Popular free hosting options: Vercel (zero-config, just connect your GitHub repo), Netlify (similar, also supports serverless functions), and GitHub Pages (good for simple projects). For Docker/VPS deployment, you serve the built files with Nginx.",
    "Environment variables in Vite must be prefixed with VITE_ to be exposed to the browser: VITE_API_URL=https://api.example.com. Access them in code as import.meta.env.VITE_API_URL. Create React App uses REACT_APP_ prefix and process.env.REACT_APP_API_URL. Never put secrets (private keys, database passwords) in front-end environment variables — they're embedded in the JavaScript bundle and visible to anyone who views source. Store those only on the server. Use .env.local for local development and set production variables in your hosting platform's settings.",
    "React project structure best practices: organize by feature (feature-based) rather than by file type (type-based) for larger projects. Keep components small and single-purpose. Extract reusable logic into custom hooks (hooks/ folder). Put API calls in a services/ or api/ folder. Use an index.js barrel file in each folder to simplify imports. For state management: local UI state in useState, server/async state with React Query or RTK Query, global app state with Context or Zustand. Always set up ESLint and Prettier for consistent code style. Write tests with React Testing Library (unit + integration) and Playwright or Cypress (end-to-end).",
  ],
  keyConcepts: [
    "npm run build: compiles React to static files in dist/ — HTML, CSS, optimized JS bundles",
    "Tree-shaking: unused code is removed from the final bundle automatically",
    "Code splitting: React.lazy + Suspense loads components only when needed",
    "Environment variables (Vite): VITE_ prefix, access via import.meta.env.VITE_NAME",
    "Environment variables (CRA): REACT_APP_ prefix, access via process.env.REACT_APP_NAME",
    ".env, .env.local, .env.production — different env files for different environments",
    "Never put secrets in front-end env vars — they're visible in the JS bundle",
    "Vercel/Netlify: connect GitHub repo → auto-deploy on every push to main",
    "Nginx config: serve React SPA — all routes fall back to index.html",
    "Feature-based folder structure: /features/auth/, /features/cart/, /features/products/",
    "Custom hooks folder: /hooks/useAuth.js, /hooks/useFetch.js",
    "React Testing Library: test components from user's perspective; Playwright for E2E tests",
  ],
  codeExample: {
    language: "javascript",
    title: "Build Config, Env Variables, Nginx, Vercel Config, Folder Structure",
    code: `// ── vite.config.js ──
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },  // @/components instead of ../../components
  },
  build: {
    outDir: 'dist',
    sourcemap: false,  // don't expose source maps in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],  // separate vendor bundle
        },
      },
    },
  },
})

// ── .env.local (local development — NOT committed to git) ──
// VITE_API_URL=http://localhost:3000/api
// VITE_APP_NAME=DevOnix

// ── .env.production (production values — set in hosting platform) ──
// VITE_API_URL=https://api.devonix.io/api

// ── src/config/env.js ──
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME ?? 'MyApp',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}

// ── Nginx config for React SPA (nginx.conf) ──
// server {
//   listen 80;
//   root /var/www/html;
//   index index.html;
//
//   location / {
//     try_files $uri $uri/ /index.html;  # SPA fallback — all routes → index.html
//   }
//
//   location /api/ {
//     proxy_pass http://backend:3000/;   # proxy API calls to backend
//   }
//
//   gzip on;
//   gzip_types text/css application/javascript;
// }

// ── vercel.json (React SPA routing) ──
// {
//   "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
// }

// ── Feature-based folder structure ──
// src/
// ├── features/
// │   ├── auth/
// │   │   ├── components/LoginForm.jsx
// │   │   ├── hooks/useAuth.js
// │   │   ├── services/authApi.js
// │   │   └── index.js
// │   ├── cart/
// │   │   ├── components/CartSidebar.jsx
// │   │   ├── store/cartSlice.js
// │   │   └── index.js
// │   └── products/
// ├── shared/
// │   ├── components/Button.jsx, Modal.jsx
// │   ├── hooks/useLocalStorage.js
// │   └── utils/formatCurrency.js
// ├── App.jsx
// └── main.jsx

// ── Code splitting with React.lazy ──
import React, { Suspense, lazy } from 'react'

const Dashboard = lazy(() => import('./features/dashboard/Dashboard'))
const AdminPanel = lazy(() => import('./features/admin/AdminPanel'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin"     element={<AdminPanel />} />
      </Routes>
    </Suspense>
  )
}`,
  },
}
