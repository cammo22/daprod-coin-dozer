// Controlli automatici di DaProd Coin Dozer 2.
//
//   npm i --no-save playwright three@0.160.0 && node test/prove.mjs
//
// Apre il gioco in un browser vero (Chromium headless) su computer, su telefono e con salvataggi
// vecchi o rovinati, e verifica: avvio senza errori, scelta della moneta all'inizio, tre piani a
// cascata con i loro spintori, nessuna moneta incastrata in alto, fusioni (anche a catena), vasca,
// buchi della casa, slot DaProd, scossa, negozio senza "taglio di lancio" e "forza di lancio",
// tavolo che non si riempie mai e salvataggio.
// Se three.js e' installato in locale (node_modules) viene servito da li', addon compresi.
import { chromium } from 'playwright';
import { avviaServer } from './servi.mjs';

const { server, url } = await avviaServer(Number(process.env.PORT) || undefined);

let ok = 0, ko = 0;
const T = (nome, cond, extra = '') => {
  if (cond) { ok++; console.log('  ✔', nome, extra); }
  else { ko++; console.log('  ✘', nome, extra); }
};

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });

async function nuovaPagina(opz = {}, salvataggi = null) {
  const ctx = await browser.newContext(opz);
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());   // i font non servono alle prove
  const page = await ctx.newPage();
  const errori = [];
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errori.push(m.text()); });
  page.on('pageerror', e => errori.push(String(e)));
  if (salvataggi) {
    await page.addInitScript(sv => {
      if (sessionStorage.getItem('provaCaricata')) return;
      sessionStorage.setItem('provaCaricata', '1');
      try { for (const k in sv) localStorage.setItem(k, sv[k]); } catch (e) {}
    }, salvataggi);
  }
  await page.goto(url, { waitUntil: 'commit' });
  await page.waitForFunction(() => !!window.DOZER, null, { timeout: 120000, polling: 250 });
  return { ctx, page, errori };
}

