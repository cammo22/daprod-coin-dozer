// Foto della macchina, per guardare come viene dopo una modifica grafica.
//
//   node test/foto.mjs [secondi] [nome]
//
// Apre il gioco in Chromium headless (computer e telefono), preme GIOCA, lancia monete a caso
// per qualche secondo di fisica e salva test/.out/<nome>.png e <nome>-telefono.png.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { avviaServer, ROOT } from './servi.mjs';

const OUT = path.join(ROOT, 'test', '.out');
fs.mkdirSync(OUT, { recursive: true });
const secondi = Number(process.argv[2]) || 8;
const nome = process.argv[3] || 'tavolo';
const { server, url } = await avviaServer();
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });
for (const [suff, opz] of [['', { viewport: { width: 1280, height: 800 } }],
                           ['-telefono', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }]]) {
  const ctx = await browser.newContext(opz);
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());   // niente rete per i font nelle prove
  const page = await ctx.newPage();
  const errori = [];
  page.on('pageerror', e => errori.push(String(e)));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errori.push(m.text()); });
  await page.goto(url, { waitUntil: 'commit' });
  await page.waitForFunction(() => !!window.DOZER, null, { timeout: 120000, polling: 500 });
  if (process.env.INTRO) { await page.waitForTimeout(2500); await page.screenshot({ path: path.join(OUT, nome + suff + '-intro.png'), timeout: 90000 }); }
  await page.evaluate(() => { DOZER.gioca(); document.getElementById('intro').style.display = 'none'; });
  await page.evaluate(s => {
    const D = window.DOZER; let acc = 0; D.stato.saldo = 1e6;
    for (let f = 0; f < 60 * s; f++) {
      acc += 2 / 60;
      while (acc >= 1) { acc -= 1; D.colonna(-3.5 + Math.random() * 7); D.lanciaDalGiocatore(); }
      D.simula(1 / 60);
    }
  }, secondi);
  await page.evaluate(() => DOZER.camera());
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT, nome + suff + '.png'), timeout: 90000 });
  console.log(nome + suff + '.png', errori.length ? 'ERRORI: ' + errori.join(' | ') : 'ok',
    await page.evaluate(() => JSON.stringify({ monete: DOZER.monete().length, post: DOZER.postPronto(), salite: DOZER.salite(), fusioni: DOZER.stato.st.fusioni })));
}
await browser.close();
server.close();
