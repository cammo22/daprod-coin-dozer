# DaProd · Coin Dozer 🪙

[![▶ GIOCA ORA](https://img.shields.io/badge/%E2%96%B6_GIOCA_ORA-DaProd_Coin_Dozer-ffd54a?style=for-the-badge&labelColor=1a1428)](https://cammo22.github.io/daprod-coin-dozer/)

[![Pagina attiva](https://img.shields.io/badge/GitHub_Pages-attiva-success?style=flat-square)](https://cammo22.github.io/daprod-coin-dozer/)
[![Changelog](https://img.shields.io/badge/📅_Changelog-mantenuto-ffab00?style=flat-square)](CHANGELOG.md)
[![Made with Three.js](https://img.shields.io/badge/Three.js-r160-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Un solo file](https://img.shields.io/badge/HTML-singolo_file-ffab00?style=flat-square)](index.html)
[![Licenza MIT](https://img.shields.io/badge/Licenza-MIT-blue?style=flat-square)](LICENSE)

Il **coin dozer della sala slot DaProd**, versione 2: una macchina a **tre piani** con tre spintori.
Scegli la moneta, scegli la colonna, e guardala scendere **di piano in piano** fino alla vasca delle
vincite. **Due monete uguali una sopra l'altra si fondono nel taglio più grande**, fino al
**Diamante da un milione**. Funziona **da telefono, tablet e desktop**, basta il browser.

## ▶ Come si gioca

1. **All'inizio scegli la moneta** con cui giocare (poi la cambi quando vuoi dalla barra in basso).
   Ogni lancio costa il valore della moneta.
2. **Tocca il tavolo**: conta solo la colonna. Il carrello in alto scorre lì e lascia cadere la moneta
   sul **piano 1**.
3. **Tre spintori** la portano giù: piano 1 → piano 2 → piano 3 → **vasca delle vincite**. Quello che
   cade nella vasca è tuo, al suo valore. Quello che cade nei **buchi laterali** va alla casa.
4. **Fondi le monete**: quando una moneta si posa sopra una **uguale**, le due diventano il taglio
   successivo, che fa un saltello e, se ricade su un'altra uguale, **si fonde di nuovo (catena)**.

| Azione | Desktop | Telefono |
| --- | --- | --- |
| Lancia nella colonna | `click` (o `Spazio`) | `tap` |
| Raffica ⚡ (col potenziamento) | tieni premuto | tieni premuto |
| Scegli la moneta | barra in basso, tasti `1`–`8` | barra in basso |
| Scossa 🫨 | pulsante, tasto `S` | pulsante |
| Negozio | pulsante, tasto `N` | pulsante |
| Audio / zoom | `M` / rotella | pulsante 🔊 / due dita |

### 🪙 I tagli (2 uguali = 1 più grande)

L.50 → L.100 → L.200 → **L.500** e **L.1.000** bimetalliche → L.2.000 (oro rosso) → L.5.000 (oro) →
L.10.000 **smeraldo** → L.50.000 **zaffiro** → L.100.000 **rubino** → **L.1 MILIONE diamante DaProd**.

Si parte lanciando L.50 e L.100. I tagli più grandi (fino alla L.10.000) si sbloccano **da soli**
quando ne crei uno due gradini sopra con le fusioni, oppure **comprandoli** (30 volte il valore).

### 🎰 Gettone DaProd e slot

Ogni tanto scende in regalo un **gettone DaProd**. Se arriva nella vasca, lo **schermo della macchina**
gira lo slot: **coppia** = 4 monete in regalo, **tris** = pioggia di 12 monete, **tre loghi DaProd** =
**JACKPOT**, con lire e una pioggia di 26 monete grosse.

### 🛒 Potenziamenti

| | Potenziamento | Cosa fa |
| --- | --- | --- |
| ✨ | Multi-lancio | fino a 4 monete per tocco |
| ⚡ | Raffica | tenendo premuto lancia a ripetizione (fino a 9 al secondo) |
| 🧲 | Fusione magnetica | si fondono anche monete posate un po' storte |
| ⚙️ | Motore spintori | spintori più veloci |
| 🧱 | Sponde laterali | accorciano i buchi della casa fino a chiuderli |
| 💰 | Vasca d'oro | +10% su ogni moneta vinta, per livello |
| 🍀 | Fortuna DaProd | gettoni DaProd più frequenti |

Più la 🫨 **Scossa** (fa saltare tutto il tavolo, si ricarica in 40 s) e il **bonus di cortesia**:
se non ti basta il saldo nemmeno per una L.50, arriva L.1.000 in regalo.

## ✨ Cosa c'è dentro

- **Tre piani a cascata** con tre spintori che escono da sotto il piano di sopra, come nei coin
  pusher veri: niente più monete ferme all'inizio, il piano 1 le passa sempre al piano sotto.
- **Marchio DaProd ovunque**: insegna neon che si accende sfarfallando, schermo dello slot, frontale
  della vasca, spintori, bordi luminosi dei piani, panni, carrello e gettone.
- **Luci**: bagliori (bloom), mappa d'ambiente per cromo e monete, led diversi per ogni piano,
  lampadine che si rincorrono e fanno festa quando vinci, sala sfocata sullo sfondo.
- **Inquadratura automatica** per ogni schermo, dall'insegna alla vasca.
- **Soddisfazione**: suoni sintetizzati in tempo reale (Web Audio API, nessun file), particelle,
  scritte volanti, **ONDATA** di vincite, **CATENA** di fusioni, scossoni di camera.
- **Opzioni grafiche** che si salvano: qualità alta (bagliori + ombre), media, bassa e qualità
  automatica (se il gioco rallenta, scende da sola), più il contatore FPS.

## 💾 Salvataggio

Saldo, tagli sbloccati, potenziamenti, opzioni, statistiche **e le monete sul tavolo** si salvano da
soli in `localStorage` (chiave `daprod_dozer_v3`). Chi arriva dalla 1.x trova i vecchi premi
convertiti in lire. Nel negozio, scheda ⚙️ **OPZIONI**, c'è **AZZERA TUTTO**. Le versioni sono
raccontate nel [CHANGELOG](CHANGELOG.md) e nelle [release GitHub](https://github.com/cammo22/daprod-coin-dozer/releases).

## 🛠 Come è fatto

Un **singolo file HTML** (`index.html`) con Three.js r160 da CDN (più i suoi addon per il bloom):
niente build, niente dipendenze da installare. Tutte le texture (monete, insegna, schermo, panni) sono
disegnate a runtime su `<canvas>`, le monete si disegnano con una InstancedMesh per taglio.

Per provarlo in locale basta aprirlo nel browser, oppure:

```bash
python -m http.server 8080     # poi apri http://localhost:8080
```

### ✅ Controlli automatici

`test/prove.mjs` apre il gioco in un browser vero (computer, telefono, salvataggi vecchi o rovinati) e
controlla che parta senza errori, che si scelga la moneta all'inizio, che i tre piani e i tre spintori
funzionino, che **nessuna moneta resti incastrata in alto**, le fusioni (anche a catena e storte), la
vasca, i buchi della casa, lo slot e il jackpot, la scossa, il negozio (senza taglio né forza di
lancio), che il tavolo non si riempia mai e il salvataggio:

```bash
npm i --no-save playwright three@0.160.0
npx playwright install chromium
node test/prove.mjs
node test/foto.mjs 8 tavolo     # foto della macchina (computer e telefono) in test/.out/
```

## 📱 Da telefono

Apri il pulsante **▶ GIOCA ORA** qui sopra: la pagina è già pronta per il touch (zoom bloccato,
nessuna selezione, meno monete in scena e qualità media per restare fluida) e puoi aggiungerla alla
schermata home per giocarla a tutto schermo.

---

**DaProd — Sala Slot** 🎰 · sviluppato con Three.js · rilasciato con licenza MIT.
