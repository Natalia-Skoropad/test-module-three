import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'modern-normalize';
import './global.css';

import App from './components/App/App';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
