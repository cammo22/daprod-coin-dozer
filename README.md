# DaProd · Coin Dozer 🪙

[![▶ GIOCA ORA](https://img.shields.io/badge/%E2%96%B6_GIOCA_ORA-DaProd_Coin_Dozer-ffd54a?style=for-the-badge&labelColor=1a1428)](https://cammo22.github.io/daprod-coin-dozer/)

[![Pagina attiva](https://img.shields.io/badge/GitHub_Pages-attiva-success?style=flat-square)](https://cammo22.github.io/daprod-coin-dozer/)
[![Changelog](https://img.shields.io/badge/📅_Changelog-mantenuto-ffab00?style=flat-square)](CHANGELOG.md)
[![Made with Three.js](https://img.shields.io/badge/Three.js-r160-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Un solo file](https://img.shields.io/badge/HTML-singolo_file-ffab00?style=flat-square)](index.html)
[![Licenza MIT](https://img.shields.io/badge/Licenza-MIT-blue?style=flat-square)](LICENSE)

Il **coin dozer della sala slot DaProd**, con la meccanica di quelli veri: scegli la **colonna**,
la lira scende dalla **fessura in fondo** sul ripiano che scorre, il ripiano la porta avanti e poi
la lascia **cadere sul campo**, dove spinge la pila verso il bordo. Quello che cade dal bordo
diventa **premi**. I **gettoni sono infiniti** e **il tavolo non si riempie mai** — quando è troppo
carico ritira da solo le lire in fondo ♻️. Funziona **da telefono, tablet e desktop**, basta il browser.

## ▶ Come si gioca

| Azione | Desktop | Telefono |
| --- | --- | --- |
| Scegli la **colonna** e lancia | `click` (anche davanti: conta solo la posizione orizzontale) | `tap` |
| **Raffica** ⚡ (tieni premuto e spara) | tieni premuto il **tasto sinistro** | tieni premuto il dito |
| **Cannone** 💥 (sparo potente) | tieni premuto il **tasto destro** e rilascia | tieni premuto e rilascia, oppure il pulsante **◎ SPARA** |
| **Spegnere un'abilità** | `click` sul chip già acceso | `tap` sul chip già acceso |
| Zoom | rotella del mouse | pizzica con due dita |

### ⚙️ Come funziona la macchina

1. **Scegli solo la colonna**: tocchi dove vuoi sul tavolo, conta la posizione **orizzontale**.
   La lira scende **sempre dalla fessura in fondo**, sopra al ripiano — la profondità non si sceglie.
2. **Il ripiano la porta avanti**: quando avanza si porta dietro le lire appoggiate sopra.
3. **Quando torna indietro sfila via da sotto** e le lire **cadono giù sul campo**.
4. **La faccia del ripiano spinge la pila** verso il bordo: quello che cade è tuo 🏆.

### 🪨 Le abilità si accendono **e si spengono**

Nella barra in basso ci sono i chip 💥 **CANNONE** e ⚡ **RAFFICA**: **una esclude l'altra** e,
toccando quella accesa, **si spegne senza accenderne un'altra**. Con tutte spente si gioca in
**TIRO SEMPLICE**: click = una lira, senza abilità. La modalità in uso è sempre scritta nella
pillola sotto il tavolo, accanto al taglio.

**I gettoni sono infiniti** 🪙♾️: ogni lancio consuma 1 gettone dal caricatore, che si ricarica
sempre da solo (vedi la barra nell'HUD). **Il tavolo non si riempie mai**: non esiste nessun
messaggio di tavolo pieno e nessun lancio viene rifiutato, perché quando le lire in scena sono
troppe (oltre 300, 170 su telefono) il tavolo **ritira da solo quelle in fondo** ♻️, lontano dal
bordo dei premi. Quando una lira cade oltre il bordo vinci **PREMI** 🏆,
**in base al suo taglio** (L.50 → 1, L.100 → 2, L.500 → 5, L.1000 → 10), che servono per comprare
i potenziamenti. Le lire si impilano **fino a 30 piani**: più la torre è alta, più premi regala.

💪 Forza, ✨ Multi-lancio, 🪙 Ricarica gettoni e 🏗️ Torri sono invece **abilità passive**:
si comprano e restano sempre attive, senza interruttori.

Il negozio mostra per ogni potenziamento **icona, livello e tetto massimo** (`LIVELLO x / MAX`),
e nella scheda **⚙️ OPZIONI** ci sono audio, **ombre**, **effetti** (pieni / ridotti / nessuno),
**qualità automatica** e **contafotogrammi**.

## ✨ Cosa c'è dentro

- **Marchio DaProd** ovunque: logo nell'HUD, targa neon sul retro della macchina, logo inciso sul
  panno e **incisione "DaProd · L. 100 · LIRE"** su ogni monetina 3D.
- **Fessura di lancio illuminata** in fondo alla macchina, con guida verticale della colonna,
  mirino e moneta fantasma.
- **Ripiano scorrevole** rialzato in acciaio spazzolato, **ripiano fisso** che chiude il fondo,
  **muro di fondo** con filo di luce e **targa DaProd** in alto, come l'insegna di una sala.
- **Fisica vera 2,5D**: le lire cadono sempre verso il basso, si appiattiscono all'atterraggio e si
  impilano; zero rimbalzi, zero monete storte.
- **Torri di lire**: le lire si centrano su quella sotto (pile ordinate) e si impilano **fino a 30 piani**;
  dal 4° piano scatta un **bonus torre** con suono e particelle, e il record resta salvato.
- **Potenziamenti** (salvati nel browser, tutti con **tetto massimo** e barra di livello):
  - 🪙 **Taglio di lancio** — decidi se lanci lire da L.100, L.500 o **L.1000** (valgono di più!)
  - 🪙 **Ricarica gettoni** *(passiva)* — il caricatore si riempie più in fretta e trasporta più gettoni (infiniti)
  - 💪 **Forza di lancio** *(passiva)* — le lire colpiscono la pila spingendola verso il bordo
  - ✨ **Multi-lancio** *(passivo)* — più lire con un solo click
  - ⚡ **Raffica** — tieni premuto e spari una lira dietro l'altra
  - 💥 **Potenza cannone** — sparo che travolge la pila
- **Tagli delle lire**: 🥉 Bronzo L.50 · 🥈 Argento L.100 · 🟡 Oro L.500 · ⚪ Platino L.1000,
  ognuno con **grandezza, colore e scritta** propri, incisi sulla monetina.
- **Torri fino a 30 piani** con bonus crescente, festa dai 10 piani e record salvato.
- **Sbloccabili** 🎁: cannone 🔫 e i panni del tavolo (🔷 blu, 🍷 bordeaux, 🌌 notte).
- **Soddisfazione**: suoni sintetizzati in tempo reale con la Web Audio API (nessun file audio),
  particelle, testi volanti `+1`, **combo** con tono crescente, lampi e scossoni di camera sui colpi.
- **Switch ON/OFF** per ogni abilità attiva e per l'audio, più scorciatoie da tastiera:
  `B` negozio · `C` cannone · `R` raffica · `A` audio · `Esc` chiude il negozio.
- **⚙️ Opzioni grafiche** che si salvano: ombre, quantità di effetti, **qualità automatica**
  (se il gioco rallenta abbassa da sola la risoluzione e la rialza appena torna fluido) e FPS a schermo.

## 💾 Salvataggio

Saldo premi, gettoni, potenziamenti, sbloccabili, abilità accese e audio si salvano da soli in
`localStorage` (chiave `daprod_dozer_v2`). Nel negozio, scheda **📊 STATISTICHE**, trovi il
pulsante **AZZERA TUTTO**. Le versioni del gioco sono raccontate nel [CHANGELOG](CHANGELOG.md)
e nelle [release GitHub](https://github.com/cammo22/daprod-coin-dozer/releases).

## 🛠 Come è fatto

Un **singolo file HTML** (`index.html`) con Three.js r160 caricato da CDN: niente build, niente
dipendenze da installare. Le texture (monetine, targa neon, panno, zona di lancio) sono disegnate a
runtime su `<canvas>`.

Per provarlo in locale basta aprirlo nel browser, oppure:

```bash
python -m http.server 8080     # poi apri http://localhost:8080
```

### ✅ Controlli automatici

Nel repository ci sono **75 prove** che aprono il gioco in un browser vero (desktop, telefono e
con un salvataggio di una versione vecchia) e controllano che parta senza errori, che il tavolo
non si riempia mai, che la lira scenda sempre dalla fessura in fondo, che il ripiano la porti avanti
e la lasci cadere, che nessuna lira resti intrappolata, che le abilità si spengano, che la raffica
non regali premi fuori scala e che il negozio funzioni anche al tocco:

```bash
npm i -D playwright three
npx playwright install chromium
node test/prove.mjs
```

## 📱 Da telefono

Apri il pulsante **▶ GIOCA ORA** qui sopra: la pagina è già ottimizzata per il touch (zoom bloccato,
nessuna selezione, layout ridotto, meno lire in scena per restare fluido) e puoi aggiungerla alla
schermata home per giocarla a tutto schermo.

---

**DaProd — Sala Slot** 🎰 · sviluppato con Three.js · rilasciato con licenza MIT.
