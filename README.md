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
| **Meteora** ☄️ (col cannone acceso) | miri **dove vuoi** e tieni premuto per caricare | tieni premuto, oppure il pulsante **☄️ METEORA** |
| **Spegnere un'abilità** | `click` sul chip già acceso | `tap` sul chip già acceso |
| Zoom | rotella del mouse | pizzica con due dita |

### ⚙️ Come funziona la macchina

1. **Scegli solo la colonna**: tocchi dove vuoi sul tavolo, conta la posizione **orizzontale**.
   La lira scende **sempre dalla fessura in fondo a tutto**, nella **camera di carico**.
   Davanti alla camera c'è un **muro invisibile con un taglio in basso**: si entra in gioco solo
   quando ci si è posati piatti, così nessuna lira schizza sul campo.
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
- **Vasca profonda** (1.7): campo lungo, sponde alte con bordo d'ottone e vaschetta dei premi sotto al
  bordo, dove si vedono cadere le lire vinte.
- **Torri che crollano** (1.7): sul campo ci sono pile di lire già in piedi. Ogni lira ha un peso che
  cresce col taglio; quando urta forte una pila, dalla cima si staccano 1 pezzo con la L.100 e uno in
  più per ogni taglio sopra. Crollate le torri, ne sale una nuova.
- **Potenziamenti** (salvati nel browser, tutti con **tetto massimo** e barra di livello):
  - 🪙 **Taglio di lancio** — **sette tagli**: L.100 → L.500 → L.1.000 → L.10.000 →
    L.100.000 → L.500.000 → **L.1 MILIONE** (paga 250 contro 1)
  - 🪙 **Ricarica gettoni** *(passiva)* — il caricatore si riempie più in fretta e trasporta più gettoni (infiniti)
  - 💪 **Forza di lancio** *(passiva)* — le lire colpiscono la pila spingendola verso il bordo
  - ✨ **Multi-lancio** *(passivo)* — più lire con un solo click
  - ⚡ **Raffica** — tieni premuto e spari una lira dietro l'altra
  - ☄️ **Potenza meteora** — impatto più violento e ricarica più corta
- **Sette tagli di lira**: 🟤 Rame L.100 · ⚪ Argento L.500 · 🟡 Oro L.1.000 · ⚪ Platino L.10.000 ·
  🟢 Smeraldo L.100.000 · 🟣 Ametista L.500.000 · 🔴 **Rubino L.1.000.000**, ognuno con
  **grandezza, colore e scritta** propri, incisi sulla monetina.
- **♠ Carte speciali**: ogni tanto dalla fessura ne scende una (jolly, picche, cuori, quadri,
  fiori). Non pagano premi: quando cadono dal bordo **te le tieni** e serviranno a riscattare
  premi. Sul tavolo al massimo **5 alla volta**.
- **☄️ Meteora**: accendi il cannone, miri **dove vuoi** sul tavolo e la fai cadere per smuovere
  la pila. Mentre è acceso non si lanciano lire; dopo il colpo si spegne da solo e si ricarica
  in **5 minuti** (anche a gioco chiuso).
- **Torri fino a 30 piani** con bonus crescente, festa dai 10 piani e record salvato.
- **Sbloccabili** 🎁: meteora ☄️ e i panni del tavolo (🔷 blu, 🍷 bordeaux, 🌌 notte).
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

Nel repository ci sono **102 prove** che aprono il gioco in un browser vero (desktop, telefono e
con un salvataggio di una versione vecchia) e controllano che parta senza errori, che il tavolo
non si riempia mai, che la lira scenda sempre dalla fessura in fondo, che il muro trattenga chi non
si è posato, che i 7 tagli crescano bene, che le carte non superino le 5 sul tavolo e non paghino
premi, che la meteora spinga la pila e non riparta prima dei 5 minuti, che le torri crollino di più
coi tagli grossi e che ne risalga una nuova, che le abilità si spengano e che il negozio funzioni
anche al tocco:

```bash
npm i --no-save playwright three@0.160.0
npx playwright install chromium
node test/prove.mjs
node test/foto.mjs 8 tavolo     # foto del tavolo (computer e telefono) in test/.out/
```

## 📱 Da telefono

Apri il pulsante **▶ GIOCA ORA** qui sopra: la pagina è già ottimizzata per il touch (zoom bloccato,
nessuna selezione, layout ridotto, meno lire in scena per restare fluido) e puoi aggiungerla alla
schermata home per giocarla a tutto schermo.

---

**DaProd — Sala Slot** 🎰 · sviluppato con Three.js · rilasciato con licenza MIT.
