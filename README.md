# DaProd · Coin Dozer 🪙

[![▶ GIOCA ORA](https://img.shields.io/badge/%E2%96%B6_GIOCA_ORA-DaProd_Coin_Dozer-ffd54a?style=for-the-badge&labelColor=1a1428)](https://cammo22.github.io/daprod-coin-dozer/)

[![Pagina attiva](https://img.shields.io/badge/GitHub_Pages-attiva-success?style=flat-square)](https://cammo22.github.io/daprod-coin-dozer/)
[![Changelog](https://img.shields.io/badge/📅_Changelog-mantenuto-ffab00?style=flat-square)](CHANGELOG.md)
[![Made with Three.js](https://img.shields.io/badge/Three.js-r160-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Un solo file](https://img.shields.io/badge/HTML-singolo_file-ffab00?style=flat-square)](index.html)
[![Licenza MIT](https://img.shields.io/badge/Licenza-MIT-blue?style=flat-square)](LICENSE)

Il **coin dozer della sala slot DaProd**, versione 2: una macchina a **tre piani** profondi con tre
spintori. Scegli la moneta, scegli la colonna, e guardala scendere **di piano in piano** fino alla vasca
delle vincite. **Monete uguali una sopra l'altra fanno una pila** che diventa il taglio più grande, dalla
L.50 fino al **Diamante da un miliardo** (irraggiungibile: già il milione è un'impresa). Funziona **da
telefono, tablet e desktop**, basta il browser.

## ▶ Come si gioca

1. **All'inizio scegli la moneta** con cui giocare (poi la cambi quando vuoi dalla barra in basso).
   Ogni lancio costa il valore della moneta.
2. **Tocca il tavolo**: conta solo la colonna. Il carrello, in alto e in fondo alla macchina, scorre lì
   e lascia cadere la moneta **davanti al cofano del piano 1**, dove entra nel tappeto di monete.
3. **Tre spintori** calmi la portano giù: piano 1 → piano 2 → piano 3 → **vasca delle vincite**. Il
   terzo, quello giallo, è lentissimo. Quello che cade nella vasca è tuo, al suo valore; quello che cade
   nei **buchi laterali** va alla casa.
4. **Impila le monete**: una moneta che si posa su una **uguale** fa una pila. Quando la pila vale
   quanto il taglio successivo si fonde (2 × L.50 = L.100, 10 × L.100 = L.1.000, 5 × L.1.000 =
   L.5.000…); la moneta nuova fa un saltello e, se ricade su una pila uguale, **catena**.

| Azione | Desktop | Telefono |
| --- | --- | --- |
| Lancia nella colonna | `click` (o `Spazio`) | `tap` |
| Raffica ⚡ | tieni premuto (tasto `R` accende/spegne) | tieni premuto |
| Scegli la moneta | barra in basso, tasti `1`–`5` | barra in basso |
| Abilità 🫨⚡☄️🧲⏩🧱 | pulsanti a sinistra, tasti `S` `R` `F` `C` `T` `W` | riga sopra le monete |
| Negozio | pulsante, tasto `N` | pulsante |
| Scritte / valuta | 💬 e € nell'HUD, tasti `H` / `V` | 💬 e € nell'HUD |
| Audio / zoom | `M` / rotella | pulsante 🔊 / due dita |

### 🪙 I tagli (una pila che vale il taglio dopo si fonde)

L.50 → L.100 → L.1.000 e L.5.000 **bimetalliche** → L.50.000 (oro rosso) → L.100.000 (oro) →
L.250.000 **smeraldo** → L.500.000 **zaffiro** → **L.1 MILIONE rubino** → 5, 10, 50, 100, 250, 500
milioni (ametista, topazio, acquamarina, tormalina, opale, onice) → **L.1 MILIARDO diamante DaProd**.

Le pile **non creano soldi dal nulla**: una pila da 3 L.100 nella vasca paga L.300. Si parte lanciando
L.50 e L.100; L.1.000, L.5.000 e L.50.000 si sbloccano **da sole** quando crei un taglio due gradini
sopra, oppure **comprandole** (20 volte il valore).

### 🎰 Gettone DaProd, slot ed eventi

Ogni tanto scende in regalo un **gettone DaProd** (al massimo uno ogni 25 secondi). Se arriva nella
vasca, lo **schermo della macchina** gira lo slot: **coppia** = 3 × L.100, **tris** = pioggia di 9
monete, **tre loghi DaProd** = **JACKPOT**. I premi sono in monete piccole e fisse, qualunque taglio
tu stia lanciando.

Ogni due o tre minuti di gioco lo slot chiama un **EVENTO DaProd**: la camera vola davanti allo
schermo, i rulli girano (l'ultimo rallenta fino all'ultimo simbolo), esce l'evento e si torna al tavolo:

| | Evento | Cosa succede |
| --- | --- | --- |
| ★★★ | 🌧 Pioggia DaProd | piovono 16 monete sui piani 2 e 3 |
| 777 | ⚙️ Frenesia | per 12 s spintori scatenati e buchi della casa chiusi |
| 🧲🧲🧲 | 🧲 Calamita DaProd | per 15 s le monete uguali che si toccano si impilano da sole |

### 🕹 Abilità (accanto alla scossa, anche quelle ancora bloccate)

| | Abilità | Cosa fa | Sblocco |
| --- | --- | --- | --- |
| 🫨 | Scossa | fa saltare tutto il tavolo (ricarica da 40 a 22 s) | subito |
| ⚡ | Raffica | tenendo premuto lancia a ripetizione (da 3 a 8 al secondo) | L.1.500 |
| ☄️ | Meteora | tocchi dove vuoi e una meteora scaraventa le monete | L.5.000 |
| ⏩ | Turbo | spintori al doppio e con la corsa più lunga per qualche secondo | L.6.000 |
| 🧲 | Calamita | le monete uguali che si toccano si impilano | L.8.000 |
| 🧱 | Muro | chiude i buchi della casa per qualche secondo | L.10.000 |

Un'abilità bloccata si sblocca toccandola (si illumina di verde quando te la puoi permettere); i
livelli si comprano nel negozio. Tutte al massimo costano circa L.500.000: **il milione resta un
miraggio anche con tutto potenziato**. Se non ti basta il saldo nemmeno per una L.50, arriva il
**bonus di cortesia** da L.1.000.

### 💶 Lire o euro

Chi arriva a **L.1.000.000** sblocca il tasto **€**: saldo, prezzi e monete si leggono in euro
(1 € = L.1.936,27) e con lo stesso tasto si torna alle lire.

### 💬 Scritte

Su computer avvisi, catene e ondate stanno **ai bordi**, lontano dal tavolo. Su telefono sono in
versione piccola, e il tasto **💬** le spegne (restano solo gli avvisi importanti).

## 💶 Le Lire DaProd

Da questa versione il gioco ha **lo stesso portafoglio degli altri giochi DaProd** —
[Coin Dozer](https://cammo22.github.io/daprod-coin-dozer/), [Claw Machine](https://cammo22.github.io/DaProd-ClawMachine/gioca/)
e [Neon Partenope](https://cammo22.github.io/daprod-neon-partenope/). Stanno tutti su `cammo22.github.io`, quindi il
browser tiene **un saldo solo**.

- Quello che vinci fa **punti della partita**. Quando vuoi smettere premi **Stacca**: i punti diventano **Lire DaProd**
  alla quotazione di adesso, per la tua fetta (15%), fino a L.3.000 al giorno.
- **La Borsa della Lira**: la quotazione sale quando si spende e scende quando si incassa, con un'onda lenta uguale
  per tutti. Staccare subito o aspettare è parte del gioco.
- Con le Lire si **ricarica** (L.100 → L.2.000 di monete).
- Dentro la [DaProd Suite](https://github.com/cammo22/DaProdSuite) il gioco sta nella **sala giochi**: lì il
  portafoglio è quello del computer, e le cose grosse danno **carte** per la slot delle combinazioni.

Il codice è `daprod-lira.js`, lo stesso file in tutti e quattro i posti (la copia buona sta nella suite).

## ✨ Cosa c'è dentro

- **Tre piani a cascata** con tre spintori che escono da sotto il piano di sopra, come nei coin
  pusher veri: ogni piano ha il suo tappeto di monete che scorre verso il bordo.
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
soli in `localStorage` (chiave `daprod_dozer_v4`). Chi arriva dalla 2.0 ritrova saldo e raffica, con i
tagli rimappati e gli altri potenziamenti rimborsati; chi arriva dalla 1.x trova i vecchi premi
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
funzionino, che **nessuna moneta resti incastrata in alto**, le pile e le fusioni (anche a catena), la
vasca, i buchi della casa, lo slot e il jackpot, gli eventi con la camera sullo slot, le sei abilità,
la valuta in euro, le scritte spegnibili, che il tavolo non si riempia mai e il salvataggio:

```bash
npm i --no-save playwright three@0.160.0
npx playwright install chromium
node test/prove.mjs
node test/foto.mjs 8 tavolo     # foto della macchina (computer e telefono) in test/.out/
```

## 📥 App per Android, Windows e Mac

Ogni [release](https://github.com/cammo22/daprod-coin-dozer/releases/latest) ha tre file:

| | File | Come si installa |
| --- | --- | --- |
| 🤖 Android | `DaProd-Coin-Dozer-X.Y.Z.apk` | aprilo sul telefono e consenti l'installazione da origini sconosciute |
| 🪟 Windows | `DaProd-Coin-Dozer-X.Y.Z.exe` | portatile: doppio clic e si gioca (se SmartScreen avvisa: *Ulteriori informazioni → Esegui comunque*) |
| 🍎 Mac | `DaProd-Coin-Dozer-X.Y.Z.dmg` | trascina l'app in Applicazioni; la prima volta *tasto destro → Apri* |

Le app contengono il gioco e three.js, quindi **funzionano anche offline**. EXE e DMG non sono firmati
(per questo Windows e macOS chiedono conferma la prima volta).

**È tutto automatico** (`.github/workflows/app.yml`): quando su `main` arriva una versione nuova (la
costante `VERSIONE` in `index.html`), GitHub Actions compila APK, EXE e DMG e pubblica da solo la
release `vX.Y.Z` con le note prese dal CHANGELOG. Su ogni PR le app vengono compilate come controllo.

- `android/`: WebView a tutto schermo che serve il gioco dagli asset (`https://appassets.androidplatform.net`).
- `desktop/`: Electron, serve il gioco dal protocollo `app://` (F11 = schermo intero).
- `strumenti/prepara-www.mjs android|desktop`: copia il gioco e three.js nella cartella dell'app.

Per compilare in locale:

```bash
npm i --no-save three@0.160.0
node strumenti/prepara-www.mjs android && (cd android && gradle assembleRelease)   # serve l'Android SDK
node strumenti/prepara-www.mjs desktop && (cd desktop && npm install && npm run dist)
```

Per firmare l'APK sempre con la stessa chiave (così gli aggiornamenti si installano sopra), aggiungi ai
segreti del repository `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` e
`ANDROID_KEY_PASSWORD`. Senza segreti l'APK è firmato con una chiave di debug.

## 📱 Da telefono

Apri il pulsante **▶ GIOCA ORA** qui sopra: la pagina è già pronta per il touch (zoom bloccato,
nessuna selezione, meno monete in scena e qualità media per restare fluida) e puoi aggiungerla alla
schermata home per giocarla a tutto schermo.

---

**DaProd — Sala Slot** 🎰 · sviluppato con Three.js · rilasciato con licenza MIT.
