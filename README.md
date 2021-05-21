# fs_project_frontend
## Installasjon
Tatt fra systemutvikling 2 prosjekt, da installasjon vil fungere på samme måte 

Du trenger:

Git-klient

Node.js og NPM

/* I terminalen */
```
git clone https://github.com/Gretkas/fs_project_frontend.git
cd fs_project_frontend
npm install
npm start
```

Siden vil nå åpnes på localhost:3000.


## TypeScript + React
Noen komponenter i prosjektet har blitt utviklet med typescript og react. Dette har blitt gjort i komponenten TimeSelection som tilsvarer komponenten der du interaktivt velger tidspunktet for din reservasjon. Typescript har blitt brukt på grunn av my logikk som må utføres på klassene som håndterer de forskjellige tabellene. Typescript gir muligheten for å bruke typer på variabler og støtte for ENUMS og interfaces. Det gjør det veldig lett å definere hvilken type data som trengs i forskjellige metoder og for å verifisere bruker data av rett type. Den logiske og den visuelle komponenten har blitt separert, så den logiske komponenten skal ha liten denpendency på React. Dette gjør komponentene veldig lette å teste hver for seg, både for visuelle og logiske krav. Se src/components/timeselection/TimeSelectionTable.tsx. Her har Komponenten først blitt utviklet som en Funkjsonell react-komponent, men senere blitt gjort om til en typescriptkomponent for å gjøre det lettere å videreutvikle, forstå, teste og debugge komponenten. Første versjon er komponenten er market som @deprecated, men ikke slettet.

## Material-UI
For å gjøre det lettere å utvikle gode visuelle komponenter har vi brukt Material-ui. Dette hjelper oss å lage en sammenhengende brukeropplevelse, og for å dekke krav rundt aksessibilitet. 

## Create-React-App
Prosjektet er utviklet med CRA, og vil arve alle dependencies derifra, som Babel, Webpack og JUnit.

## Redux
For state Management bruker vi Redux og redux-thunks for å håndtere side-effect. Dette er spesielt brukt når vi henter data fra vårt API gjennom en service-tjeneste.

## Axios
For å håndtere og sende HTTP Requests bruker vi Axios.

## React+redux arkitektur

![redux-frontend-flow](https://user-images.githubusercontent.com/46557903/119188735-5ed9ae00-ba7b-11eb-9724-238c94fed8af.png)


Teamet har valgt å bruke redux for å håndtere dataflyten i applikasjonen. Redux har et helt klart rammeverk for hvordan data skal håndteres. De fleste handlinger som involverer data i applikasjonen skjer asynkront. For at den visuelle delen av applikasjonen ikke skal påvirkes av dette, kan den ikke være direkte knyttet til eventuelle kall som kjøres mot api-et. En redux dataflyt innebærer derfor å sende data i sirkel. Dette fungerer svært godt sammen med react, fordi react er bygd for å reagere dynamisk på endringer i data enhver komponent er knyttet til. Dette vil skje uavhengig av andre komponenter, slik at det kun skjer oppdateringer der det er nødvendig. 

Brukeren har kun muligheten for å sende “actions”. Enten vil brukeren gjøre det selv, eller så vil det gjøres når komponenter lastes inn. Dette vil håndteres av “action” metoder. “Actions” er ansvarlige for å sende korrekte dispatches med eller uten nyttelast til en “reducer” og å kommunisere med eventuelle “services”. Implementasjonen av en “service” er uvisst for en action metode. I vårt tilfelle vil services kun kommunisere med eksterne api-er. En action vil sende dispatches til reduceren underveis i operasjonen så global data kan oppdatere brukeren på hvordan en eventuell transaksjon utvikler seg.

Et viktig prinsipp for react-redux er immutabilitet i data, siden de begge bruker shallow equality checking. For at oppdateringsmodellen i React skal fungere effektivt, kan den ikke konstant sjekke hvordan dataen den er bundet til ser ut. Når en dispatch blir sendt til en reducer, vil den sjekke hvilken type det er, og enten returnere samme dataobjekt hvis det ikke trengs noen endringer, eller et nytt dataobjekt med endringer. Dette kan da sjekkes opp mot det originale dataobjektet ved hjelp av shallow equality checking, som er veldig effektivt når dataobjektene blir store. På denne måten trenger ikke systemet å lete etter endringer i data. Brukere vil få en umiddelbar oppdatering straks nye data er globalt tilgjengelig i applikasjonen. I tillegg gjør denne prosessen det enklere å holde styr på hva som gjør endringer i global data, noe som er tryggere.

Den overordnede arkitekturen teamet har fulgt på frontend er en MVP(Model-view-presentrer). I dette følger det at model(redux+services) står for datahåndtering i applikasjonen, presenter(Containers) inneholder logikk for hva som skal vises til brukeren og view(react) styrer hvordan dette skal vises til brukeren. (Fra fullstack prosjekt)

## Videre arbeid

- Mer sofistikert adminpanel
- Bedre tilbakemelding til brukere
- Forhindre admin at hen kan slette seg selv??
- Popup før man sletter ting
- Mer tanke på fargedesign
- Bedre utforming for større skjermer

