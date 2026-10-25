import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Analytics } from "@vercel/analytics/react"
import './index.css';

// The design system reference lives at /design and loads as its own chunk
const DesignSystem = lazy(() => import('./pages/DesignSystem.jsx'));
const isDesignPage = window.location.pathname.replace(/\/+$/, '') === '/design';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {isDesignPage ? (
      <Suspense fallback={null}>
        <DesignSystem />
      </Suspense>
    ) : (
      <App />
    )}
    <Analytics/>
  </React.StrictMode>
);
