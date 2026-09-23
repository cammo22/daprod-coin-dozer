// Foto del tavolo, per guardare come viene dopo una modifica grafica.
//
//   node test/foto.mjs [secondi] [nome]
//
// Apre il gioco in Chromium headless, lascia girare la fisica per qualche secondo lanciando
// lire a caso e salva test/.out/<nome>.png (desktop) e <nome>-telefono.png.
import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = path.join(ROOT, 'test', '.out');
fs.mkdirSync(OUT, { recursive: true });
const secondi = Number(process.argv[2]) || 8;
const nome = process.argv[3] || 'tavolo';
const CDN = 'https://unpkg.com/three@0.160.0/build/three.module.js';
const THREE_LOCALE = path.join(ROOT, 'node_modules/three/build/three.module.js');
const PORT = 8900 + Math.floor(Math.random() * 90);
const server = http.createServer((req, res) => {
  let f = decodeURIComponent(req.url.split('?')[0]);
  if (f === '/') f = '/index.html';
  if (f === '/three.module.js' && fs.existsSync(THREE_LOCALE)) {
    res.writeHead(200, { 'content-type': 'text/javascript' }); return res.end(fs.readFileSync(THREE_LOCALE));
  }
  const p = path.join(ROOT, f);
  if (!p.startsWith(ROOT) || !fs.existsSync(p)) { res.writeHead(404); return res.end('no'); }
  let body = fs.readFileSync(p);
  if (p.endsWith('index.html') && fs.existsSync(THREE_LOCALE)) body = Buffer.from(String(body).replace(CDN, '/three.module.js'));
  res.writeHead(200, { 'content-type': p.endsWith('.html') ? 'text/html' : 'text/javascript' });
  res.end(body);
});
await new Promise(r => server.listen(PORT, r));
const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });
for (const [suff, opz] of [['', { viewport: { width: 1280, height: 800 } }],
                           ['-telefono', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
  const page = await (await browser.newContext(opz)).newPage();
  const errori = [];
  page.on('pageerror', e => errori.push(String(e)));
  await page.goto(`http://127.0.0.1:${PORT}/index.html`);
  await page.waitForFunction(() => !!window.DOZER, null, { timeout: 30000 });
  await page.evaluate(s => {
    const D = window.DOZER; let acc = 0;
    for (let f = 0; f < 60 * s; f++) {
      acc += 1.6 / 60;
      while (acc >= 1) { acc -= 1; D.lanciaLira(-3 + Math.random() * 6); }
      D.aggiornaFisica(1 / 60); D.riciclaEccesso();
    }
  }, secondi);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT, nome + suff + '.png') });
  console.log(nome + suff + '.png', errori.length ? 'ERRORI: ' + errori.join(' | ') : 'ok');
}
await browser.close();
server.close();
