# Changelog DaProd Coin Dozer 🪙

Tutte le versioni notevoli del gioco. Le date sono in formato AAAA-MM-GG.
Ogni versione pubblicata ha anche una [release GitHub](https://github.com/cammo22/daprod-coin-dozer/releases)
e va online su [GitHub Pages](https://cammo22.github.io/daprod-coin-dozer/) subito dopo il push.

## [2.2.4] — 2026-09-25 · Più fluido sul telefono

- **Sul telefono niente vetro sfocato** dietro saldo, record e tasti: il blur andava rifatto a ogni fotogramma, perché
  sotto c'è il 3D che si muove, e costava più della macchina. Le carte sono solo un po' più scure.
- **In qualità bassa due luci colorate su quattro si spengono** e la luce del cielo le rimpiazza: ogni luce la paga ogni
  pixel di ogni moneta.
- **Risoluzione dinamica**: in bassa, se il telefono resta sotto i 36 fotogrammi al secondo, disegna a meno pixel (fino
  al 60%) e risale da solo quando torna fluido. Con gli FPS accesi nelle opzioni si vede a quanto sta.
- Sul telefono gli avvisi stanno sotto fusioni e record, non sopra.

## [2.2.3] — 2026-09-24 · I tasti sui lati

- **Sul telefono in verticale i tasti stanno sui lati**: le sei abilità sono una colonna a sinistra e il negozio sta a
  destra, all'altezza del tavolo. In basso resta solo la moneta da lanciare. Prima abilità, negozio e moneta si
  pestavano i piedi nella stessa riga, e dentro la cornice della suite il negozio usciva dallo schermo.
- Lo spiegone iniziale sta fra le due colonne, senza coprire i tasti.
- In alto, su schermi stretti (la cornice della suite), il marchio si stringe e 🔊 e 💬 non escono più dal bordo.

## [2.2.2] — 2026-09-24 · Una moneta sola, e la cortesia con misura

- **La moneta da lanciare è un tasto solo**: toccato, si aprono sopra tutti i tagli (quelli bloccati col lucchetto e il
  prezzo per sbloccarli), e si richiudono appena ne scegli uno. Prima erano cinque tasti in fila che si mangiavano la barra.
- **Il bonus di cortesia arriva al massimo 5 volte ogni 6 ore**: dice quanti ne restano, e quando sono finiti quando torna
  il prossimo. Si ricorda anche ricaricando la pagina.
- Dentro la [DaProd Suite](https://github.com/cammo22/DaProdSuite) la ricarica è un portafoglio: scegli quante lire della
  suite passare al gioco, e ogni L.1 diventa L.20 di monete.

## [2.2.1] — 2026-09-24 · Qui è una demo, le lire stanno nella suite

- **Sul sito e nelle app il gioco torna la sua demo**: niente barra delle Lire DaProd, niente saldo diviso
  fra i giochi nel browser. Le Lire DaProd, la Borsa e le carte ci sono solo giocando dalla sala giochi della
  [DaProd Suite](https://github.com/cammo22/DaProdSuite).
- Nella suite, se il computer DaProd non risponde, il gioco continua lo stesso.

## [2.2.0] — 2026-09-24 · Le Lire DaProd: un portafoglio per tutti i giochi 💶

### 💶 Le Lire DaProd: un portafoglio solo per tutti i giochi DaProd
- **Le Lire DaProd** (`daprod-lira.js`): lo stesso portafoglio nella Coin Dozer, nella Claw Machine e in
  Neon Partenope. Stanno tutti su `cammo22.github.io`, quindi il browser tiene **un saldo solo**: le lire
  staccate in un gioco si spendono negli altri.
- **La partita e lo stacco**: quello che vinci nel gioco fa **punti**. Quando vuoi smettere premi **Stacca**
  e i punti diventano lire, alla **quotazione** di adesso, per la tua fetta (15%). Al massimo L.3.000 al
  giorno: il resto della partita resta per domani.
- **La Borsa della Lira**: la quotazione sale quando si spende (le ricariche) e scende quando si incassa
  (gli stacchi), con un'onda lenta uguale per tutti. Staccare adesso o aspettare è parte del gioco.
- **Ricarica** con le Lire: un gettone da L.100 ti dà **L.2.000 di monete**.
- **Dentro la DaProd Suite** il gioco sta nella sala giochi, e il portafoglio è quello vero del computer:
  lì le cose grosse (jackpot, tris al gettone DaProd, eventi) ti danno **carte** da giocare nella slot delle combinazioni.
- Il portafoglio è la barra in basso (sul telefono il tondo **₤**): toccala per vedere Borsa, fetta e tetto.

## [2.1.0] — 2026-09-24 · Tagli veri, abilità, eventi DaProd e il miliardo impossibile 🎰☄️💶

### Una macchina più profonda e più calma
- **Ogni zona è più profonda**: 5 unità di panno libero sul piano 1 (prima 3,8), 6,8 sul piano 2
  (5,4) e 8,8 sul piano 3 (6,8). La pila iniziale è più grande e il tavolo regge più monete.
- **Le monete nascono più in alto e più in fondo**: il carrello corre a quota 6,9 (prima 5,75), subito
  davanti al cofano, e la moneta cade da lì in fondo al piano 1. Schermo, insegna e colonnine sono
  saliti per restare in vista.
- **Spintori meno potenti**: corse più corte (1,25 / 1,2 / 0,95) e più lenti (4,4 / 5,6 s), e quello
  **giallo del piano 3 è lentissimo** (9 s a corsa). Si scatenano solo con ⏩ TURBO o con l'evento
  FRENESIA, e ora cambiano velocità senza scatti.

### I tagli veri, fino al miliardo
- **L.50, L.100, L.1.000, L.5.000, L.50.000, L.100.000, L.250.000, L.500.000, L.1 MILIONE**, poi 5,
  10, 50, 100, 250 e 500 milioni fino a **L.1 MILIARDO**. Ogni taglio ha metallo o gemma suoi; i numeri
  lunghi sulla faccia si stringono per starci.
- **Le monete uguali fanno una pila**: una moneta che si posa su una uguale si impila (si vede proprio
  la torretta, moneta per moneta). Quando la pila vale quanto il taglio dopo si fonde: 2 × L.50 = L.100,
  **10 × L.100 = L.1.000**, 5 × L.1.000 = L.5.000, 10 × L.5.000 = L.50.000 e così via.
- **Le fusioni non creano più soldi dal nulla**: una pila paga nella vasca quanto le monete che contiene.
  Prima due L.10.000 diventavano una L.50.000 e il saldo esplodeva.
- La **catena** conta solo quando la moneta appena nata dalla fusione ricade su una pila uguale (prima
  bastavano due fusioni qualsiasi a 1,6 s di distanza, e con le L.50 il bonus cresceva all'infinito).
- Si lanciano al massimo le **L.50.000**; sbloccare un taglio costa 20 volte il suo valore.

### Il milione è un'impresa
- Premi dello slot in **monete piccole e fisse** (L.100 e L.1.000), qualunque taglio si lanci; il
  gettone DaProd arriva al massimo una volta ogni 25 s; buchi della casa un po' più lunghi (1,6).
- Con le simulazioni la macchina da sola restituisce circa 0,85–0,9 di quello che ci metti: i guadagni
  arrivano da slot ed eventi, e sono gli stessi con le monete piccole e con quelle grosse. Tutte le
  abilità al massimo costano circa L.500.000: **anche col tavolo tutto potenziato il milione resta
  lontanissimo**, il miliardo è irraggiungibile.

### 🕹 Abilità accanto alla scossa
- Nuova **barra delle abilità**, anche quelle **ancora bloccate** (col lucchetto e il prezzo, verdi
  quando te le puoi permettere: basta toccarle per sbloccarle). Su computer è una griglia in basso a
  sinistra, su telefono una riga sopra le monete accanto al negozio.
- 🫨 **Scossa** (ricarica da 40 fino a 22 s), ⚡ **Raffica** (tieni premuto, fino a 8 al secondo, e il suo
  pulsante la accende e la spegne), ☄️ **Meteora** (torna! tocchi dove vuoi, anche in profondità, e la
  meteora scaraventa le monete), ⏩ **Turbo**, 🧲 **Calamita** e 🧱 **Muro** (chiude i buchi della casa).
- **Tolti** Multi-lancio, Fusione magnetica, Motore spintori, Sponde laterali, Vasca d'oro e Fortuna
  DaProd. Chi li aveva comprati se li ritrova **rimborsati** (fino a L.100.000); la Raffica resta.
- I livelli si comprano nel negozio, che mostra anche il tasto di ogni abilità.

### 🎰 Eventi DaProd
- Ogni due o tre minuti di gioco (solo se stai giocando davvero) **lo slot chiama un evento**: bande
  nere da cinema, la camera vola davanti allo schermo girandoci intorno, i rulli girano, **l'ultimo
  rallenta** con il batticuore, esce l'evento e la camera torna al tavolo.
- 🌧 **Pioggia DaProd** (16 monete), ⚙️ **Frenesia** (12 s di spintori scatenati e buchi chiusi),
  🧲 **Calamita DaProd** (15 s in cui le monete uguali si impilano da sole). Durante l'evento non si
  lancia e il carrello si fa da parte.

### 💶 Lire o euro
- Chi arriva a **L.1.000.000** sblocca il tasto **€**: saldo, prezzi, barra delle monete e negozio si
  leggono in euro (1 € = L.1.936,27). Con lo stesso tasto (o `V`) si torna alle lire.

### 💬 Scritte meno ingombranti
- Su computer avvisi, **CATENA** e **ONDATA** stanno **ai bordi** (avvisi a sinistra, catene e ondate a
  destra), non più in mezzo al tavolo.
- Su telefono sono in **versione piccola** (al massimo due avvisi alla volta) e il nuovo tasto **💬**
  le spegne del tutto: restano solo gli avvisi importanti (saldo, sblocchi, eventi). Anche in opzioni
  e col tasto `H`.

### Sotto il cofano
- Salvataggio nuovo (`daprod_dozer_v4`): dalla 2.0 si tengono saldo (fino a L.500.000), statistiche,
  opzioni e raffica, con i tagli rimappati sul valore più vicino; il tavolo riparte nuovo perché la
  macchina è cambiata.
- Prove: **108 OK** (nuove: tagli e pile, pile che pagano il loro valore, catena di pile, calamita,
  profondità e spintori, abilità bloccate nella barra, meteora, turbo, muro, eventi, euro, scritte,
  migrazione dalla 2.0).

## [2.0.2] — 2026-09-23 · Il piano viola si riempie davvero 🟣🪙

### Risolto
- **Le monete lanciate scavalcavano il piano 1** e cadevano direttamente sul piano 2, lontano
  dall'anello di mira: per questo il piano viola restava vuoto e l'anteprima non corrispondeva al punto
  di caduta. Il bordo del piano 1 fa da "raschietto" per le monete sopra lo spintore del piano 2, e una
  moneta che in un solo passo di fisica attraversava la quota del piano veniva scambiata per una di
  quelle e spinta davanti al bordo. Ora raschietto e faccia degli spintori valgono solo per le monete
  che erano già a quella quota: chi sta cadendo si posa.
- Ora la moneta si posa esattamente sotto l'anello: sopra il primo spintore (che la riporta indietro e
  la lascia cadere davanti a sé) o sul panno viola, e da lì il tappeto del piano 1 si riempie e scorre.
  Adesso ogni moneta attraversa tutto il piano 1, quindi ci mette qualche secondo in più a scendere:
  con un lancio ogni mezzo secondo, dopo 30 secondi più di 8 monete su 10 sono già al piano 2 e il
  tappeto non cresce.
- Nuova prova: 16 monete lanciate, ognuna deve posarsi sul piano 1 dentro l'anello di mira.

## [2.0.1] — 2026-09-23 · Camera sistemata e app per Android, Windows e Mac 📱🪟🍎

### Risolto
- **Su telefono la macchina si vedeva enorme e spostata a destra.** Il canvas del gioco non aveva
  larghezza e altezza scritte nel CSS, e sugli schermi ad alta densità (quasi tutti i telefoni) si
  mostrava grande quanto i suoi pixel: 2-3 volte lo schermo, tagliato. Ora copre sempre esattamente lo
  schermo. Nuova prova su un telefono a densità 2,625 che controlla proprio questo.

### Il piano 1 conta davvero
- Il carrello lascia cadere la moneta **in fondo al piano 1**, davanti al primo spintore, e non più
  quasi sul bordo. Lo spintore ha una corsa più corta, così sul piano 1 resta un **tappeto di
  monete**: ogni moneta nuova ci entra da dietro e spinge giù quelle davanti, come nei piani sotto.
  Il tappeto non cresce: con un lancio ogni mezzo secondo, 9 monete su 10 sono già scese al piano 2
  dopo pochi secondi (lo controllano le prove).

### Le app
- Ogni release ora ha tre file da scaricare: **APK** per Android, **EXE** per Windows (portatile,
  doppio clic e si gioca) e **DMG** per Mac. Tutte contengono il gioco e three.js, quindi **funzionano
  anche offline**; il salvataggio resta sul dispositivo.
- **Tutto automatico**: quando su `main` arriva una versione nuova (quella scritta in `index.html`),
  GitHub Actions compila le tre app e pubblica da solo la release con le note di questo CHANGELOG.
  Su ogni PR le app vengono compilate come controllo.
- L'app Android è a tutto schermo e tiene lo schermo acceso; quella per computer va a schermo intero
  con F11.

## [2.0.0] — 2026-09-23 · Il remake: tre piani, fusioni e jackpot DaProd 🎰🪙

Rifatto da zero, dalla fisica alla grafica all'interfaccia.

### Tre piani a cascata
- La macchina ha ora **tre piani uno sotto l'altro**, ognuno col suo **spintore** che esce da sotto il
  piano di sopra (come nei coin pusher veri). Le monete cadono di piano in piano: dal carrello al
  **piano 1**, poi al **piano 2**, poi al **piano 3** e da lì nella **vasca delle vincite**.
- **Addio monete incastrate all'inizio**: niente più camera di carico e muro invisibile. Il piano 1 è
  un alimentatore: il suo spintore arriva fino al bordo e ogni moneta scende sempre al piano sotto
  entro una o due corse. Le prove lanciano 40 monete e controllano che in alto non ne resti nessuna.
- Chi arriva dall'alto **si posa sopra le altre** invece di essere spinto di lato: le pile nascono
  davvero, anche sui piani 2 e 3, quando le monete cadono dal bordo di sopra.
- Ai lati del piano 3 ci sono i **buchi della casa** (quello che ci cade non paga), che il
  potenziamento **Sponde laterali** accorcia fino a chiudere del tutto.

### Si sceglie la moneta, le monete si fondono
- **All'inizio si sceglie con quale moneta giocare**, e dalla barra in basso la si cambia quando si
  vuole. Ogni lancio costa il valore della moneta; nella vasca la moneta vale quanto costa.
- **Due monete uguali una sopra l'altra si fondono nel taglio più grande**: L.50 → L.100 → L.200 →
  L.500 → L.1.000 → L.2.000 → L.5.000 → L.10.000 → L.50.000 → L.100.000 → **Diamante da 1 MILIONE**.
  La moneta nuova fa un saltello e, se ricade su una uguale, **si fonde ancora (catena)** con bonus.
- I tagli più grandi si lanciano sbloccandoli: da soli quando crei per fusione un taglio due gradini
  sopra, oppure comprandoli (30 volte il loro valore).
- Tolti **Taglio di lancio** e **Forza di lancio**: il taglio lo scegli tu, la forza non serve più.

### Più roba da fare
- 🎰 **Gettone DaProd**: ogni tanto scende in regalo. Se cade nella vasca gira lo **slot sullo schermo
  della macchina**: coppia = 4 monete in regalo, tris = **pioggia di 12 monete**, tre loghi DaProd =
  **JACKPOT** con lire e pioggia di 26 monete grosse.
- 🫨 **Scossa**: fa saltare tutte le monete del tavolo (e quelle che ricadono sulle uguali si fondono).
  Si ricarica in 40 secondi.
- Potenziamenti nuovi o rifatti: ✨ Multi-lancio, ⚡ Raffica (tieni premuto), 🧲 Fusione magnetica
  (si fondono anche un po' storte), ⚙️ Motore spintori, 🧱 Sponde laterali, 💰 Vasca d'oro (+10% a
  livello), 🍀 Fortuna DaProd (più gettoni).
- **Bonus di cortesia**: se il saldo non basta nemmeno per una L.50, dopo qualche secondo arriva
  L.1.000 in regalo. Non si resta mai a secco.

### Grafica e interfaccia
- Cabinato nuovo in lacca viola e cromo, **insegna neon DaProd** che si accende sfarfallando,
  **schermo dello slot** con i rulli, lampadine che si rincorrono (e impazziscono quando vinci), led
  diversi per ogni piano, marchio DaProd su spintori, bordi, carrello, panni e frontale.
- **Bagliori** (bloom) sulle luci, mappa d'ambiente che fa brillare cromo e monete, pavimento lucido e
  luci sfocate della sala sullo sfondo. Ogni taglio ha faccia coniata, bordo zigrinato e le gemme
  (smeraldo, zaffiro, rubino, diamante) brillano di luce propria.
- **Inquadratura automatica**: la camera calcola da sola la distanza per far stare tutta la
  macchina, dall'insegna alla vasca, su computer e telefono.
- HUD nuovo (saldo che scorre, vinto, fusioni, taglio record), barra delle monete con icone, avvisi,
  scritte volanti, **ONDATA** di vincite, **CATENA** di fusioni e schermata **JACKPOT**.
- Negozio con quattro schede: potenziamenti, monete (con la **tabella delle fusioni** da collezionare),
  opzioni (audio, qualità alta/media/bassa, qualità automatica, FPS) e statistiche.
- Il tavolo viene salvato: riaprendo il gioco ritrovi le monete dove le avevi lasciate. Chi arriva
  dalla 1.x trova i vecchi premi convertiti in lire (×20).

### Sotto il cofano
- Fisica 2,5D nuova, a passo fisso (120 al secondo) con griglia spaziale; le monete si disegnano con
  una InstancedMesh per taglio, quindi centinaia di monete costano pochissimo.
- Prove automatiche riscritte da zero (`test/prove.mjs`), con un server comune (`test/servi.mjs`) che
  serve three.js e i suoi addon da `node_modules` se ci sono.

## [1.7.0] — 2026-09-23 · La vasca profonda e le torri che crollano 🏗️🪙

### Un tavolo più profondo
- Il campo delle lire è **più lungo**: il bordo dei premi passa da z −5 a **−6,2**. Più spazio fra il
  ripiano e il bordo, una pila più grande (185 lire all'avvio invece di 150) e posto per le torri.
- Il tavolo è una **vasca**: le sponde salgono sopra il feltro con pareti scure, bordo d'ottone e un
  filo di luce. Prima erano allo stesso livello del panno e il campo sembrava una tavola piatta.
- Sotto al bordo dei premi c'è la **vaschetta**, con orlo d'ottone e una luce calda: le lire vinte si
  vedono cadere dentro.
- Il ripiano spinge più avanti (fino a −1,4) con la stessa corsa di prima; la camera si è
  allontanata quanto basta per vedere tutto, bordo e vaschetta compresi, anche da telefono.

### Le torri che crollano
- All'avvio ci sono **3 torri di lire in piedi** sul campo, alte 10 piani, con la cima in L.500.
- Le lire hanno un **peso**: cresce col taglio (la L.100 pesa 1, la L.1.000.000 più di 4). Negli
  urti la lira pesante sposta di più e si sposta di meno.
- Quando una lira urta forte una pila, **dalla cima si staccano dei pezzi**: 1 con la L.100, e uno in
  più per ogni taglio sopra. Più alto il taglio che inserisci, più la torre crolla. Dai 2 pezzi in
  su compare la scritta **CROLLO**.
- Quando in piedi ne restano meno di due, **ne sale una nuova** (🏗️ NUOVA TORRE).
- Le torri di casa non pagano il bonus torre: sono il bersaglio, non una vincita regalata.

### Sotto il cofano
- Correzione: per decidere chi colpisce chi, l'urto guarda le velocità **prima** del contatto.
  Guardandole dopo, fra due lire uguali la colpita risultava più veloce della colpitrice.
- Prove: **102 OK** (8 nuove: vasca, peso dei tagli, torri all'avvio, una L.100 e una
  L.1.000.000 lanciate contro la stessa torre, torre che risale). Le misure legate al tavolo ora
  partono dal bordo dei premi e non da numeri fissi. `test/foto.mjs` fotografa il tavolo dopo
  qualche secondo di gioco, su computer e telefono.

## [1.6.0] — 2026-09-19 · Sette tagli, carte da collezione e la meteora ♠☄️

### Le lire cadono davvero in fondo
- La **fessura di lancio** si è spostata **in fondo a tutto** (z 3,95), sulla nuova **camera di
  carico**: è esattamente la fascia che avevi cerchiato in rosso. Prima cadevano a metà ripiano.
- Davanti alla camera c'è un **muro (quasi) invisibile con un taglio in basso**: una lira che sta
  ancora rimbalzando o volando resta dentro, e passa in gioco **solo quando si è posata piatta**.
  Niente più lire che schizzano sul campo appena toccano terra.
- La camera è in **leggera pendenza**: le lire posate scivolano piano verso il taglio ed entrano
  in fila, una dopo l'altra. Una luce dedicata illumina la zona, prima restava al buio.
- Le **torri** non si pagano più dentro la camera di carico: lì le lire si accatastano solo perché
  fanno la fila, e premiarle era un regalo.

### Sette tagli, dal 100 al MILIONE
| Taglio | Paga | Taglio | Paga |
| --- | --- | --- | --- |
| 🟤 L.100 | 1 | ⚪ L.10.000 | 15 |
| ⚪ L.500 | 3 | 🟢 L.100.000 | 40 |
| 🟡 L.1.000 | 6 | 🟣 L.500.000 | 100 |
| | | 🔴 **L.1.000.000** | **250** |

Ogni taglio ha grandezza, colore e scritta sue. Il potenziamento **TAGLIO DI LANCIO** sale di
gradino in gradino: ogni salto costa ~3,4 volte il precedente e paga ~2,5 volte di più.

### ♠ Carte speciali
- Ogni tanto dalla fessura scende una **carta** invece di una lira: **JOLLY ★**, **PICCHE ♠**,
  **CUORI ♥**, **QUADRI ♦**, **FIORI ♣** (il jolly è il più raro).
- Le carte **non pagano premi**: quando cadono dal bordo **te le tieni**, e serviranno a
  **riscattare premi** (in arrivo). Il conteggio per tipo è nel negozio, scheda 🎁 SBLOCCABILI.
- Sul tavolo ce ne possono stare **al massimo 5 alla volta**, e il riciclo non le ritira mai.
- Nuova casella ♠ CARTE nell'HUD, che compare appena ne prendi una.

### ☄️ Il cannone diventa METEORA
- Con il cannone acceso si **mira dove si vuole sul tavolo**, profondità compresa (il vecchio
  sistema di mira), e cade una **meteora** che smuove la pila per bene.
- Mentre il cannone è acceso **non si lanciano lire**: è una modalità a sé.
- La ricarica è di **5 minuti**. Appena usata, **il cannone si spegne da solo** e torni subito a
  mettere le lire. Il chip mostra il tempo che manca, e la ricarica scorre anche a gioco chiuso.
- **POTENZA METEORA** ora rende l'impatto più violento **e accorcia l'attesa** (15 secondi per
  livello, da 5:00 fino a 2:30).
- La ⚡ RAFFICA resta come prima, accendibile e spegnibile quando vuoi.

### Risolto
- **I jolly non contavano nel tetto delle 5 carte**: il jolly ha indice 0 e il controllo
  `if (m.carta)` lo scartava come valore falso. Trovato dai controlli automatici.
- Il mirino finiva **sepolto sotto le lire**: ora si disegna sempre sopra al tavolo, e con la
  meteora è più grande e pulsa.

### Test
- I controlli automatici salgono a **94**: fessura in fondo, muro che trattiene chi non si è
  posato, 7 tagli con premio e grandezza crescenti, tetto delle 5 carte, carte che si collezionano
  senza pagare premi, meteora che spinge la pila, che non lancia lire, che spegne il cannone e che
  non riparte prima dei 5 minuti. La combo viene verificata guardandola **ricadere davvero** a ogni
  corsa del ripiano, invece che con un rapporto ballerino.

## [1.5.0] — 2026-09-19 · Il dozer funziona come quello vero 🪙⚙️

### Come si gioca adesso
- **Si sceglie solo la COLONNA**: tocchi (anche davanti, dove ti è comodo) e conta solo la
  posizione **orizzontale**. La profondità non si sceglie più: la lira scende **sempre dalla
  fessura in fondo**, sopra al ripiano. Una guida verticale mostra la colonna scelta.
- **Il ripiano è diventato un vero ripiano**: rialzato di un gradino e **lungo fino in fondo alla
  macchina**, così dietro non resta mai scoperto (è la zona che avevi cerchiato in rosso).
  Dietro c'è anche un **ripiano fisso** che chiude il fondo fino al muro.
- **Il meccanismo vero**: quando il ripiano avanza si porta dietro le lire; quando torna indietro
  **sfila via da sotto** e le lire **cadono giù sul campo**, dove la faccia del ripiano le spinge
  verso il bordo dei premi. Esattamente il ciclo di una macchina da sala.

### Risolto
- **Le lire si "univano" fra loro**: qualsiasi lira che sfiorava un'altra le saltava sopra (bastava
  il 78% del raggio) e poi ci scivolava sopra al 10% a fotogramma, come una calamita. Ora ci si
  appoggia solo se si è **davvero sopra** (62%), chi poggia sul bordo **scivola giù** e chi è ben
  centrata si assesta piano.
- **Le lire finivano sempre troppo avanti**: sul ripiano si sommavano *velocità* e *spostamento*,
  quindi correvano al **doppio** della velocità del ripiano e superavano il punto dove le avevi
  lasciate. Ora viaggiano esattamente alla sua velocità.
- **Le lire si accumulavano davanti lasciando vuoto il fondo**: il pusher spingeva solo fra
  z 1,15 e 3,9, cioè **dietro alla pila** (che sta fra -5 e 1): non la toccava mai. Ora la corsa
  attraversa il campo e spinge davvero la pila.
- **La spinta non arrivava al bordo**: l'attrito del tavolo era così forte che una lira spinta si
  fermava dopo pochi centimetri. Ora l'attrito è più basso e la separazione fra lire viene
  ripetuta 3 volte per passo, così la spinta **attraversa la pila** di lira in lira.
- **La pila era troppo rada** perché la spinta viaggiasse: la pila iniziale passa da 96 a
  **150 lire**, fitte come in una macchina vera.
- La scritta della zona di lancio e il logo sul feltro si leggevano **capovolti**.

### Equilibrio
- La **combo si azzera a ogni corsa del ripiano**: con il flusso continuo non si azzerava mai e
  regalava il bonus massimo su ogni singola lira. Ora premia l'**ondata** (misurato tenendo premuta
  la raffica: da 5,5 a 4,6 premi per lira). Finestra della combo da 2,6 s a 1,5 s.
- Misurato su 6 minuti di gioco continuo: il tavolo si **stabilizza da solo** attorno a 100 lire in
  scena, con quello che entra uguale a quello che esce, e la pila resta appoggiata al bordo dei premi.

### Interfaccia
- **Muro di fondo** della macchina, con filo di luce sul bordo alto: chiude la scena e nasconde la
  coda del ripiano che entra ed esce da sotto.
- **Targa DaProd alzata** sopra il muro, come l'insegna di una macchina da sala.
- Il ripiano non è più una lastra grigia: **acciaio spazzolato** con le frecce del senso di marcia.
- Il faro punta sulla **pila** invece che sul ripiano, e il logo sul feltro è stato spostato dove
  si vede davvero.
- La fessura di lancio è una **striscia luminosa** in fondo, con la scritta dritta.

### Test
- I controlli automatici salgono a **75** e coprono la nuova meccanica: la lira scende sempre dalla
  fessura, la colonna scelta viene rispettata e limitata, si atterra sul ripiano rialzato, il ripiano
  porta avanti le lire e poi le lascia cadere, nessuna lira resta intrappolata dietro, e giocando
  90 secondi le lire cadono davvero dal bordo con la pila che non cresce all'infinito.

## [1.4.0] — 2026-09-19 · Lire davvero infinite, gioco più fluido, abilità spegnibili ♻️⚡

### Risolto
- **Addio "TAVOLO PIENO"**: quel messaggio non esiste più e il lancio non viene **mai** rifiutato.
  Quando in scena ci sono troppe lire, il tavolo **ritira da solo quelle in fondo** ♻️ (le più
  lontane dal bordo dei premi, quelle che non stavi guardando), facendo spazio a quelle nuove.
  Provato anche buttando dentro 900 lire tutte insieme: il tavolo rientra da solo e si continua a giocare.
- **Le abilità ora si spengono**: se tocchi il chip di un'abilità **già accesa**, quella si spegne e
  **non se ne riaccende un'altra al posto suo**. Resta il **TIRO SEMPLICE**: click = una lira, senza
  cannone e senza raffica. Prima, spegnendo la raffica, si riaccendeva da solo il cannone.
- **Tocco veloce col cannone acceso**: prima non succedeva niente, ora parte un lancio normale.
- **Perdita di prestazioni nelle partite lunghe**: l'elenco interno delle lire non veniva mai
  ripulito e cresceva a ogni lira vinta (dopo 3 minuti conteneva 1535 voci per sole 242 lire vere),
  rallentando il gioco sempre di più. Ora le lire vinte escono subito dall'elenco.
- Le scorciatoie `F`, `M`, `I`, `T` non fanno più comparire "prima sbloccalo nel negozio":
  quelle abilità sono passive e non hanno un interruttore. Restano `C`, `R`, `A` e `B`.

### Equilibrio del gioco
- **Raffica tenuta premuta**: partiva **una raffica di lire per ogni colpo** (il multi-lancio si
  moltiplicava con la cadenza, fino a 5 lire × 15 colpi al secondo), il tavolo veniva sommerso e
  le lire cadevano fuori a valanga regalando premi a raffica. Ora:
  - a raffica parte **1 lira per colpo** (il multi-lancio vale per il click normale);
  - la cadenza scende da `3 + 2 × livello` a `2,5 + 1,1 × livello` lire al secondo;
  - le lire sparate a raffica **spingono meno** (45% della forza), niente più valanghe;
  - il **bonus combo si ferma a +5** (prima cresceva all'infinito: nelle prove una lira da L.100
    arrivava a pagare **11,5 premi** invece di 2).
  - Risultato misurato tenendo premuto 20 secondi al massimo potenziamento: da **47,6 a 27,2
    premi al secondo**, e soprattutto ora è un valore **con un tetto**, non una cifra che sale
    finché tieni premuto.

### Prestazioni
- **Nuova griglia spaziale nella fisica**: prima ogni lira veniva confrontata con **tutte** le
  altre (con 300 lire: ~180.000 confronti a fotogramma). Ora ogni lira guarda solo le 9 celle
  attorno a sé. Misurato in partita continua: **2,4× più veloce dopo 1 minuto** e **3,3× dopo 3
  minuti** (2,97 → 0,91 ms per fotogramma), con il vantaggio che cresce più giochi.
- **Meno lavoro inutile a ogni fotogramma**: l'HUD si riscrive solo quando un numero cambia
  davvero, le particelle hanno una lista dei posti liberi (niente più ricerca a ogni scintilla),
  la camera non alloca più un vettore nuovo 60 volte al secondo, il ridimensionamento della
  finestra viene accorpato.
- **Tetto ai fuochi d'artificio**: massimo 14 testi volanti insieme e **un solo lampo** per volta,
  così una pioggia di vincite non intasa più la pagina.
- **Telefono più leggero di serie**: antialias hardware spento, **ombre spente**, mappa d'ombra
  a metà risoluzione. Il tetto delle lire in scena sale comunque da 150 a **170** (da 260 a **300**
  su desktop).

### Aggiunto
- **Scheda ⚙️ OPZIONI nel negozio**: 🔊 audio, 🌓 **ombre** on/off, ✨ **effetti** (pieni / ridotti /
  nessuno), 🎛️ **qualità automatica** (se il gioco rallenta abbassa da sola la risoluzione e la
  rialza appena torna fluido) e 🏞️ **contafotogrammi** nell'HUD. Tutto si salva.
- **Pillola della modalità** sotto il tavolo: accanto al taglio in uso c'è sempre scritto se stai
  giocando in **CANNONE**, **RAFFICA** o **TIRO SEMPLICE**.
- I chip delle abilità scrivono **ON / OFF** e la cadenza della raffica.
- Statistiche nuove: lire in scena, **lire ritirate dal tavolo** ♻️ e modalità in uso.
- **Controlli automatici nel repository** (`test/prove.mjs`, 62 prove su desktop, telefono e
  salvataggio vecchio): si lanciano con `node test/prove.mjs`.

### Interfaccia
- **In verticale si vede tutto il tavolo**: prima le sponde laterali restavano fuori schermo, ora
  la camera arretra quanto serve (fino a 2,1×) e il bordo dei premi è sempre in vista.
- Il **suggerimento non copre più il gioco**: è una riga sola, sta sopra i chip (non più sovrapposto)
  e **sparisce da solo** al primo lancio o dopo 14 secondi.
- **Le 5 schede del negozio stanno tutte in riga** e non vengono più tagliate in basso; su telefono
  la fila scorre di lato.
- Barre di livello più leggibili e chip delle abilità con lo stato spento ben visibile.

## [1.3.2] — 2026-09-19 · Negozio molto più leggibile 🛠️✨

### Migliorato
- **Righe del negozio ridisegnate**: icone grandi in una targhetta colorata, nome in bianco pieno,
  descrizione più chiara, **barra di livello con scritta dentro** e **pulsante del prezzo grande**
  (importo in evidenza + "compra ora" / "mancano N").
- **Si vede subito cosa puoi comprare**: le righe accessibili si **illuminano** (bordo e sfondo dorati),
  quelle al massimo diventano verdi, quelle troppo care dicono **"TI MANCANO N PREMI 🏆"**.
- **Barra di stato in cima al negozio** (sticky): 🏆 PREMI · 🪙 GETTONI · 🪙 TAGLIO in uso.
- **Sezioni con titolo** per orientarsi: `🪙 LIRE E TAGLI`, `🔋 PASSIVI · sempre attivi`,
  `💥 ATTIVE · una per volta`, `🔓 ABILITÀ E BONUS`, `🎨 PANNI DEL TAVOLO`.
- **Telefono**: testi più grandi, icone 30px, prezzo a tutta larghezza e allineato, niente più
  righe minuscole e illeggibili.
- Controlli automatici nuovi sulla resa del negozio (barra di stato, sezioni, icone, barre, avvisi).

## [1.3.1] — 2026-09-19 · Fix schermo nero 🛠️🚑

### Risolto
- **Gioco tutto nero con la GUI visibile**: con un **salvataggio esistente** il caricamento della
  partita andava in `ReferenceError` (una costante veniva letta prima di essere inizializzata),
  quindi il ciclo di render non partiva mai e restava solo la scena nera. Ora la partita parte sempre.
- I salvataggi delle versioni precedenti vengono **ripuliti e limitati ai valori validi**
  (taglio e record torre riportati nell'intervallo giusto) invece di rompere l'avvio.
- Aggiunta una **rete di sicurezza**: se in futuro qualcosa va storto appare un avviso rosso in alto
  con il messaggio d'errore, invece di un gioco nero senza spiegazioni.

### Test
- Nuova regressione automatica: il modulo viene avviato **con un salvataggio vecchio già presente**
  (potenziamenti, skin e feltri delle versioni precedenti): **35 test OK** su desktop, 35 su desktop
  con salvataggio e 35 su telefono con salvataggio.
## [1.3.0] — 2026-09-18 · Tagli, torri da 30 piani e skill passive 🪙🏗️

### Aggiunto
- **4 TAGLI di lira** con dimensione, colore e scritta propri, incisi sulla faccina:
  - 🥉 **Bronzo L.50** (piccola, paga 1)
  - 🥈 **Argento L.100** (media, paga 2)
  - 🟡 **Oro L.500** (grande, paga 5)
  - ⚪ **Platino L.1000** (extra-large, paga 10)
- **Potenziamento TAGLIO DI LANCIO**: cambi il taglio che lanci (L.100 → L.500 → L.1000) e
  ogni lira vinta paga il **valore del suo taglio**. HUD e moneta fantasma mostrano il taglio in uso.
- **Torri fino a 30 PIANI** (prima max 4): le lire si impilano una sull'altra, con bonus crescente
  dal 4° piano, festa dai 10 piani e **record torre** salvato e mostrato nel negozio.
- La pila iniziale (96 lire) è **mista**, come nelle macchine vere: tante piccole, alcune grandi.

### Cambiato
- **ABILITÀ ATTIVE**: nella barra restano solo **💥 CANNONE** e **⚡ RAFFICA**, e
  **una esclude l'altra** (accendendo una si spegne l'altra). Di serie è attivo il cannone.
- **ABILITÀ PASSIVE** (sempre attive, senza interruttore): 💪 Forza di lancio, ✨ Multi-lancio,
  🪙 Ricarica gettoni, 🏗️ Torri. Sono elencate nella scheda 🎚️ ABILITÀ e marcate `PASSIVA` nel negozio.
- **Rimossa la SPAZZATA**: non si eliminano più lire dal tavolo (né dal mucchio né dal bordo).
  Se il tavolo è pieno il lancio viene semplicemente rifiutato con un avviso, e riprende appena
  il bordo si svuota. Tetto di sicurezza alzato a 260 lire (150 su telefono).
- **Rimosse le skin** Oro/Argento/Rubino/Arcobaleno: sostituite dai tagli, che ora distinguono
  davvero le lire (dimensione + colore + valore scritto).
- Statistiche aggiornate: torre record x/30, taglio in uso, niente più "lire spazzate".

### Risolto
- Comprare un'abilità la attiva spegnendo l'altra (prima potevano risultare attive entrambe).

## [1.2.2] — 2026-09-18 · Gettoni sempre in ricarica 🪙♾️

### Risolto
- **Il gioco non si bloccava più, adesso non si blocca davvero**: la ricarica dei gettoni non è
  più legata all'interruttore IDLE (se lo si spegneva, i gettoni finivano e non si poteva più
  giocare). Ora il caricatore si riempie **sempre**: velocità base 1,2 gettoni/s e capacità base 16
  (prima 0,55/s e 12). Il chip 🪙 GETTONI è diventato un indicatore "SEMPRE ATTIVA".
- **La spazzata non toglie più lire dal mucchio**: spazza solo le lire già arrivate sul bordo di
  caduta (quelle che stavano per cadere) e le **paga**. Il tavolo resta pieno, niente più mucchi
  che si svuotano.
- **Telefono, negozio sistemato**:
  - l'elenco del negozio ora ha `min-height: 0` → **scorre davvero** (prima veniva tagliato e
    sembrava vuoto/non funzionante);
  - il negozio si apre con **click + touchend** (con scarto anti-doppio-tocco) sia dal pulsante
    ▲ NEGOZIO sia **toccando il riquadro 🏆 PREMI**;
  - anche schede e bottoni del negozio rispondono al tocco;
  - zone separate in basso: chip a sinistra, ▲ NEGOZIO e ◎ SPARA a destra;
  - `touch-action: manipulation` su tutti i pulsanti (tocco immediato, niente zoom da doppio tap).
- **Versione visibile nell'HUD** (`SALA SLOT · v1.2.2`): serve a capire subito se il telefono sta
  usando la versione nuova o una copia in cache.

### Modificato
- Limite lire in scena: **200 su desktop**, **130 su telefono** (profilo misurato: 152 fps a 200 lire,
  298 fps a 130 lire, quindi sempre fluido).

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
