// Copia il gioco negli asset dell'app Android, con three.js e gli addon del bagliore inclusi:
// l'app funziona anche senza rete.   Uso:  npm i --no-save three@0.160.0 && node android/prepara-www.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const THREE = path.join(ROOT, 'node_modules/three');
const WWW = path.join(ROOT, 'android/app/src/main/assets/www');
const CDN = 'https://unpkg.com/three@0.160.0/';
if (!fs.existsSync(path.join(THREE, 'build/three.module.js'))) {
  console.error('three.js non trovato: npm i --no-save three@0.160.0'); process.exit(1);
}
fs.rmSync(WWW, { recursive: true, force: true });
fs.mkdirSync(WWW, { recursive: true });
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
if (!html.includes(CDN)) { console.error('URL della CDN non trovato in index.html'); process.exit(1); }
html = html.split(CDN).join('./three/');
fs.writeFileSync(path.join(WWW, 'index.html'), html);
for (const d of ['build/three.module.js', 'examples/jsm/postprocessing', 'examples/jsm/shaders', 'LICENSE']) {
  fs.cpSync(path.join(THREE, d), path.join(WWW, 'three', d), { recursive: true });
}
console.log('asset pronti in', path.relative(ROOT, WWW));
