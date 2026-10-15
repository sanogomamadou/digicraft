// Pré-génère le HTML de la page d'accueil après `vite build`.
// 1. charge le rendu serveur (dist-ssr/entry-server.js, produit par `vite build --ssr`)
// 2. injecte le HTML obtenu dans <div id="root"> de dist/index.html
// 3. supprime le dossier dist-ssr (inutile en production)
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const htmlFile = path.join(root, 'dist', 'index.html');

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = await render();

const template = await readFile(htmlFile, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`prerender : "${marker}" introuvable dans dist/index.html`);
}
await writeFile(htmlFile, template.replace(marker, `<div id="root">${appHtml}</div>`));
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });

const text = appHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(`prerender : ${Math.round(appHtml.length / 1024)} Ko de HTML, ${text.length} caractères de texte injectés dans dist/index.html`);
