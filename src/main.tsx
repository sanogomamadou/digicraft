import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En production, le HTML est pré-généré au build (scripts/prerender.mjs) : on l'hydrate.
// En développement, la page arrive vide : rendu classique.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
