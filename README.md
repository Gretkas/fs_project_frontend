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