// ============================================================ COMPUTER
console.log('\n== COMPUTER ==');
{
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 1280, height: 800 } });
  await page.waitForTimeout(800);
  T('nessun errore in console', errori.length === 0, errori.join(' | '));
  T('un solo canvas', await page.locator('canvas').count() === 1);
  T('nessun avviso di errore a schermo', await page.locator('#erroreGioco').count() === 0);
  T('versione v2.0.2 nel marchio', (await page.locator('#versione').textContent()) === 'v2.0.2');
  T('logo DaProd nel HUD, nella schermata iniziale e nel negozio', await page.locator('svg.logoDP').count() >= 3);

  // --- ALL'INIZIO SI SCEGLIE LA MONETA ---
  T('schermata iniziale visibile', await page.locator('#intro').isVisible());
  const scelte = await page.locator('#sceltaMonete .mon').count();
  T('nella schermata iniziale si sceglie la moneta', scelte >= 2, scelte + ' monete');
  await page.locator('#sceltaMonete .mon[data-t="1"]').click();
  T('scelta la L.100 dalla schermata iniziale', await page.evaluate(() => DOZER.stato.sel) === 1);
  T('una moneta bloccata non si sceglie senza saldo', await page.evaluate(() => { DOZER.stato.saldo = 10; return DOZER.sbloccaTaglio(2); }) === false);
  await page.evaluate(() => { DOZER.stato.saldo = 5000; });
  await page.locator('#giocaBtn').click();
  await page.waitForTimeout(700);
  T('GIOCA chiude la schermata iniziale', await page.evaluate(() => DOZER.inGioco()) && await page.locator('#intro.via').count() === 1);
  T('la barra delle monete mostra i tagli lanciabili', await page.locator('#monete .mon').count() === await page.evaluate(() => DOZER.MAX_LANCIO + 1));
  T('la moneta scelta è evidenziata', await page.locator('#monete .mon.sel').getAttribute('data-t') === '1');
  await page.locator('#monete .mon[data-t="0"]').click();
  T('dalla barra si cambia moneta', await page.evaluate(() => DOZER.stato.sel) === 0);

  // --- TRE PIANI A CASCATA ---
  const g = await page.evaluate(() => ({ L: DOZER.LIV.map(l => [l.y, l.zEdge]), S: DOZER.SPINTORI.map(p => [p.fMin, p.fMax, p.scr, p.pav, p.top]) }));
  T('tre piani, ognuno più in basso e più avanti del precedente',
    g.L.length === 3 && g.L[0][0] > g.L[1][0] && g.L[1][0] > g.L[2][0] && g.L[0][1] < g.L[1][1] && g.L[1][1] < g.L[2][1], JSON.stringify(g.L));
  T('tre spintori, quelli sotto escono da sotto il piano sopra',
    g.S.length === 3 && g.S.slice(1).every((s, i) => s[0] < g.L[i][1] && s[1] > g.L[i][1]), JSON.stringify(g.S));
  const mov = await page.evaluate(() => { const a = DOZER.SPINTORI.map(p => p.z); DOZER.simula(0.8); return DOZER.SPINTORI.map((p, i) => Math.abs(p.z - a[i])); });
  T('gli spintori si muovono', mov.every(d => d > 0.05), mov.map(d => d.toFixed(2)).join(' '));
  const pila = await page.evaluate(() => { const m = DOZER.monete(); return [m.filter(c => c.y > 1.5 && c.y < 3 && c.z < -1.2).length, m.filter(c => c.y < 1.2 && c.z > -1.2).length]; });
  T('pila iniziale sui piani 2 e 3', pila[0] > 35 && pila[1] > 50, pila.join(' / '));

  // --- IL PIANO 1 HA IL SUO TAPPETO, MA SCORRE: NIENTE MONETE INCASTRATE ---
  const flusso = await page.evaluate(() => {
    const D = DOZER; D.stato.saldo = 1e6; D.stato.sel = 0;
    const suP1 = (c) => c.vivo && !c.fuori && c.y > D.LIV[0].y - 0.1 && c.z < D.LIV[0].zEdge;
    const inizio = D.monete().filter(suP1).length;
    const lanciate = [];
    for (let i = 0; i < 60; i++) { lanciate.push(D.lanciaMoneta(-3.6 + (i % 10) * 0.8, i % 2)); D.simula(0.5); }
    const z = D.Z_LANCIO, primo = lanciate.slice(-3).every(c => !c.vivo || Math.abs(c.z - z) < 1.2 || c.z > z);
    const vecchie = lanciate.slice(0, 45), uscite = vecchie.filter(c => !suP1(c)).length;
    return { inizio, fine: D.monete().filter(suP1).length, uscite, su: vecchie.length, primo, dietro: z < D.SPINTORI[0].fMax };
  });
  T('la moneta cade in fondo al piano 1, dietro alla corsa del primo spintore', flusso.primo && flusso.dietro);
  // ogni moneta lanciata si posa la prima volta sul piano 1 (panno o sopra lo spintore 1), sotto
  // all'anello di mira: non deve scavalcarlo cadendo direttamente sul piano 2 (il vecchio errore la
  // spostava di 3,5). Se cade accanto alla faccia dello spintore che avanza, può esserne spinta di
  // qualche decimo: si tollera al massimo un diametro di moneta.
  const atterraggi = await page.evaluate(() => {
    const D = DOZER; D.stato.saldo = 1e6; const r = [];
    for (let i = 0; i < 16; i++) {
      const c = D.lanciaMoneta(-3.5 + (i % 8) * 1, i % 2);
      for (let k = 0; k < 240 && c.vivo && !c.terra; k++) D.passo(1 / 120);
      if (c.vivo) r.push({ y: +c.y.toFixed(2), dz: +(c.z - D.Z_LANCIO).toFixed(2) });
      D.simula(0.37);
    }
    return r;
  });
  T('ogni moneta lanciata si posa sul piano 1, sotto l\'anello di mira',
    atterraggi.length >= 12 && atterraggi.every(a => a.y >= 3.19 && Math.abs(a.dz) < 0.9), JSON.stringify(atterraggi));
  T('sul piano 1 c\'è un tappeto di monete', flusso.inizio >= 15, flusso.inizio + ' monete');
  T('il tappeto del piano 1 scorre: le monete lanciate scendono al piano 2', flusso.uscite >= flusso.su * 0.8 && flusso.fine <= flusso.inizio + 15, JSON.stringify(flusso));

  // --- COSTI ---
  const costo = await page.evaluate(() => {
    const D = DOZER; D.gioca(); D.stato.saldo = 1000; D.stato.sel = 1; D.colonna(0);
    const n = D.lanciaDalGiocatore(); return { n, saldo: D.stato.saldo };
  });
  T('lanciare costa il valore della moneta', costo.n === 1 && costo.saldo === 900, JSON.stringify(costo));
  const secco = await page.evaluate(() => { const D = DOZER; D.stato.saldo = 40; D.stato.sel = 0; return D.lanciaDalGiocatore(); });
  T('senza saldo non si lancia', secco === 0);
  T('un taglio bloccato non si lancia', await page.evaluate(() => { const D = DOZER; D.stato.saldo = 1e6; return D.scegliMoneta(5); }) === false);

  // --- FUSIONI ---
  const fus = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(1, 0, 0, 3); a.terra = true;
    D.nuovaMoneta(1, 0.05, 0.6, 3.02);
    D.simula(1.5);
    return D.monete().map(c => c.t).sort().join(',');
  });
  T('due L.100 una sopra l\'altra diventano una L.200', fus === '2', fus);
  const catena = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(2, 0, 0, 3); a.terra = true;
    const b = D.nuovaMoneta(0, 0, a.h + 0.001, 3); b.terra = true;   // pila da due diversi: nessuna fusione
    D.simula(0.5);
    const prima = D.monete().length;
    const f0 = D.stato.st.fusioni;
    const c = D.nuovaMoneta(0, 0.03, 1.4, 3.02);
    D.simula(2.5);
    return { prima, dopo: D.monete().map(c => c.t).sort().join(','), fusioni: D.stato.st.fusioni - f0 };
  });
  T('monete diverse una sopra l\'altra restano due', catena.prima === 2);
  T('L.50 su L.50 sopra una L.200: diventa L.100 e resta sopra la L.200', catena.fusioni === 1 && catena.dopo === '1,2', JSON.stringify(catena));
  const catena2 = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(2, 0, 0, 3); a.terra = true;
    const b = D.nuovaMoneta(1, 0, a.h + 0.001, 3); b.terra = true;
    D.simula(0.3);
    const f0 = D.stato.st.fusioni;
    D.nuovaMoneta(1, 0.02, 1.4, 3.01);
    D.simula(3);
    return { tagli: D.monete().map(c => c.t).sort().join(','), fusioni: D.stato.st.fusioni - f0 };
  });
  T('fusione a catena: L.100 su L.100 → L.200 che si posa sulla L.200 → L.500', catena2.tagli === '3' && catena2.fusioni === 2, JSON.stringify(catena2));
  const storte = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.pot.fusione = 0;
    const a = D.nuovaMoneta(1, 0, 0, 3); a.terra = true;
    D.nuovaMoneta(1, a.r * 0.75, 0.6, 3);
    D.simula(1);
    const base = D.monete().length;
    D.pulisci(); D.stato.pot.fusione = 4;
    const b = D.nuovaMoneta(1, 0, 0, 3); b.terra = true;
    D.nuovaMoneta(1, b.r * 0.75, 0.6, 3);
    D.simula(1);
    const magnete = D.monete().length; D.stato.pot.fusione = 0;
    return { base, magnete };
  });
  T('una moneta molto storta non si fonde, con FUSIONE MAGNETICA al massimo sì', storte.base === 2 && storte.magnete === 1, JSON.stringify(storte));
  const ultimo = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(10, 0, 0, 3); a.terra = true; D.nuovaMoneta(10, 0, 0.8, 3); D.simula(1);
    return D.monete().length;
  });
  T('il Diamante da un milione è l\'ultimo taglio: non si fonde più', ultimo === 2);
  const sblocco = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.maxLancio = 1; D.stato.record = 1;
    const a = D.nuovaMoneta(3, 0, 0, 3); a.terra = true; D.nuovaMoneta(3, 0, 0.6, 3); D.simula(1.5);
    return { max: D.stato.maxLancio, record: D.stato.record, bottoni: document.querySelectorAll('#monete .mon.bloccata').length };
  });
  T('creare la L.1.000 sblocca il lancio della L.200', sblocco.max === 2 && sblocco.record === 4, JSON.stringify(sblocco));
  T('la barra si aggiorna dopo lo sblocco', sblocco.bottoni === await page.evaluate(() => DOZER.MAX_LANCIO - 2));
  const compraTaglio = await page.evaluate(() => { const D = DOZER; D.stato.saldo = 20000; const r = D.sbloccaTaglio(3); return { r, saldo: D.stato.saldo, max: D.stato.maxLancio, sel: D.stato.sel }; });
  T('sbloccare la L.500 a pagamento', compraTaglio.r && compraTaglio.saldo === 5000 && compraTaglio.max === 3 && compraTaglio.sel === 3, JSON.stringify(compraTaglio));

  // --- VASCA E CASA ---
  const vasca = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.saldo = 0; D.stato.pot.vasca = 0;
    const v0 = D.stato.st.vinte;
    const c = D.nuovaMoneta(3, 0, 0, D.LIV[2].zEdge + 0.1); c.vz = 0.5;
    D.simula(1.2);
    return { saldo: D.stato.saldo, vinte: D.stato.st.vinte - v0 };
  });
  T('una L.500 che cade nella vasca paga L.500', vasca.saldo === 500 && vasca.vinte === 1, JSON.stringify(vasca));
  const casa = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.saldo = 0; D.stato.pot.sponde = 0;
    const p0 = D.stato.st.perse;
    const c = D.nuovaMoneta(1, D.HW - 0.1, 0, D.LIV[2].zEdge - 0.4); c.vx = 3;
    D.simula(1.2);
    return { saldo: D.stato.saldo, perse: D.stato.st.perse - p0 };
  });
  T('una moneta spinta nel buco laterale va alla casa e non paga', casa.saldo === 0 && casa.perse === 1, JSON.stringify(casa));
  const sponde = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.pot.sponde = 3; D.stato.saldo = 0;
    const c = D.nuovaMoneta(1, D.HW - 0.5, 0, D.LIV[2].zEdge - 0.4); c.terra = true; c.vx = 3;
    D.simula(1);
    const r = { inizio: D.inizioBuchi(), x: c.x, viva: c.vivo && !c.fuori }; D.stato.pot.sponde = 0; return r;
  });
  T('con le sponde al massimo i buchi sono chiusi', sponde.viva && sponde.inizio >= 5.59, JSON.stringify(sponde));

  // --- SLOT DaProd ---
  const slot = await page.evaluate(async () => {
    const D = DOZER; D.pulisci();
    const g = D.nuovaMoneta(D.CHIP, 0, 0, D.LIV[2].zEdge + 0.1); g.vz = 0.5;
    D.simula(1);
    const gira = D.slot.gira;
    return { gira, giri: D.stato.st.slot };
  });
  T('il gettone DaProd nella vasca fa girare lo slot', slot.gira && slot.giri >= 1, JSON.stringify(slot));
  // lo slot gira a tempo di fotogramma: la prova lo fa avanzare da sola, così non dipende dalla velocità del computer
  await page.evaluate(() => DOZER.finisciSlot());
  const jp = await page.evaluate(() => { const D = DOZER; D.stato.saldo = 0; D.avviaSlot([0, 0, 0]); return D.finisciSlot(); });
  const jpEsito = await page.evaluate(() => ({ saldo: DOZER.stato.saldo, coda: DOZER.pioggiaInCoda(), jackpot: DOZER.stato.st.jackpot }));
  T('tre loghi DaProd = JACKPOT: lire e pioggia di monete', jp && jpEsito.saldo > 0 && jpEsito.coda > 10, JSON.stringify(jpEsito));

  // --- SCOSSA ---
  const sc = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.scossaPronta = 0;
    for (let i = 0; i < 6; i++) { const c = D.nuovaMoneta(0, -2 + i * 0.9, 0, 3); c.terra = true; }
    D.simula(0.2);
    const r1 = D.scossa(); const inAria = D.monete().filter(c => !c.terra).length; const r2 = D.scossa();
    return { r1, r2, inAria };
  });
  T('la scossa fa saltare le monete', sc.r1 && sc.inAria === 6, JSON.stringify(sc));
  T('la scossa ha una ricarica', sc.r2 === false);

  // --- NEGOZIO: niente taglio di lancio né forza di lancio ---
  const pot = await page.evaluate(() => Object.entries(DOZER.POT).map(([k, P]) => k + ':' + P.nome));
  T('nessun potenziamento "taglio" o "forza"', !pot.some(k => /taglio|forza/i.test(k)), pot.join(', '));
  await page.evaluate(() => { DOZER.stato.saldo = 100000; });
  await page.locator('#negozioBtn').click();
  await page.waitForTimeout(400);
  T('il negozio si apre', await page.locator('#negozio:not(.chiuso)').count() === 1);
  const testo = await page.locator('#contenuto').innerText();
  T('il negozio non parla di forza né di taglio di lancio', !/forza|taglio di lancio/i.test(testo));
  await page.locator('[data-compra="multi"]').click();
  T('comprare MULTI-LANCIO', await page.evaluate(() => DOZER.stato.pot.multi) === 1 && await page.evaluate(() => DOZER.stato.saldo) === 91000);
  for (const s of ['monete', 'opz', 'stat', 'pot']) {
    await page.locator(`[data-scheda="${s}"]`).click();
    T('scheda ' + s + ' piena', (await page.locator('#contenuto').innerText()).length > 40);
  }
  await page.locator('[data-scheda="monete"]').click();
  T('la tabella delle fusioni ha tutti i tagli', await page.locator('.fus').count() === 10);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  T('Esc chiude il negozio', await page.locator('#negozio.chiuso').count() === 1);
  const multi = await page.evaluate(() => { const D = DOZER; D.pulisci(); D.stato.saldo = 1000; D.stato.sel = 0; D.colonna(0); const n = D.lanciaDalGiocatore(); D.stato.pot.multi = 0; return n; });
  T('MULTI-LANCIO 1 lancia due monete per tocco', multi === 2);

  // --- CLICK SUL TAVOLO ---
  await page.evaluate(() => { DOZER.pulisci(); DOZER.stato.saldo = 1000; DOZER.stato.sel = 0; });
  await page.mouse.click(640, 430);
  const click = await page.evaluate(() => ({ n: DOZER.tutte().length, saldo: DOZER.stato.saldo }));
  T('un click sul tavolo lancia la moneta scelta', click.n >= 1 && click.saldo === 950, JSON.stringify(click));

  // --- IL TAVOLO NON SI RIEMPIE MAI ---
  const pieno = await page.evaluate(() => {
    const D = DOZER; D.pilaIniziale(); D.stato.saldo = 1e9; let max = 0;
    for (let i = 0; i < 700; i++) { D.lanciaMoneta(-3.5 + Math.random() * 7, i % 3); if (i % 4 === 0) D.simula(1 / 30); max = Math.max(max, D.monete().length); }
    return max;
  });
  T('il tavolo non si riempie mai', pieno <= 381, pieno + ' monete al massimo');

  // --- VELOCITÀ DELLA FISICA ---
  const ms = await page.evaluate(() => { const D = DOZER; const t = performance.now(); D.simula(2); return (performance.now() - t) / 240; });
  T('un passo di fisica con il tavolo pieno costa poco', ms < 4, ms.toFixed(2) + ' ms a passo');

  // --- SALVATAGGIO ---
  const prima = await page.evaluate(() => { const D = DOZER; D.pilaIniziale(); D.simula(3); D.stato.saldo = 12345; D.salva(); return { saldo: 12345, monete: D.monete().length, max: D.stato.maxLancio }; });
  await page.reload({ waitUntil: 'commit' });
  await page.waitForFunction(() => !!window.DOZER, null, { timeout: 120000, polling: 250 });
  const dopo = await page.evaluate(() => ({ saldo: DOZER.stato.saldo, monete: DOZER.monete().length, max: DOZER.stato.maxLancio }));
  T('il salvataggio ricorda saldo e tagli sbloccati', dopo.saldo === prima.saldo && dopo.max === prima.max, JSON.stringify(dopo));
  T('il salvataggio ricorda le monete sul tavolo', Math.abs(dopo.monete - prima.monete) <= prima.monete * 0.1, prima.monete + ' → ' + dopo.monete);
  T('ancora nessun errore dopo tutte le prove', errori.length === 0, errori.join(' | '));
  await ctx.close();
}

