# Changelog DaProd Coin Dozer 🪙

Tutte le versioni notevoli del gioco. Le date sono in formato AAAA-MM-GG.
Ogni versione pubblicata ha anche una [release GitHub](https://github.com/cammo22/daprod-coin-dozer/releases)
e va online su [GitHub Pages](https://cammo22.github.io/daprod-coin-dozer/) subito dopo il push.

## [1.2.1] — 2026-09-18 · Fix telefono 📱

### Risolto
- **I pulsanti in basso non rispondevano al tocco**: la barra delle abilità copriva il
  pulsante ▲ POTENZIAMENTI e si mangiava i tocchi. Ora il contenitore della barra non
  intercetta più i tocchi (`pointer-events: none`, solo i chip sono cliccabili) e le
  zone non si sovrappongono più: chip a sinistra, ▲ NEGOZIO e ◎ SPARA a destra.
- **Vista troppo zoomata in verticale**: quando lo schermo è più alto che largo la
  camera **arretra automaticamente** finché il tavolo non entra tutto in larghezza.
- Aggiunto lo **zoom con due dita (pinch)** su telefono: prima c'era solo la rotella.

### Modificato
- HUD su telefono in colonna (logo sopra, statistiche sotto), con rispetto del notch
  e della barra di sistema (`env(safe-area-inset-*)`).
- Chip delle abilità in **griglia compatta** (2-3 per riga) e pulsante con nome corto
  `▲ NEGOZIO` sugli schermi piccoli.
- Negozio: sotto i 430px le righe diventano a **colonna singola** con bottoni a tutta
  larghezza, molto più facili da premere.

## [1.2.0] — 2026-09-18 · Gettoni infiniti 🪙♾️

### Aggiunto
- **Gettoni infiniti**: nuovo caricatore che si ricarica sempre da solo (0,55/s alla partenza).
  Lanciare non svuota mai il gioco: al massimo aspetti un attimo la ricarica.
- **Valute separate**: i gettoni servono per lanciare, i **PREMI** 🏆 (vincite del bordo,
  combo, torri, spazzate) servono per comprare nel negozio.
- **SPAZZATA**: quando il tavolo è pieno, le lire più vicine al bordo vengono spazzate via
  e **pagate** come premi, con avviso e particelle. Fine delle sparizioni a vuoto.
- **Tetti massimi espliciti** per ogni potenziamento, con barra di livello `LIVELLO x / MAX`
  direttamente sulla riga del negozio: Ricarica 15 · Forza 8 · Multi 4 · Cannone 8 · Raffica 6.
- **GUI potenziamenti rinnovata**: icone emoji su ogni riga (🪙💪✨⚡💥🔫🥈💎🌈🔷🍷🌌),
  schede con emoji (🛠️🎁🎚️📊), pulsanti `🏆 MAX` e `🔒 BLOCCATO`, chip delle abilità con emoji.
- Statistica **"Lire spazzate"** nella scheda 📊.
- Questo changelog.

### Modificato
- HUD ristrutturato: `🏆 PREMI`, `🏅 VINTE`, `🪙 GETTONI x/y` con barra di ricarica.
- Il potenziamento "Produzione idle" diventa **RICARICA GETTONI** (velocità + capacità).
- Salvataggio aggiornato alla chiave `daprod_dozer_v2` (premi + gettoni).

### Risolto
- Le lire non scompaiono più in silenzio quando il tavolo si riempie: ora la spazzata paga.

## [1.1.0] — 2026-09-18 · Sala DaProd completa 🎰

### Aggiunto
- **Marchio DaProd** ovunque: logo animato nell'HUD, targa neon sul retro, logo inciso sul
  panno e incisione `DaProd · L. 100 · LIRE` su ogni monetina 3D.
- **Zona di lancio illuminata** (bordo tratteggiato pulsante), mirino e moneta fantasma.
- **Raffica** ⚡: tieni premuto il tasto sinistro e spari una lira dietro l'altra.
- **Cannone** 🔫: tieni premuto il tasto destro per caricare, rilascia per sparare
  (pulsante **◎ SPARA** dedicato su telefono).
- **Switch ON/OFF per ogni abilità** e per l'**audio**, con chip grigie quando bloccate.
- **Scorciatoie**: B negozio · C cannone · R raffica · F forza · M multi · I gettoni · T torri · A audio.
- **Torri di lire** premiate (allineamento assistito, bonus a 3+ livelli, massimo 4 di altezza).
- Soddisfazione: suoni sintetizzati (Web Audio), particelle, testi volanti, combo con tono
  crescente, lampi e scossoni di camera.
- **Supporto telefono**: layout responsive, touch, tap=lancio, SPARA dedicato.
- Pubblicazione su **GitHub + GitHub Pages** con README e pulsante ▶ GIOCA ORA.

### Modificato
- Le "monete" diventano **lire** ovunque (testi, negozio, monetine).

## [1.0.0] — 2026-09-17 · Prima versione giocabile

- Coin dozer 3D con Three.js in un singolo file HTML.
- Fisica 2,5D: gravità solo verso il basso, lire sempre piatte, pila compatta, piastra
  orizzontale con corsa corta, caduta oltre il bordo = vincita.
- Negozio con potenziamenti (produzione, forza, multi-lancio), cannone, skin e feltri.
- Salvataggio automatico in `localStorage`.
- Test automatici della fisica e della logica (suite Node, 45+ controlli).

---

Confronto tra versioni: [tags](https://github.com/cammo22/daprod-coin-dozer/tags) ·
[releases](https://github.com/cammo22/daprod-coin-dozer/releases)
