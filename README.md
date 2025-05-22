# NYX Makeup Products - Interactive Single Page Application

## projectbeschrijving

Dit project is een interactieve single paga applicatie die producten van het make-ip merk NYX toont. De applicatie haalt gegevens op van de Makeup API en presenteert deze in een gebruiksvriendelijke interface. Gberuikers kunnen door de producten bladeren, zoeken, filtreren op type en prijs, sorteren op prijs van de goedkoopste naar de duurste en favoriete producten opslaan. De applicatie applicatie biedt ook een licht en donker thema en is volledig reponsive voor verschillende schermformaten

De applicatie is ontwikkeld als onderdeel van een Web Advanced Project, met focus op de moderne webontwikkelingstechnieken, API-integratie en een gebruiksvriendelijke interface.

## Functionalitieten

## Producten weergave
De applicatie toont NYX make-up producten in een overzichtelijk grid-layout. Elk product wordt weergegeven in een kaart met afbeelding, naam, prijs, type, beschikbare kleuren en beschrijving. De producten worden opgehaald via de MMakeup API.

## Zoekfunctie 
Gebruikers kunnen zoeken naar producten op basis van naam, beschrijving of type. De zoekfunctie is toegankelijk via een zoekbalk bovenaan de pagina.

## Filtering 
De applicatie biedt verschillende filteropties:
- Filter op producttype (blush, bronzer, eyebrow, eyeshadow, foundation, lip liner, lipstick, mascara, eyeliner)
- Filter op maximale prijs met een schuifregelaar
- Combinatie van filters is mogelijk (bijvoorbeeld zoeken naar lipstick onder €10)

## Sorteren
Gebruikers kunnen producten sorteren op prijs (van laag naar hoog) met een speciale sorteerknop. Dit helpt bij het vinden van de budgetvriendelijke opties.

## Favorieten 
Gebruikers kunnen producten markeren als favoriet door op het harticoon te klikken. Favoriete producten worden opgeslagen in de lokale opslag van de browser, zodat ze bewaard blijven tussen sessies. Er is een speciale "Favorieten" knop om alleen de favoriete producten te tonen.

## Thema-schakelaar 
De applicatie biedt een licht en donker thema. Gebruikers kunnen tussen deze thema's schakelen via een dropdown menu.
De themavoorkeur wordt opgeslagen in de lokale opslag van de browser.

## Responsive Design 
De applicatie is volledig responsive en past zich aan verschillende schermformaten aan:
- Op mobiele apparaten (max-width: 600px) worden de producten in één kolom weergegeven
- Op tablets (601px - 900px) worden de producten in twee kolommen weergegeven
- Op desktops (>900px) worden de producten in een dynamisch grid weergegeven

## Gebruikte API's

