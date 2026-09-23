// Controlli automatici di DaProd Coin Dozer.
//
//   npm i --no-save playwright three@0.160.0 && node test/prove.mjs
//
// Apre il gioco in un browser vero (Chromium headless) su desktop, su telefono e con
// un salvataggio di una versione vecchia, e verifica che: parta senza errori, il tavolo
// non si riempia mai, le abilita' si possano spegnere, la raffica non regali premi
// fuori scala e il negozio funzioni anche al tocco.
// Se three.js e' installato in locale (node_modules) viene servito da li', cosi' le
// prove funzionano anche senza rete; altrimenti si usa la CDN come nel gioco vero.
import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// fileURLToPath e non .pathname: su Windows .pathname da' /C:/... e il server non trova i file.
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CDN = 'https://unpkg.com/three@0.160.0/build/three.module.js';
const THREE_LOCALE = ['node_modules/three/build/three.module.js', 'test/three.module.js']
  .map(p => path.join(ROOT, p)).find(p => fs.existsSync(p));
const PORT = Number(process.env.PORT) || 8100 + Math.floor(Math.random() * 800);
const TIPI = { '.html': 'text/html', '.js': 'text/javascript', '.md': 'text/markdown' };
const server = http.createServer((req, res) => {
  let f = decodeURIComponent(req.url.split('?')[0]);
  if (f === '/') f = '/index.html';
  if (f === '/three.module.js' && THREE_LOCALE) {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    return res.end(fs.readFileSync(THREE_LOCALE));
  }
  const p = path.join(ROOT, f);
  if (!p.startsWith(ROOT) || !fs.existsSync(p)) { res.writeHead(404); return res.end('no'); }
  let body = fs.readFileSync(p);
  // se three e' in locale lo servo da qui: le prove girano anche senza rete
  if (p.endsWith('index.html') && THREE_LOCALE) {
    body = Buffer.from(String(body).replace(CDN, '/three.module.js'));
  }
  res.writeHead(200, { 'content-type': TIPI[path.extname(p)] || 'application/octet-stream' });
  res.end(body);
});
await new Promise(r => server.listen(PORT, r));

let ok = 0, ko = 0;
const T = (nome, cond, extra = '') => {
  if (cond) { ok++; console.log('  ✔', nome, extra); }
  else { ko++; console.log('  ✘', nome, extra); }
};

const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });

async function nuovaPagina(opz = {}, salvataggio = null) {
  const ctx = await browser.newContext(opz);
  const page = await ctx.newPage();
  const errori = [];
  page.on('console', m => { if (m.type() === 'error') errori.push(m.text()); });
  page.on('pageerror', e => errori.push(String(e)));
  if (salvataggio) {
    await page.addInitScript(sv => { try { localStorage.setItem('daprod_dozer_v2', sv); } catch (e) {} }, salvataggio);
  }
  await page.goto(`http://127.0.0.1:${PORT}/index.html`);
  await page.waitForFunction(() => !!window.DOZER, null, { timeout: 25000 });
  return { ctx, page, errori };
}

