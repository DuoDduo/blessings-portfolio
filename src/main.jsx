import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './contexts/theme';
import { Analytics } from '@vercel/analytics/next';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Analytics/>
    </ThemeProvider>
  </React.StrictMode>
);
