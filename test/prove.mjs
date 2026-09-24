// Controlli automatici di DaProd Coin Dozer 2.
//
//   npm i --no-save playwright three@0.160.0 && node test/prove.mjs
//
// Apre il gioco in un browser vero (Chromium headless) su computer, su telefono e con salvataggi
// vecchi o rovinati, e verifica: avvio senza errori, scelta della moneta all'inizio, tre piani a
// cascata con i loro spintori, nessuna moneta incastrata in alto, pile e fusioni (anche a catena), vasca,
// buchi della casa, slot DaProd, eventi con la camera sullo slot, abilità (scossa, raffica, meteora,
// calamita, turbo, muro), valuta in euro, scritte spegnibili, tavolo che non si riempie mai e salvataggio.
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
  T('versione v2.2.1 nel marchio', (await page.locator('#versione').textContent()) === 'v2.2.1');
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
  const pila = await page.evaluate(() => { const m = DOZER.monete(), L = DOZER.LIV; return [m.filter(c => c.y > 1.5 && c.y < 3 && c.z < L[1].zEdge).length, m.filter(c => c.y < 1.2 && c.z > L[1].zEdge).length]; });
  T('pila iniziale sui piani 2 e 3', pila[0] > 50 && pila[1] > 70, pila.join(' / '));
  const prof = await page.evaluate(() => { const L = DOZER.LIV, S = DOZER.SPINTORI; return { z1: L[0].zEdge - S[0].fMin, z2: L[1].zEdge - L[0].zEdge, z3: L[2].zEdge - L[1].zEdge, corse: S.map(p => +(p.fMax - p.fMin).toFixed(2)), per: S.map(p => p.per) }; });
  T('zone profonde: almeno 4,8 / 6,5 / 8,5 di panno per piano', prof.z1 >= 4.8 && prof.z2 >= 6.5 && prof.z3 >= 8.5, JSON.stringify(prof));
  T('spintori calmi: corse corte, il giallo (piano 3) il più lento', prof.corse.every(c => c <= 1.4) && prof.per[2] >= 8 && prof.per[2] > prof.per[1] && prof.per[1] > prof.per[0], JSON.stringify(prof));
  T('il carrello lancia dall\'alto, in fondo al piano 1', await page.evaluate(() => { const c = DOZER.lanciaMoneta(0, 0, true); const r = c.y > 6.5 && c.z < DOZER.SPINTORI[0].fMax; c.vivo = false; return r; }));

  // --- IL PIANO 1 HA IL SUO TAPPETO, MA SCORRE: NIENTE MONETE INCASTRATE ---
  const flusso = await page.evaluate(() => {
    const D = DOZER; D.stato.saldo = 1e6; D.stato.sel = 0;
    const suP1 = (c) => c.vivo && !c.fuori && c.y > D.LIV[0].y - 0.1 && c.z < D.LIV[0].zEdge;
    const inizio = D.monete().filter(suP1).length;
    const lanciate = [];
    for (let i = 0; i < 60; i++) { lanciate.push(D.lanciaMoneta(-3.6 + (i % 10) * 0.8, i % 2)); D.simula(0.5); }
    D.simula(15);
    const z = D.Z_LANCIO, primo = lanciate.slice(-3).every(c => !c.vivo || Math.abs(c.z - z) < 1.2 || c.z > z);
    // il piano 1 è profondo: la moneta ci resta un po', ma le prime lanciate devono essere già scese
    const vecchie = lanciate.slice(0, 20), uscite = vecchie.filter(c => !c.vivo || !suP1(c)).length;
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
  T('il tappeto del piano 1 scorre: le monete lanciate scendono al piano 2', flusso.uscite >= flusso.su * 0.5 && flusso.fine <= flusso.inizio + 15, JSON.stringify(flusso));

  // --- COSTI ---
  const costo = await page.evaluate(() => {
    const D = DOZER; D.gioca(); D.stato.saldo = 1000; D.stato.sel = 1; D.colonna(0);
    const n = D.lanciaDalGiocatore(); return { n, saldo: D.stato.saldo };
  });
  T('lanciare costa il valore della moneta', costo.n === 1 && costo.saldo === 900, JSON.stringify(costo));
  const secco = await page.evaluate(() => { const D = DOZER; D.stato.saldo = 40; D.stato.sel = 0; return D.lanciaDalGiocatore(); });
  T('senza saldo non si lancia', secco === 0);
  T('un taglio bloccato non si lancia', await page.evaluate(() => { const D = DOZER; D.stato.saldo = 1e5; return D.scegliMoneta(4); }) === false);

  // --- TAGLI, PILE E FUSIONI ---
  const tagli = await page.evaluate(() => DOZER.TAGLI.map(T => T.v));
  T('i tagli sono quelli veri, fino al miliardo', JSON.stringify(tagli.slice(0, 9)) === JSON.stringify([50, 100, 1000, 5000, 50000, 100000, 250000, 500000, 1e6]) && tagli[tagli.length - 1] === 1e9, tagli.join(' '));
  const serve = await page.evaluate(() => DOZER.TAGLI.slice(0, 5).map(T => T.serve));
  T('per il taglio dopo servono 2 × L.50, 10 × L.100, 5 × L.1.000, 10 × L.5.000', JSON.stringify(serve) === '[2,10,5,10,2]', JSON.stringify(serve));
  const fus = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(0, 0, 0, 3); a.terra = true;
    D.nuovaMoneta(0, 0.05, 0.6, 3.02);
    D.simula(1.5);
    return D.monete().map(c => c.t).sort().join(',');
  });
  T('due L.50 una sopra l\'altra diventano una L.100', fus === '1', fus);
  const pila2 = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(1, 0, 0, 3); a.terra = true;
    D.nuovaMoneta(1, 0.05, 0.6, 3.02);
    D.simula(1.5);
    return D.monete().map(c => c.t + 'x' + c.n).join(',');
  });
  T('due L.100 fanno una pila da 2 (per la L.1.000 ne servono 10)', pila2 === '1x2', pila2);
  const dieci = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(1, 0, 0, 3, 9); a.terra = true;
    D.nuovaMoneta(1, 0.03, 2, 3.01);
    D.simula(2);
    return D.monete().map(c => c.t + 'x' + c.n).join(',');
  });
  T('la decima L.100 sulla pila da 9 fa una L.1.000', dieci === '2x1', dieci);
  const valore = await page.evaluate(() => { const D = DOZER; D.pulisci(); D.stato.saldo = 0; const c = D.nuovaMoneta(1, 0, 0, D.LIV[2].zEdge + 0.1, 3); c.vz = 0.5; D.simula(1.2); return D.stato.saldo; });
  T('una pila da 3 L.100 nella vasca paga L.300: le pile non creano soldi dal nulla', valore === 300, valore);
  const catena = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(0, 0, 0, 3); a.terra = true;
    const b = D.nuovaMoneta(2, 0, a.h + 0.001, 3); b.terra = true;   // pila da due diversi: nessuna fusione
    D.simula(0.5);
    return D.monete().length;
  });
  T('monete diverse una sopra l\'altra restano due', catena === 2);
  const catena2 = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(2, 0, 0, 3, 4); a.terra = true;
    const b = D.nuovaMoneta(1, 0, a.h + 0.001, 3, 9); b.terra = true;
    D.simula(0.3);
    const f0 = D.stato.st.fusioni;
    D.nuovaMoneta(1, 0.02, 2.4, 3.01);
    D.simula(3);
    return { tagli: D.monete().map(c => c.t + 'x' + c.n).sort().join(','), fusioni: D.stato.st.fusioni - f0 };
  });
  T('catena: la L.1.000 nata dalla pila di L.100 ricade sulla pila di 4 L.1.000 → L.5.000', catena2.tagli === '3x1' && catena2.fusioni === 2, JSON.stringify(catena2));
  const storte = await page.evaluate(() => {
    const D = DOZER; D.pulisci();
    const a = D.nuovaMoneta(0, 0, 0, 3); a.terra = true;
    D.nuovaMoneta(0, a.r * 0.75, 0.6, 3);
    D.simula(1);
    const base = D.monete().length;
    D.pulisci(); D.stato.pot.calamita = 1; D.stato.pronta.calamita = 0; D.usaAbilita('calamita');
    const b = D.nuovaMoneta(0, 0, 0, 3); b.terra = true;
    D.nuovaMoneta(0, b.r * 0.75, 0.6, 3);
    D.simula(1);
    const magnete = D.monete().length;
    return { base, magnete };
  });
  T('una moneta molto storta non si impila, con la CALAMITA sì', storte.base === 2 && storte.magnete === 1, JSON.stringify(storte));
  const attira = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.pronta.calamita = 0; D.usaAbilita('calamita');
    for (let i = 0; i < 4; i++) { const c = D.nuovaMoneta(1, -0.6 + i * 0.4, 0, 3); c.terra = true; }
    D.simula(2);
    const r = D.monete().map(c => c.n).sort().join(','); D.simula(20); return r;
  });
  T('con la CALAMITA le L.100 che si toccano si impilano da sole', attira.split(',').length < 4, attira);
  const ultimo = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); const U = D.TAGLI.length - 1;
    const a = D.nuovaMoneta(U, 0, 0, 3); a.terra = true; D.nuovaMoneta(U, 0, 0.8, 3); D.simula(1);
    return D.monete().length;
  });
  T('il Diamante da un miliardo è l\'ultimo taglio: non si impila più', ultimo === 2);
  const sblocco = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.maxLancio = 1; D.stato.record = 1;
    const a = D.nuovaMoneta(3, 0, 0, 3, 9); a.terra = true; D.nuovaMoneta(3, 0, 2.6, 3); D.simula(1.5);
    return { max: D.stato.maxLancio, record: D.stato.record, bottoni: document.querySelectorAll('#monete .mon.bloccata').length };
  });
  T('creare la L.50.000 sblocca il lancio della L.1.000', sblocco.max === 2 && sblocco.record === 4, JSON.stringify(sblocco));
  T('la barra si aggiorna dopo lo sblocco', sblocco.bottoni === await page.evaluate(() => DOZER.MAX_LANCIO - 2));
  const compraTaglio = await page.evaluate(() => { const D = DOZER; D.stato.saldo = 150000; const r = D.sbloccaTaglio(3); return { r, saldo: D.stato.saldo, max: D.stato.maxLancio, sel: D.stato.sel }; });
  T('sbloccare la L.5.000 a pagamento', compraTaglio.r && compraTaglio.saldo === 50000 && compraTaglio.max === 3 && compraTaglio.sel === 3, JSON.stringify(compraTaglio));
  await page.evaluate(() => { DOZER.stato.sel = 0; DOZER.scegliMoneta(0); });

  // --- VASCA E CASA ---
  const vasca = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.saldo = 0;
    const v0 = D.stato.st.vinte;
    const c = D.nuovaMoneta(2, 0, 0, D.LIV[2].zEdge + 0.1); c.vz = 0.5;
    D.simula(1.2);
    return { saldo: D.stato.saldo, vinte: D.stato.st.vinte - v0 };
  });
  T('una L.1.000 che cade nella vasca paga L.1.000', vasca.saldo === 1000 && vasca.vinte === 1, JSON.stringify(vasca));
  const casa = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.saldo = 0; D.simula(1);
    const p0 = D.stato.st.perse;
    const c = D.nuovaMoneta(1, D.HW - 0.1, 0, D.LIV[2].zEdge - 0.4); c.vx = 3;
    D.simula(1.2);
    return { saldo: D.stato.saldo, perse: D.stato.st.perse - p0 };
  });
  T('una moneta spinta nel buco laterale va alla casa e non paga', casa.saldo === 0 && casa.perse === 1, JSON.stringify(casa));
  const muro = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.saldo = 20000; D.stato.pot.muro = 0;
    const sblocca = D.usaAbilita('muro');
    D.stato.pronta.muro = 0; const usa = D.usaAbilita('muro');
    D.simula(0.6);
    const c = D.nuovaMoneta(1, D.HW - 0.5, 0, D.LIV[2].zEdge - 0.4); c.terra = true; c.vx = 3;
    D.simula(1);
    const r = { sblocca, usa, saldo: D.stato.saldo, inizio: D.inizioBuchi(), viva: c.vivo && !c.fuori, ancora: D.usaAbilita('muro') };
    D.simula(25); r.riaperti = D.inizioBuchi() < 5; return r;
  });
  T('MURO: si sblocca pagando e chiude i buchi della casa', muro.sblocca && muro.usa && muro.saldo === 10000 && muro.viva && muro.inizio >= 5.59, JSON.stringify(muro));
  T('MURO: ha una ricarica e poi i buchi si riaprono', muro.ancora === false && muro.riaperti, JSON.stringify(muro));

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
    const D = DOZER; D.pulisci(); D.stato.pronta.scossa = 0;
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
  await page.locator('[data-compra="raffica"]').click();
  T('sbloccare la RAFFICA dal negozio', await page.evaluate(() => DOZER.stato.pot.raffica) === 1 && await page.evaluate(() => DOZER.stato.saldo) === 98500);
  await page.locator('[data-compra="raffica"]').click();
  T('e salirla di livello', await page.evaluate(() => DOZER.stato.pot.raffica) === 2 && await page.evaluate(() => DOZER.stato.saldo) === 95500);
  for (const s of ['monete', 'opz', 'stat', 'pot']) {
    await page.locator(`[data-scheda="${s}"]`).click();
    T('scheda ' + s + ' piena', (await page.locator('#contenuto').innerText()).length > 40);
  }
  await page.locator('[data-scheda="monete"]').click();
  T('la tabella delle fusioni ha tutti i tagli', await page.locator('.fus').count() === await page.evaluate(() => DOZER.TAGLI.length - 1));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  T('Esc chiude il negozio', await page.locator('#negozio.chiuso').count() === 1);
  const vecchi = await page.evaluate(() => Object.keys(DOZER.ABIL).join(','));
  T('abilità nuove: scossa, raffica, meteora, calamita, turbo, muro', vecchi === 'scossa,raffica,meteora,calamita,turbo,muro', vecchi);

  // --- BARRA DELLE ABILITÀ ACCANTO ALLA SCOSSA ---
  await page.evaluate(() => { const D = DOZER; for (const k in D.stato.pot) D.stato.pot[k] = k === 'scossa' ? 1 : 0; D.stato.saldo = 0; D.aggiornaHUD(); });
  T('accanto alla scossa ci sono tutte le abilità', await page.locator('#abilita .ab').count() === 6 && await page.locator('#abilita #scossaBtn').count() === 1);
  T('quelle bloccate si vedono col lucchetto', await page.locator('#abilita .ab.bloccata').count() === 5);
  await page.evaluate(() => { DOZER.stato.saldo = 6000; DOZER.aggiornaHUD(); });
  T('quelle che puoi permetterti si illuminano', await page.locator('#abilita .ab.bloccata.puoi').count() === 3, await page.locator('#abilita .ab.puoi').count() + '');
  await page.locator('#ab_meteora').click();
  T('toccando un\'abilità bloccata la sblocchi', await page.evaluate(() => DOZER.stato.pot.meteora) === 1 && await page.evaluate(() => DOZER.stato.saldo) === 1000);
  const met = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.stato.pronta.meteora = 0;
    for (let i = 0; i < 8; i++) { const c = D.nuovaMoneta(0, -1 + (i % 4) * 0.8, 0, 1 + Math.floor(i / 4) * 0.8); c.terra = true; }
    D.simula(0.3);
    const prima = D.monete().map(c => [c.x, c.z]);
    const ok = D.meteoraSubito(0.2, 1.4);
    const inAria = D.monete().filter(c => !c.terra).length;
    D.simula(1.5);
    const spost = D.monete().reduce((a, c, i) => a + (prima[i] ? Math.hypot(c.x - prima[i][0], c.z - prima[i][1]) : 0), 0);
    return { ok, inAria, spost: +spost.toFixed(2), ancora: D.lanciaMeteora(0, 0) && false, pronta: D.stato.pronta.meteora > Date.now() };
  });
  T('la METEORA scaraventa le monete dove miri', met.ok && met.inAria >= 6 && met.spost > 2, JSON.stringify(met));
  T('e poi deve ricaricarsi', met.pronta);
  const tur = await page.evaluate(() => {
    const D = DOZER; D.stato.pot.turbo = 1; D.stato.pronta.turbo = 0;
    const corsa = () => { let a = 99, b = -99; for (let i = 0; i < 120 * 10; i++) { D.passo(1 / 120); a = Math.min(a, D.SPINTORI[2].z); b = Math.max(b, D.SPINTORI[2].z); } return b - a; };
    D.simula(12); const normale = corsa();
    D.usaAbilita('turbo'); D.simula(0.5); const turbo = corsa();
    return { normale: +normale.toFixed(2), turbo: +turbo.toFixed(2) };
  });
  T('TURBO allunga la corsa degli spintori', tur.turbo > tur.normale * 1.2, JSON.stringify(tur));
  T('la RAFFICA si accende e si spegne dal suo pulsante', await page.evaluate(() => { const D = DOZER; D.stato.pot.raffica = 1; const a = D.stato.opz.raffica; D.usaAbilita('raffica'); const b = D.stato.opz.raffica; D.usaAbilita('raffica'); return a !== b && D.stato.opz.raffica === a; }));

  // --- EVENTI DaProd: la camera va allo slot ---
  const ev = await page.evaluate(() => {
    const D = DOZER; D.pulisci(); D.gioca();
    const r = { parte: D.avviaEvento('pioggia'), cinema: document.body.classList.contains('cine'), lancio: D.lanciaDalGiocatore() };
    r.finito = D.finisciEvento(); r.coda = D.pioggiaInCoda(); r.cine = D.cine.b; r.eventi = D.stato.st.eventi;
    r.evFren = D.avviaEvento('frenesia') && D.finisciEvento(); r.timer = D.timer();
    r.evCal = D.avviaEvento('calamita') && D.finisciEvento(); r.cal = D.timer().calamita;
    r.slot = D.slot.fin.join(''); return r;
  });
  T('un EVENTO porta la camera allo slot e blocca i lanci', ev.parte && ev.cinema && ev.lancio === 0, JSON.stringify(ev));
  T('PIOGGIA DaProd: piovono monete', ev.finito && ev.coda >= 12 && ev.cine === 0);
  T('FRENESIA: spintori scatenati e buchi chiusi', ev.evFren && ev.timer.turbo > 10 && ev.timer.muro > 10);
  T('CALAMITA DaProd: 15 s di calamita, e lo slot mostra il simbolo giusto', ev.evCal && ev.cal > 13 && ev.slot === '666');
  T('gli eventi arrivano da soli ogni tanto', await page.evaluate(() => { const p = DOZER.prossimoEvento(); return p > 30 && p < 200; }));
  await page.evaluate(() => DOZER.simula(20));

  // --- VALUTA IN EURO (si sblocca a un milione di lire) ---
  const val = await page.evaluate(() => {
    const D = DOZER; D.stato.euro = false; D.stato.st.saldoMax = 0; D.stato.opz.valuta = 'lire'; D.stato.saldo = 500000; D.aggiornaHUD();
    const r = { bloccata: D.cambiaValuta() === false && !D.stato.euro, bott: !document.getElementById('valutaBtn').hidden };
    D.stato.saldo = 1000000; D.aggiornaHUD();
    r.sbloccata = D.stato.euro; r.bott2 = !document.getElementById('valutaBtn').hidden;
    D.cambiaValuta(); r.euro = D.soldi(1936.27); r.barra = document.querySelector('#monete .mon span').textContent;
    D.cambiaValuta(); r.lire = D.soldi(1000); D.stato.saldo = 100000; return r;
  });
  T('l\'euro è bloccato finché non arrivi a L.1.000.000', val.bloccata && !val.bott, JSON.stringify(val));
  T('a un milione si sblocca il tasto €', val.sbloccata && val.bott2);
  T('in euro saldo e monete si leggono in euro, e si torna alle lire', val.euro === '€1,00' && val.barra.startsWith('€') && val.lire === 'L.1.000', JSON.stringify(val));

  // --- SCRITTE SPEGNIBILI ---
  await page.locator('#scritteBtn').click();
  T('il tasto 💬 spegne le scritte', await page.evaluate(() => document.body.classList.contains('senzaScritte') && !DOZER.stato.opz.scritte));
  await page.locator('#scritteBtn').click();
  T('e le riaccende', await page.evaluate(() => !document.body.classList.contains('senzaScritte')));
  const bordi = await page.evaluate(() => { const a = document.getElementById('avvisi').getBoundingClientRect(), c = document.getElementById('catena').getBoundingClientRect(); return { a: a.left, c: c.right }; });
  T('su computer le scritte stanno ai bordi', bordi.a < 40 && bordi.c > 1200, JSON.stringify(bordi));

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
  T('il tavolo non si riempie mai', pieno <= 441, pieno + ' monete al massimo');

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
  const ab = await page.locator('#abilita').boundingBox();
  T('le abilità stanno in una riga dentro lo schermo, accanto al negozio', ab && ab.x >= 0 && ab.x + ab.width <= ng.x + 1 && !sovrapp(ab, box), JSON.stringify(ab));
  T('su telefono c\'è il tasto per le scritte', await page.locator('#scritteBtn').isVisible());
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
  T('meno monete su telefono', await page.evaluate(() => { const D = DOZER; D.pilaIniziale(); D.stato.saldo = 1e9; let m = 0; for (let i = 0; i < 500; i++) { D.lanciaMoneta(0, 0); m = Math.max(m, D.monete().length); } return m; }) <= 321);
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
    { daprod_dozer_v4: JSON.stringify({ saldo: 'tanti', maxLancio: 99, sel: -4, pot: { raffica: 77, scossa: -3 }, tavolo: [1, 2, 'x'] }) });
  await page.waitForTimeout(500);
  const s = await page.evaluate(() => ({ saldo: DOZER.stato.saldo, max: DOZER.stato.maxLancio, sel: DOZER.stato.sel, raffica: DOZER.stato.pot.raffica, scossa: DOZER.stato.pot.scossa, monete: DOZER.monete().length }));
  T('salvataggio rovinato: valori rimessi a posto', s.saldo === 5000 && s.max === 4 && s.sel === 0 && s.raffica === 5 && s.scossa === 1 && s.monete > 120, JSON.stringify(s));
  T('salvataggio rovinato: nessun errore', errori.length === 0, errori.join(' | '));
  await ctx.close();
}
{
  const v3 = JSON.stringify({ saldo: 80000, maxLancio: 7, sel: 4, record: 9, pot: { multi: 1, raffica: 2, vasca: 1 }, st: { lanci: 50 }, tavolo: [1, 0, 0, 3] });
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 1000, height: 700 } }, { daprod_dozer_v3: v3 });
  await page.waitForTimeout(500);
  const s = await page.evaluate(() => ({ saldo: DOZER.stato.saldo, max: DOZER.stato.maxLancio, sel: DOZER.stato.sel, record: DOZER.stato.record, raffica: DOZER.stato.pot.raffica, lanci: DOZER.stato.st.lanci }));
  T('salvataggio 2.0: tagli rimappati, raffica tenuta, vecchi potenziamenti rimborsati', s.saldo === 80000 + 9000 + 12000 && s.max === 3 && s.sel === 2 && s.record === 5 && s.raffica === 2 && s.lanci === 50, JSON.stringify(s));
  T('salvataggio 2.0: nessun errore', errori.length === 0, errori.join(' | '));
  await ctx.close();
}
{
  const { ctx, page, errori } = await nuovaPagina({ viewport: { width: 1000, height: 700 } }, { daprod_dozer_v4: '{non è json' });
  await page.waitForTimeout(500);
  T('salvataggio illeggibile: si riparte puliti', errori.length === 0 && await page.evaluate(() => DOZER.stato.saldo) === 5000);
  await ctx.close();
}

await browser.close();
server.close();
console.log(`\n${ok} OK, ${ko} KO`);
process.exit(ko ? 1 : 0);
