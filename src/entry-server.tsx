/**
 * Rendu serveur utilisé au build (scripts/prerender.mjs) pour écrire le HTML complet
 * de la page dans dist/index.html. Les robots qui n'exécutent pas JavaScript
 * (GPTBot, ClaudeBot, PerplexityBot…) lisent ainsi tout le contenu du site.
 */
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import App from './App';

export async function render(): Promise<string> {
  // prerender attend la résolution de toutes les sections chargées en lazy
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