// ============================================================ TELEFONO
console.log('\n== TELEFONO ==');
{
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 412, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2.625 });
  await page.waitForTimeout(800);
  // telefono ad alta densità: il canvas deve coprire esattamente lo schermo, non 2-3 volte tanto
  const cv = await page.locator('canvas').boundingBox();
  T('il canvas è grande quanto lo schermo anche ad alta densità', Math.abs(cv.width - 412) < 1 && Math.abs(cv.height - 800) < 1 && cv.x === 0 && cv.y === 0, JSON.stringify(cv));
  T('nessun errore in console (telefono)', errori.length === 0, errori.join(' | '));
  await page.locator('#sceltaMonete .mon[data-t="1"]').tap();
  T('al tocco si sceglie la moneta iniziale', await page.evaluate(() => DOZER.stato.sel) === 1);
  await page.locator('#giocaBtn').tap();
  await page.waitForTimeout(700);
  T('GIOCA al tocco', await page.evaluate(() => DOZER.inGioco()));
  const box = await page.locator('#monete').boundingBox();
  T('la barra delle monete sta nello schermo', box && box.x >= 0 && box.x + box.width <= 413 && box.y + box.height <= 801, JSON.stringify(box));
  const sc = await page.locator('#scossaBtn').boundingBox(), ng = await page.locator('#negozioBtn').boundingBox();
  const sovrapp = (a, b) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
  T('scossa e negozio non coprono la barra delle monete', !sovrapp(sc, box) && !sovrapp(ng, box));
  await page.locator('#monete .mon[data-t="0"]').tap();
  T('al tocco si cambia moneta', await page.evaluate(() => DOZER.stato.sel) === 0);
  await page.evaluate(() => { DOZER.pulisci(); DOZER.stato.saldo = 1000; });
  await page.touchscreen.tap(206, 400);
  T('un tocco sul tavolo lancia', await page.evaluate(() => DOZER.stato.saldo) === 950);
  await page.locator('#negozioBtn').tap();
  await page.waitForTimeout(400);
  T('il negozio si apre al tocco', await page.locator('#negozio:not(.chiuso)').count() === 1);
  await page.locator('#chiudi').tap();
  await page.waitForTimeout(300);
  T('e si chiude al tocco', await page.locator('#negozio.chiuso').count() === 1);
  T('meno monete su telefono', await page.evaluate(() => { const D = DOZER; D.pilaIniziale(); D.stato.saldo = 1e9; let m = 0; for (let i = 0; i < 500; i++) { D.lanciaMoneta(0, 0); m = Math.max(m, D.monete().length); } return m; }) <= 261);
  T('nessun errore alla fine (telefono)', errori.length === 0, errori.join(' | '));
  await ctx.close();
}