// ============================================================ DESKTOP
console.log('\n== DESKTOP ==');
{
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 1280, height: 800 } });
  await page.waitForTimeout(900);

  T('nessun errore in console', errori.length === 0, errori.join(' | '));
  T('canvas presente', await page.locator('canvas').count() === 1);
  T('nessun avviso di errore a schermo', await page.locator('#erroreGioco').count() === 0);
  T('versione v1.6.0 in HUD', (await page.locator('#versione').textContent()) === 'v1.6.0');
  T('pila iniziale fitta', await page.evaluate(() => DOZER.lireSulTavolo()) > 130);

  // --- MECCANICA DEL DOZER: si sceglie solo la colonna, si cade sempre in fondo ---
  {
    const lancio = await page.evaluate(() => {
      const D = DOZER;
      return [-9, -2, 0, 2.4, 9].map(x => { const m = D.lanciaLira(x); return { x: m.mesh.position.x, z: m.mesh.position.z }; });
    });
    const Z = await page.evaluate(() => DOZER.Z_LANCIO);
    const DECK = await page.evaluate(() => [DOZER.DECK_Z0, DOZER.DECK_Z1]);
    T('la fessura sta in fondo a tutto, sulla camera di carico',
      Z > DECK[0] + 0.4 && Z < DECK[1] - 0.4, 'z ' + Z + ' dentro ' + DECK[0] + '..' + DECK[1]);
    const XMAX = await page.evaluate(() => DOZER.X_LANCIO_MAX);
    T('la lira scende sempre dalla fessura in fondo, mai davanti',
      lancio.every(l => Math.abs(l.z - Z) <= 0.3), 'z ' + lancio.map(l => l.z.toFixed(1)).join(' '));
    T('la colonna scelta viene rispettata e limitata alla larghezza del tavolo',
      lancio.every(l => Math.abs(l.x) <= XMAX + 1e-6) && Math.abs(lancio[2].x) < 1e-6 &&
      Math.abs(lancio[3].x - 2.4) < 1e-6, 'x ' + lancio.map(l => l.x.toFixed(1)).join(' '));

    const H = await page.evaluate(() => DOZER.ALTEZZA_PIASTRA);
    const dopo = await page.evaluate(() => {
      const D = DOZER;
      const nate = [];
      for (let i = 0; i < 8; i++) nate.push(D.lanciaLira(-3 + i * 0.8));
      for (let f = 0; f < 90; f++) { D.aggiornaFisica(1/60); D.riciclaEccesso(); }
      return nate.filter(m => m.attiva).map(m => m.mesh.position.y);
    });
    T('atterrano sul ripiano rialzato, non sul tavolo',
      dopo.length > 0 && dopo.every(y => y > H - 0.05), dopo.length + ' lire sul ripiano');

    // --- MURO INVISIBILE: chi non si e' posato non passa sul campo ---
    const muro = await page.evaluate(() => {
      const D = DOZER;
      const nate = [];
      // lanciate e spinte FORTE in avanti: senza muro schizzerebbero sul campo
      for (let i = 0; i < 10; i++) { const m = D.lanciaLira(-3 + i * 0.7); m.vz = -9; nate.push(m); }
      let peggiore = 99;
      for (let f = 0; f < 60; f++) {
        D.aggiornaFisica(1/60);
        for (const m of nate) {
          if (m.attiva && m.mesh.position.y > D.MURO_TAGLIO) peggiore = Math.min(peggiore, m.mesh.position.z);
        }
      }
      return { peggiore, muro: D.MURO_Z };
    });
    T('il muro trattiene le lire che non si sono ancora posate',
      muro.peggiore >= muro.muro - 0.01, 'la piu\' avanti in aria era a z ' + muro.peggiore.toFixed(2));

    const viaggio = await page.evaluate(() => {
      const D = DOZER;
      const nate = [];
      for (let i = 0; i < 8; i++) nate.push(D.lanciaLira(-3 + i * 0.8));
      const partenza = Math.max(...nate.map(m => m.mesh.position.z));
      for (let f = 0; f < 60 * 25; f++) { D.aggiornaFisica(1/60); D.riciclaEccesso(); }
      const vive = nate.filter(m => m.attiva);
      return { partenza,
        arrivo: vive.length ? Math.max(...vive.map(m => m.mesh.position.z)) : -99,
        sulTavolo: vive.filter(m => m.mesh.position.y < DOZER.ALTEZZA_PIASTRA - 0.05).length,
        vive: vive.length };
    });
    T('il ripiano porta le lire avanti e poi le lascia cadere sul campo',
      viaggio.arrivo < viaggio.partenza - 1.2,
      'da z ' + viaggio.partenza.toFixed(1) + ' a z ' + viaggio.arrivo.toFixed(1));
    T('finiscono sul tavolo, non restano incastrate sul ripiano',
      viaggio.sulTavolo === viaggio.vive, viaggio.sulTavolo + '/' + viaggio.vive);

    const dietro = await page.evaluate(() =>
      DOZER.lire.filter(m => m.attiva && m.mesh.position.z > DOZER.Z_LANCIO + 0.6 &&
        m.mesh.position.y < DOZER.ALTEZZA_PIASTRA - 0.05).length);
    T('nessuna lira intrappolata dietro al ripiano', dietro === 0, dietro + ' bloccate');
  }

  // --- SETTE TAGLI, da L.100 al MILIONE ---
  {
    const tagli = await page.evaluate(() => DOZER.TAGLI.map(t => ({ t: t.taglio, p: t.premio, r: t.r })));
    T('ci sono 7 tagli', tagli.length === 7, tagli.map(t => t.t).join(', '));
    T('i tagli sono 100, 500, 1000, 10K, 100K, 500K e 1 milione',
      JSON.stringify(tagli.map(t => t.t)) === JSON.stringify([100, 500, 1000, 10000, 100000, 500000, 1000000]));
    T('premio e grandezza crescono con il taglio',
      tagli.every((t, i) => i === 0 || (t.p > tagli[i-1].p && t.r > tagli[i-1].r)));
    T('si parte dal taglio piu\' basso',
      await page.evaluate(() => DOZER.stato.pot.taglio) === 0);
  }

  // --- METEORA (il cannone) ---
  {
    const met = await page.evaluate(async () => {
      const D = DOZER;
      D.stato.premi = 99999; D.stato.sbloccati.cannone = true; D.stato.cannonePronto = 0;
      D.stato.attivi.cannone = true; D.stato.attivi.raffica = false; D.aggiornaAbilita();
      const modoMira = D.modoAttuale();
      for (let f = 0; f < 90; f++) D.aggiornaFisica(1/60);
      const vive = D.lire.filter(m => m.attiva);
      const zPrima = vive.reduce((a, m) => a + m.mesh.position.z, 0) / vive.length;
      const lanciPrima = D.stato.totLanci;
      D.lanciaMeteora(0, -2.5, 1);
      const dopoLancio = { pronta: D.meteoraPronta(), acceso: D.stato.attivi.cannone, manca: D.meteoraMancano() };
      for (let f = 0; f < 60 * 4; f++) { D.aggiornaFisica(1/60); D.aggiornaMeteore(1/60); }
      const vive2 = D.lire.filter(m => m.attiva);
      const zDopo = vive2.reduce((a, m) => a + m.mesh.position.z, 0) / vive2.length;
      const inVolo = D.meteoreVolo.length;
      D.lanciaMeteora(0, -2.5, 1);
      return { modoMira, zPrima, zDopo, ...dopoLancio, rifiutata: D.meteoreVolo.length === inVolo,
        lireLanciate: D.stato.totLanci - lanciPrima, ricaricaMax: D.ricaricaMeteora(0) };
    });
    T('col cannone acceso si mira liberamente', met.modoMira.indexOf('METEORA') === 0, met.modoMira);
    T('la meteora spinge la pila verso il bordo', met.zDopo < met.zPrima - 0.15,
      'z medio ' + met.zPrima.toFixed(2) + ' -> ' + met.zDopo.toFixed(2));
    T('la meteora non lancia nessuna lira', met.lireLanciate === 0, met.lireLanciate + ' lire');
    T('dopo il colpo il cannone si spegne da solo', met.acceso === false);
    T('la ricarica base e\' di 5 minuti', met.ricaricaMax === 300, met.ricaricaMax + ' s');
    T('mentre si ricarica la meteora non riparte', met.pronta === false && met.rifiutata,
      'mancano ' + met.manca + ' s');
  }

  // --- la spinta del ripiano arriva fino al bordo dei premi ---
  {
    const flusso = await page.evaluate(() => {
      const D = DOZER;
      const premi0 = D.stato.premi, vinte0 = D.stato.vinte;
      let acc = 0;
      for (let f = 0; f < 60 * 90; f++) {
        acc += 1.6 / 60;
        while (acc >= 1) { acc -= 1; D.lanciaLira(-3 + Math.random() * 6); }
        D.aggiornaFisica(1/60); D.riciclaEccesso();
      }
      const vive = D.lire.filter(m => m.attiva);
      return { vinte: D.stato.vinte - vinte0, premi: D.stato.premi - premi0,
        inScena: vive.length,
        davanti: vive.filter(m => m.mesh.position.z < -2.5).length,
        mezzo: vive.filter(m => m.mesh.position.z >= -2.5 && m.mesh.position.y < DOZER.ALTEZZA_PIASTRA - 0.05).length };
    });
    T('giocando normalmente le lire cadono davvero dal bordo', flusso.vinte > 60, flusso.vinte + ' vinte in 90 s');
    T('entra quanto esce: la pila non cresce all\'infinito', flusso.inScena < 190, flusso.inScena + ' in scena');
    T('il campo non resta vuoto in mezzo', flusso.mezzo >= 8, flusso.mezzo + ' lire fra ripiano e pila');
    T('la pila resta appoggiata al bordo dei premi', flusso.davanti >= 25, flusso.davanti + ' lire nella pila');
    const perLira = flusso.premi / Math.max(1, flusso.vinte);
    T('il guadagno per lira resta ragionevole', perLira >= 1.5 && perLira <= 5, perLira.toFixed(1) + ' premi/lira');
  }

  // --- modalità di partenza e spegnimento abilità ---
  const modo0 = await page.evaluate(() => DOZER.modoAttuale());
  T('si parte in TIRO SEMPLICE (cannone non ancora sbloccato)', modo0 === 'TIRO SEMPLICE', modo0);

  await page.evaluate(() => {
    DOZER.stato.premi = 999999; DOZER.stato.sbloccati.cannone = true;
    DOZER.stato.cannonePronto = 0;                     // meteora di nuovo carica
    DOZER.stato.attivi.cannone = true; DOZER.aggiornaAbilita(); DOZER.aggiornaHUD();
  });
  T('cannone acceso → modalità METEORA', (await page.evaluate(() => DOZER.modoAttuale())).indexOf('METEORA') === 0);
  await page.click('#ch-cannone');
  const modo1 = await page.evaluate(() => DOZER.modoAttuale());
  T('ricliccando il chip CANNONE si SPEGNE (tiro senza abilità)', modo1 === 'TIRO SEMPLICE', modo1);
  T('chip cannone in stato off', await page.locator('#ch-cannone').evaluate(e => e.classList.contains('off')));
  await page.click('#ch-cannone');
  T('e si riaccende cliccandolo di nuovo', (await page.evaluate(() => DOZER.modoAttuale())).indexOf('METEORA') === 0);

  await page.evaluate(() => { DOZER.stato.pot.raffica = 3; DOZER.aggiornaAbilita(); });
  await page.click('#ch-raffica');
  T('raffica accesa esclude il cannone', await page.evaluate(() => DOZER.modoAttuale()) === 'RAFFICA');
  T('cannone spento quando c\'è la raffica', await page.evaluate(() => DOZER.stato.attivi.cannone === false));
  await page.click('#ch-raffica');
  const modo2 = await page.evaluate(() => DOZER.modoAttuale());
  T('spegnendo la raffica NON si riaccende il cannone', modo2 === 'TIRO SEMPLICE', modo2);
  T('la pillola mostra la modalità', (await page.locator('#modoTxt').textContent()) === 'TIRO SEMPLICE');

  // --- il tavolo non si riempie mai ---
  // 40 secondi di raffica al massimo (10 lire/s) simulati a 60 passi al secondo
  const pieno = await page.evaluate(async () => {
    const res = { max: 0 };
    let acc = 0;
    for (let g = 0; g < 40 * 60; g++) {
      acc += 10 / 60;
      while (acc >= 1) { acc -= 1; const m = DOZER.creaLira(-2 + Math.random() * 4, 6, -4 + Math.random() * 6, { volo: true, taglio: 1 }); m.vy = -1; }
      DOZER.aggiornaFisica(1 / 60);
      DOZER.riciclaEccesso();
      res.max = Math.max(res.max, DOZER.lireSulTavolo());
    }
    return res;
  });
  T('40 s di raffica: le lire in scena restano sotto il tetto',
    pieno.max <= (await page.evaluate(() => DOZER.MAX_LIRE)) + 12, 'max ' + pieno.max);
  // caso estremo: 900 lire tutte insieme, il tetto deve comunque rientrare
  const estremo = await page.evaluate(() => {
    for (let i = 0; i < 900; i++) { const m = DOZER.creaLira(-3 + Math.random() * 6, 6 + Math.random() * 3, -4 + Math.random() * 7, { volo: true, taglio: 1 }); m.vy = -1; }
    for (let g = 0; g < 240; g++) { DOZER.aggiornaFisica(1 / 60); DOZER.riciclaEccesso(); }
    return DOZER.lireSulTavolo();
  });
  T('anche con 900 lire buttate dentro tutte insieme il tavolo rientra',
    estremo <= (await page.evaluate(() => DOZER.MAX_LIRE)) + 12, 'restano ' + estremo);
  T('il riciclo ha ritirato lire dal fondo', await page.evaluate(() => DOZER.stato.totRiciclate) > 0,
    'ritirate ' + await page.evaluate(() => DOZER.stato.totRiciclate));
  T('l\'elenco interno non accumula lire spente',
    await page.evaluate(() => DOZER.lire.length - DOZER.lireSulTavolo()) < 30);
  const sorgente = await page.content();
  T('la scritta "TAVOLO PIENO" non esiste più in tutta la pagina', !sorgente.includes('TAVOLO PIENO'));
  T('nessun rifiuto del lancio nel codice', !sorgente.includes('tavoloPieno'));

  // --- prestazioni ---
  const perf = await page.evaluate(async () => {
    const t0 = performance.now();
    for (let i = 0; i < 120; i++) DOZER.aggiornaFisica(1 / 60);
    return { ms: (performance.now() - t0) / 120, lire: DOZER.lireSulTavolo() };
  });
  T('un passo di fisica costa poco anche col tavolo carico', perf.ms < 9,
    perf.lire + ' lire · ' + perf.ms.toFixed(2) + ' ms/passo');

  // --- negozio ---
  await page.click('#apriNegozio');
  await page.waitForTimeout(250);
  T('negozio aperto', !(await page.locator('#negozio').evaluate(e => e.classList.contains('chiuso'))));
  T('barra saldo presente', await page.locator('.saldo-bar').count() === 1);
  T('righe del negozio disegnate', await page.locator('.voce').count() >= 6);
  T('icone dei potenziamenti', await page.locator('.voce .ico').count() >= 5);
  T('barre di livello', await page.locator('.prog').count() >= 4);

  for (const [tab, atteso] of [['sblocca', '.voce'], ['abilita', '.inter'], ['stat', '.riepilogo'], ['opz', '.seg button']]) {
    await page.click(`.tab button[data-tab="${tab}"]`);
    await page.waitForTimeout(140);
    T(`scheda ${tab} si apre`, await page.locator(atteso).count() > 0);
  }
  T('scheda OPZIONI: 5 gruppi di scelte', await page.locator('.seg').count() === 5);
  T('statistiche mostrano le lire ritirate', (await page.locator('.voci').textContent()).length > 0);

  // opzioni funzionanti
  await page.click('.seg button[data-opz="ombre"][data-val="0"]');
  await page.waitForTimeout(150);
  T('ombre spegnibili', await page.evaluate(() => DOZER.stato.grafica.ombre === false));
  await page.click('.seg button[data-opz="fps"][data-val="1"]');
  await page.waitForTimeout(150);
  T('contafotogrammi visibile', await page.locator('#boxFps').isVisible());
  await page.click('.seg button[data-opz="effetti"][data-val="0.5"]');
  await page.waitForTimeout(150);
  T('effetti su RIDOTTI', await page.evaluate(() => DOZER.stato.grafica.effetti === 0.5));
  await page.click('.seg button[data-opz="audio"][data-val="0"]');
  await page.waitForTimeout(150);
  T('audio spegnibile dalle opzioni', await page.evaluate(() => DOZER.stato.audio === false));

  await page.click('#chiudiNegozio');
  T('negozio chiuso', await page.locator('#negozio').evaluate(e => e.classList.contains('chiuso')));

  // --- salvataggio ---
  const sv = await page.evaluate(() => localStorage.getItem('daprod_dozer_v2'));
  T('salvataggio scritto con le opzioni', !!sv && JSON.parse(sv).grafica.ombre === false);

  T('nessun errore dopo tutte le prove', errori.length === 0, errori.join(' | '));
  await ctx.close();
}