### Makeup API
- **URL**: [http://makeup-api.herokuapp.com/](http://makeup-api.herokuapp.com/)
- **Endpoint gebruikt in project**: `http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx`
- **Beschrijving**: Deze API biedt toegang tot een uitgebreide database van make-up producten van verschillende merken. In dit project worden specifiek de producten van het merk NYX opgehaald.

- **Implementatie**: De API wordt aangeroepen in `main.js` (regel 6) en de data wordt opgehaald in de `fetchData()` functie (regel 51-70).

- **CDN gebruikt in project**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css`
- **Beschrijving**: Font Awesome biedt een bibliotheek van vectoriconen die in het project worden gebruikt voor de hartpictogrammen (favorieten) en GitHub-link.
- **Implementatie**: De Font Awesome bibliotheek wordt geladen in `index.html` (regel 9).

## Implementatie van technische vereisten

### HTML5 Semantische elementen
- **Implementatie**: De applicatie maakt gebruik van semantische HTML5-elementen zoals `<header>`, `<footer>`, `<section>`, en `<article>`.
- **Locatie in code**: `index.html` (regel 15-106)
- **Beschrijving**: Semantische elementen worden gebruikt om de structuur van de pagina duidelijk te maken, wat bijdraagt aan toegankelijkheid.

### CSS Styling en Animaties
- **Implementatie**: De applicatie gebruikt moderne CSS3-technieken zoals flexbox, grid, variabelen, en transities.
- **Locatie in code**: 
  - CSS-variabelen: `style.css` 
  - Flex: `style.css` (regel 27-318)
  - Grid: `style.css` (regel 45-55 en 331)
  - Transities: `style.css` (regel 26,77 en 163)
- **Beschrijving**: Deze technieken zorgen voor een moderne, flexibele layout en vloeiende animaties.

### JavaScript Features
- **Implementatie**: De applicatie maakt gebruik van moderne JavaScript-features zoals arrow functions, template literals, destructuring, en async/await.
- **Locatie in code**:
  - Arrow functions: `main.js` (regel 142, 192, 207-211, 235-238,249, 276-286, 290, 363, 385-399, 416_432)
  - Template literals: `main.js` (regel 109-119,139-140)
  - Async/await: `main.js` (regel 51_70)
  - constante: `main.js` (regel 6-35, bij de functies)
  - Iterate over Arrays: `main.js` (regel 105,200)
  - Array methodes: `main.js` (regel 110)
  - conditionate ternary: ` main.js` ( regel 193-195, 343) 
  - callback functions: `main.js` (regel 336)
  - Observer API: `main.js` (regel 121-124, 336)
- **Beschrijving**: Deze moderne JavaScript-features maken de code beknopter, leesbaarder en makkelijker te onderhouden.

### Responsive Design
- **Implementatie**: De applicatie past zich aan verschillende schermformaten aan met behulp van CSS media queries.
- **Locatie in code**: `style.css` (regel 295-324)
- **Beschrijving**: De layout verandert afhankelijk van de schermgrootte, wat zorgt voor een optimale gebruikerservaring op alle apparaten.

- **Implementatie**: De applicatie slaat gebruikersvoorkeuren op in localStorage.
- **Locatie in code**:
  - Themavoorkeur: `main.js` (regel 163-171)
  - Filterinstellingen: `main.js` (regel 318,324)
  - Favoriete producten: `main.js` (regel 345,351)
- **Beschrijving**: Door gebruik te maken van localStorage blijven gebruikersvoorkeuren bewaard tussen sessies.

### Fetch API voor data ophalen
- **Implementatie**: De applicatie gebruikt de Fetch API om gegevens op te halen van de Makeup API.
- **Locatie in code**: `main.js` (regel 51)
- **Beschrijving**: De Fetch API wordt gebruikt voor asynchrone communicatie met de server, wat zorgt voor een soepele gebruikerservaring zonder pagina-verversingen.

### Event Listeners
- **Implementatie**: De applicatie gebruikt event listeners om te reageren op gebruikersinteracties.
- **Locatie in code**: `main.js` (regel 146, 385-457)
- **Beschrijving**: Event listeners zorgen ervoor dat de applicatie interactief is en reageert op gebruikersacties zoals klikken, typen en selecteren.

## Instalatiehandleiding

### Vereisten
- Een moderne webbrowser (Chrome, FireFox, Safari, Edge)
- Internetverbinding (voor het ophalen van de API-gegevens en externe bronnen)

###Installatie 
1. clone de repository naar je lokale machine: 
https://github.com/NolweenS/Interactive-Single-Page-Application-

2. Navigeer naar de projectmap:
   ```
   cd Interactive-Single-Page-Application-
   ```

3. Open het project in je favoriete code-editor (optioneel).

### Uitvoeren
Er zijn verschillende manieren om de applicatie lokaal uit te voeren:

#### Methode 1: Direct openen
Open het `index.html` bestand in je webbrowser.

#### Methode 2: Lokale server
Als je een lokale server wilt gebruiken (aanbevolen voor ontwikkeling), kun je bijvoorbeeld Live Server in VS Code gebruiken:
1. Installeer de Live Server extensie in VS Code
2. Klik met de rechtermuisknop op `index.html` en selecteer "Open with Live Server"

### Mogelijke problemen en oplossingen

- **API niet beschikbaar**: Als de Makeup API niet beschikbaar is, zal de applicatie geen producten kunnen weergeven. Controleer de API-status of probeer het later opnieuw.

## Screenshots van de applicatie

##Hoofdpagina 
![Hoofdpagina met productoverzicht](./screenshots/Capture%20d'écran%202025-05-22%20121420.png) 
![Tweede screenshot](./screenshots/Capture%20d'écran%202025-05-22%20121442.png)

![Footer](./screenshots/Capture%20d'écran%202025-05-22%20121819.png)

##Zoek functie in werking 

![Zoek mascara en toont de resultaten](./screenshots/Capture%20d'écran%202025-05-22%20121755.png)

![Tweede screenshot](./screenshots/Capture%20d'écran%202025-05-22%20121808.png)

##Filterfunctionaliteit
![filter op producttype](./screenshots/Capture%20d'écran%202025-05-22%20122052.png)

![Filter op producttype en prijs](./screenshots/Capture%20d'écran%202025-05-22%20122134.png)

![Sorteerfunctie op prijs van goedkoopste naar duurste](./screenshots/Capture%20d'écran%202025-05-22%20124847.png)

![Tweede screenshot de duurste prijzen zijn beneden](./screenshots/Capture%20d'écran%202025-05-22%20124824.png)

## Favorieten weergaven
![Klikken op het hart icoon](./screenshots/Capture%20d'écran%202025-05-22%20122229.png)

![Favorieten overzicht](./screenshots/Capture%20d'écran%202025-05-22%20122250.png)

## Donkere thema
![Applicatie in donkere thema](./screenshots/Capture%20d'écran%202025-05-22%20122333.png)

![Tweede screenshot](./screenshots/Capture%20d'écran%202025-05-22%20122350.png)

## Mobiele weergave

![Responsive design op mobiel](./screenshots/Capture%20d'écran%202025-05-22%20122815.png)

![Tweede screenshot](./screenshots/Capture%20d'écran%202025-05-22%20122825.png)

![Tweede mobiel](./screenshots/Capture%20d'écran%202025-05-22%20122845.png)

![Ipad weergave](./screenshots/Capture%20d'écran%202025-05-22%20122904.png)

## Gebruikte bronnen
- [Favorieten](http://informatica.haperen.com/html/javascript3.htm) 
- [placeholder](https://placehold.jp/en.html)


### API's en bibliotheken
- [Makeup API](http://makeup-api.herokuapp.com/) - Voor het ophalen van make-up productgegevens
- [Font Awesome](https://fontawesome.com/) - Voor iconen zoals hartjes en GitHub-logo
- [Web icoon](https://www.flaticon.com/free-icon/makeup_2798018?related_id=2798003&origin=search)

### Referenties en tutorials
- MDN Web Docs - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) en [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) referenties
- CSS-Tricks - [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- CSS-Tricks - [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- W3Schools - [JavaScript Tutorial](https://www.w3schools.com/js/)
- W3Schools - [CSS Tutorial](https://www.w3schools.com/css/)

### AI chatlog 
 - [Manus.AI](https://manus.im/app/oemv2h3n7t7wzTJmJPIPwj)
 - [ChatGPT](https://chatgpt.com/c/682b5f0a-a8ac-8008-804f-ea31204c50d4)
 - [ChatGPT](https://chatgpt.com/c/682b8097-22b0-8008-82e7-e52b040018b2)
 - [ChatGPT](https://chatgpt.com/c/6822200d-1568-8008-b2e6-fa88ee044503)
 - [CHatGPT](https://chatgpt.com/c/682efe80-5454-8008-9f1b-7d855c80f786)
 - [CHatGPT](https://chatgpt.com/c/682ed067-d8dc-8008-b278-764e846a3816)
 - [CHatGPT](https://chatgpt.com/c/682ec0b7-b440-8008-a555-173d90328024)

 ## Auteur Nolween Sine

 ## Licentie
Dit project is gelicenseerd onder de MIT-licentie - zie het LICENSE bestand voor details.
