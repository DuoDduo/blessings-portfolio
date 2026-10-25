import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from "@vercel/analytics/react"
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/instrument-serif/400-italic.css';
import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';

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