// ============================================================ SALVATAGGI VECCHI O ROVINATI
console.log('\n== SALVATAGGI ==');
{
  const vecchio = JSON.stringify({ premi: 500, gettoni: 12, pot: { taglio: 3, forza: 2 }, audio: false });
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 1000, height: 700 } }, { daprod_dozer_v2: vecchio });
  await page.waitForTimeout(500);
  T('salvataggio 1.x: parte senza errori', errori.length === 0, errori.join(' | '));
  const s = await page.evaluate(() => ({ saldo: DOZER.stato.saldo, audio: DOZER.stato.opz.audio, pot: Object.keys(DOZER.stato.pot) }));
  T('salvataggio 1.x: i vecchi premi diventano lire', s.saldo === 15000, JSON.stringify(s));
  T('salvataggio 1.x: spariscono taglio e forza', !s.pot.includes('taglio') && !s.pot.includes('forza') && s.audio === false);
  await ctx.close();
}
{
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 1000, height: 700 } },
    { daprod_dozer_v3: JSON.stringify({ saldo: 'tanti', maxLancio: 99, sel: -4, pot: { multi: 77 }, tavolo: [1, 2, 'x'] }) });
  await page.waitForTimeout(500);
  const s = await page.evaluate(() => ({ saldo: DOZER.stato.saldo, max: DOZER.stato.maxLancio, sel: DOZER.stato.sel, multi: DOZER.stato.pot.multi, monete: DOZER.monete().length }));
  T('salvataggio rovinato: valori rimessi a posto', s.saldo === 5000 && s.max === 7 && s.sel === 0 && s.multi === 3 && s.monete > 80, JSON.stringify(s));
  T('salvataggio rovinato: nessun errore', errori.length === 0, errori.join(' | '));
  await ctx.close();
}
{
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 1000, height: 700 } }, { daprod_dozer_v3: '{non è json' });
  await page.waitForTimeout(500);
  T('salvataggio illeggibile: si riparte puliti', errori.length === 0 && await page.evaluate(() => DOZER.stato.saldo) === 5000);
  await ctx.close();
}

await browser.close();
server.close();
console.log(`\n${ok} OK, ${ko} KO`);
process.exit(ko ? 1 : 0);