// ============================================================ TELEFONO
console.log('\n== TELEFONO (portrait, touch) ==');
{
  const { ctx, page, errori } = await nuovaPagina({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  await page.waitForTimeout(900);
  T('parte senza errori', errori.length === 0, errori.join(' | '));
  T('ombre spente di serie su telefono', await page.evaluate(() => DOZER.stato.grafica.ombre === false));
  T('tetto lire ridotto su telefono', await page.evaluate(() => DOZER.MAX_LIRE) === 170);
  T('anche su telefono si mira solo in orizzontale (senza cannone)',
    await page.evaluate(() => Math.abs(DOZER.lanciaLira(99).mesh.position.z - DOZER.Z_LANCIO) < 0.3));
  const chip = await page.locator('#ch-raffica').boundingBox();
  T('chip abilità abbastanza grandi da toccare', chip && chip.height >= 30, chip ? Math.round(chip.height) + 'px' : 'n/d');
  const neg = await page.locator('#apriNegozio').boundingBox();
  T('pulsante negozio raggiungibile', neg && neg.y + neg.height <= 844);
  T('chip e negozio non si sovrappongono', chip && neg && chip.x + chip.width <= neg.x + 1,
    'chip fino a ' + Math.round(chip.x + chip.width) + ', negozio da ' + Math.round(neg.x));
  await page.tap('#apriNegozio');
  await page.waitForTimeout(300);
  T('negozio si apre col tocco', !(await page.locator('#negozio').evaluate(e => e.classList.contains('chiuso'))));
  const tabBox = await page.locator('.tab').boundingBox();
  T('barra schede dentro lo schermo', tabBox && tabBox.width <= 390);
  await page.tap('.tab button[data-tab="opz"]');
  await page.waitForTimeout(250);
  T('scheda opzioni sul telefono', await page.locator('.seg button').count() >= 9);
  const segBtn = await page.locator('.seg button').first().boundingBox();
  T('pulsanti opzioni comodi col pollice', segBtn && segBtn.height >= 34, segBtn ? Math.round(segBtn.height) + 'px' : 'n/d');
  const larghezzaVoci = await page.locator('.voci').evaluate(e => e.scrollWidth - e.clientWidth);
  T('niente scorrimento orizzontale nel negozio', larghezzaVoci <= 2, 'extra ' + larghezzaVoci + 'px');
  T('nessun errore su telefono', errori.length === 0, errori.join(' | '));
  await ctx.close();
}

// ============================================================ RAFFICA (equilibrio)
console.log('\n== RAFFICA TENUTA PREMUTA ==');
  // --- raffica: niente pioggia di premi fuori scala ---
{
  const { ctx: c2, page: p2, errori: e2 } = await nuovaPagina({ viewport: { width: 1280, height: 800 } });
  await p2.waitForTimeout(1200);
  await p2.evaluate(() => {
    const st = DOZER.stato;
    st.pot.raffica = 6; st.pot.multi = 4; st.pot.idle = 15; st.pot.forza = 8;
    st.attivi.raffica = true; st.attivi.cannone = false; st.audio = false;
    st.gettoni = 76; st.premi = 0; st.vinte = 0;
    DOZER.aggiornaAbilita();
  });
  await p2.mouse.move(640, 430);
  await p2.waitForTimeout(200);
  await p2.mouse.down();
  // guardo la combo mentre gioca: deve ricadere a ogni corsa del ripiano
  const serie = [];
  for (let i = 0; i < 60; i++) {
    await p2.waitForTimeout(250);
    serie.push(await p2.evaluate(() => DOZER.comboOra()));
  }
  await p2.mouse.up();
  let azzeramenti = 0;
  for (let i = 1; i < serie.length; i++) if (serie[i] < serie[i - 1]) azzeramenti++;
  const r = await p2.evaluate(() => ({ premi: Math.floor(DOZER.stato.premi), vinte: DOZER.stato.vinte, lire: DOZER.lireSulTavolo(), comboMax: DOZER.stato.comboMax }));
  const perLira = r.vinte ? r.premi / r.vinte : 0;
  T('tenendo premuta la raffica si vince davvero qualcosa', r.vinte > 5, r.vinte + ' lire vinte');
  // il bonus combo si ferma a +5, il resto viene dalle torri
  T('il guadagno per lira resta nel tetto (combo limitata)', perLira <= 9, perLira.toFixed(1) + ' premi/lira');
  // se non si azzerasse mai, la combo salirebbe e basta: qui deve ricadere piu' volte
  T('la combo si azzera a ogni corsa del ripiano', azzeramenti >= 2,
    azzeramenti + ' ricadute in 15 s · combo max x' + r.comboMax);
  T('il tavolo non straborda sotto raffica', r.lire <= 312, r.lire + ' lire in scena');
  T('nessun errore durante la raffica', e2.length === 0, e2.join(' | '));
  await c2.close();
  }


// ============================================================ CARTE SPECIALI
console.log('\n== CARTE SPECIALI ==');
{
  const { ctx: c3, page: p3, errori: e3 } = await nuovaPagina({ viewport: { width: 1280, height: 800 } });
  await p3.waitForTimeout(900);
  const carte = await p3.evaluate(() => {
    const D = DOZER;
    D.stato.audio = false;
    // il tavolo di partenza non serve: lo tolgo di mezzo prima di misurare
    for (const m of D.lire) m.attiva = false;
    for (let f = 0; f < 4; f++) D.aggiornaFisica(1/60);
    const prima = D.stato.carte || 0;
    const premiPrima = D.stato.premi;
    let creato = 0;
    for (let i = 0; i < 12; i++) {
      if (D.carteSulTavolo() >= D.CARTE_MAX_TAVOLO) continue;
      D.creaCarta(-2 + (i % 5) * 1, D.Z_LANCIO); creato++;
    }
    const suTavolo = D.carteSulTavolo();
    for (const m of D.lire) if (m.attiva && m.carta !== undefined) { m.mesh.position.set(m.mesh.position.x, 0.2, -4.9); m.vz = -7; }
    for (let f = 0; f < 120; f++) D.aggiornaFisica(1/60);
    return { creato, suTavolo, raccolte: (D.stato.carte || 0) - prima,
      premiCambiati: Math.abs(D.stato.premi - premiPrima) > 0.5,
      tipi: Object.keys(D.stato.carteTipi || {}).length,
      max: D.CARTE_MAX_TAVOLO, quante: D.CARTE.length };
  });
  T('esistono piu\' tipi di carta', carte.quante >= 4, carte.quante + ' tipi');
  T('sul tavolo non ci sono mai piu\' di 5 carte insieme', carte.suTavolo <= carte.max && carte.max === 5, carte.suTavolo + ' carte');
  T('oltre il tetto non ne nascono altre', carte.creato === carte.max, carte.creato + ' create su 12 tentativi');
  T('le carte che cadono dal bordo finiscono in collezione', carte.raccolte > 0, carte.raccolte + ' raccolte');
  T('le carte NON pagano premi', !carte.premiCambiati);
  T('la collezione tiene il conto per tipo', carte.tipi > 0, carte.tipi + ' tipi diversi');
  T('nessun errore con le carte', e3.length === 0, e3.join(' | '));
  await c3.close();
}

// ============================================================ SALVATAGGIO VECCHIO
console.log('\n== SALVATAGGIO DI UNA VERSIONE VECCHIA ==');
{
  const vecchio = JSON.stringify({
    premi: 4321, gettoni: 9, vinte: 12, totVinte: 40, totLanci: 90, totTorri: 3, comboMax: 7,
    pot: { idle: 4, forza: 3, multi: 2, cannonePot: 1, raffica: 2, taglio: 9 },
    attivi: { cannone: true, raffica: true, forza: true, multi: true, idle: true, torri: true },
    audio: true, torreRecord: 'boh', sbloccati: { cannone: true, feltro: 'rubino' },
    feltriPosseduti: ['verde', 'blu'], skin: 'oro'
  });
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 1280, height: 800 } }, vecchio);
  await page.waitForTimeout(900);
  T('il gioco parte con un salvataggio vecchio', errori.length === 0, errori.join(' | '));
  T('nessun avviso rosso', await page.locator('#erroreGioco').count() === 0);
  T('taglio riportato nei limiti', await page.evaluate(() => DOZER.stato.pot.taglio) <= 6);
  T('record torre sanificato', await page.evaluate(() => DOZER.stato.torreRecord) >= 1);
  T('cannone e raffica non entrambi accesi', await page.evaluate(() => !(DOZER.stato.attivi.cannone && DOZER.stato.attivi.raffica)));
  T('opzioni grafiche create se mancanti', await page.evaluate(() => typeof DOZER.stato.grafica.effetti === 'number'));
  T('premi conservati', await page.evaluate(() => DOZER.stato.premi) >= 4321);
  await ctx.close();
}

console.log(`\n==== ${ok} OK · ${ko} KO ====`);
await browser.close();
server.close();
process.exit(ko ? 1 : 0);
