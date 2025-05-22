// We laden onze style.css hier 
import "./style.css"


// API ophalen: We maken hem constant en daar gaan we onze adres bewaren van de API-endpoint, waar we data ophalen
const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx";

// Hier spreken we onze HTML-elementen aan

// Hier gaan we onze "data-list" in onze HTML aanspreken, om daar de producten van de data te plaatsen
const dataList = document.getElementById("data-list");

//  we maken een filter constante op basis van de type product 

const filterType = document.getElementById("filter-type");

// Hier maken we een constant voor onze prijsfilter
const priceMaxInput = document.getElementById("price-max");
const maxPriceValue = document.getElementById("max-price-value");
const applyFilterButton = document.getElementById("apply-filter");

// hier plaatsen we onze sorteer constante
const sortPriceButton = document.getElementById("sort-price-low-high");
//hier plaatsen we onze resetknop
const resetButton = document.getElementById("reset-button");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// De element voor de thema-selector
const themaSelect = document.getElementById("thema-select");

// we maken een element voor het weergeven van de favoriet-knop en home knop
const showFavorites = document.getElementById("showFavorites");
const showAll = document.getElementById("showAll");


//Dti zijn de variabele voor onze data en status 

// we willen de data altijd opneiuw roepen das niet effciente dus we bewaren het data hier zodat we bij het filtreren,sorter,.. eenvoudiger data kunnen ophalen
let allProducts = [];

//we gaan onze let showingfavorites globaal declareren anders werkt het niet als we het buiten een functie willen gebruiken
let showingFavorites = false;

// we maken deze variabele zodat we bij het filteren van de producten bv. kunnen  sorteren op de filters zelf en niet all de producten laten filteren 
let huidigeProducten = [];


// We gaan data ophalen van onze NYX-API
async function fetchData() {

     try{
        // const response wacht dat fetchData de data bij de API heeft opgehaald 
      const response = await fetch(API_URL);
      
    // hier gaan we de response van de API_URL omzetten naar Json-data, om het later makkelijker te gebruiken 
      const data = await response.json();
      allProducts = data;
      toonProducten(data);

       //Hier gaan we de data uitprinten om na te kijken of alles klopt (debuggen)
      console.log(data);

    }catch (error){
      // Bij een fout melding wordt het hier opgenomen en kunnen we het met de console bekijken
      console.error(" Er ging iets mis bij het ophalen: " + error);
    }
    
  }

  //We gaan hier onze API producten laten ophalen in een lijst

  function toonProducten(products){
    //Hier geven we aan dat wanneer we het hebben over products, het over de huidige producten gaat
    huidigeProducten = products;
    console.log("Showing products:",products.length);
    dataList.innerHTML = ""; //geen spatie

    // We gaan de reultaat teller updaten na het zoeken van de resultaat
    const countElement = document.getElementById("count");
    countElement.textContent = products.length;

    //we gaan controleren of er een resultaat is
  const noResultsElement = document.getElementById("no-results");
const noFavoritesElement = document.getElementById("no-favorites");

if (products.length === 0) {
  // Detecteer of we op favorieten zitten door te kijken of showAll zichtbaar is
  if (showingFavorites) {
    noFavoritesElement.style.display = "block";
    noResultsElement.style.display = "none";
  } else {
    noFavoritesElement.style.display = "none";
    noResultsElement.style.display = "block";
  }
} else {
  noResultsElement.style.display = "none";
  noFavoritesElement.style.display = "none";
}


// een forEach loop zodat het over alle producten gaat lopen 
//We gaan HTML genereren voor elk product
    products.forEach(product => {

      // Hier gaan we onze kleuren bolletjes aan maken 
      const kleurenHTML = product.product_colors.length > 0
  ? `<div class="product-colors">` +
      product.product_colors.map(color =>
        `<span class="color-dot" style="background-color: ${color.hex_value}" title="${color.colour_name || color.hex_value}"></span>`
      ).join("") +
    `</div>`
  : "<em>Geen kleuren beschikbaar</em>";

      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      // we zetten onze innerhtml die we in de vorige stap hebben gemaakt hier zodat de filteroptie hier op kan werken
  productCard.innerHTML = `

  <img loading="lazy" 
     src="${product.image_link || 'public/placeholder_300x150.jpg'}" 
     alt="${product.name}" width="300"
     onerror="this.onerror=null;this.src='public/placeholder_300x150.jpg';" />
    <h3>${product.name}</h3>
    <p>Prijs: €${product.price || "?"}</p>
    <p>Merk: ${product.brand}</p>
    <p>Type: ${product.product_type}</p>
    <!-- We gaan ze hier in onze product-card plaatsen zodat ze visueel te zien zijn-->
    ${kleurenHTML}
     <p><strong>Beschrijving: </strong> ${product.description || "Geen beschrijving beschikbaar"}</p>
  `;
// We hebben hier een console geplaatst om zeker te zijn dat we met deze api de product kleuren kunnen ophalen 
console.log(product.name,"heeft kleuren", product.product_colors)
  
// Hier gaan we een ons favoriet eigenschap plaatsen en de harticoontje die we hebben opgehaald
  const heartButton = document.createElement("button");
  heartButton.classList.add("heart-button");

  const isFavorite = checkIfFavorite(product.id);
  heartButton.innerHTML = isFavorite
  ? `<i class="fa-solid fa-heart" style="color: #ddd1bd;"></i>`
  : `<i class="fa-regular fa-heart" style="color: #ddd1bd;"></i>`;

  heartButton.addEventListener("click", () => toggleFavorite(product.id,heartButton));
  productCard.appendChild(heartButton);
  
  dataList.appendChild(productCard);
    });
    

  }

  // Hier komt de functie om van thema (licht/donker) te veranderen 
  function changeTheme(){
    console.log("thema wordt gewijzigd naar:",themaSelect.value);
    if(themaSelect.value === "dark"){
    document.body.classList.add("dark-theme");
  }else {
    document.body.classList.remove("dark-theme");
  }

  localStorage.setItem("theme-preference", themaSelect.value);
  }



  //We maken een functie om de opgelasgen voorkeur bij het laden van de pagina bij te houden

  function loadThemePreference(){
    const savedTheme = localStorage.getItem("theme-preference");

    if(savedTheme){
      themaSelect.value = savedTheme;

      if(savedTheme === "dark"){
        document.body.classList.add("dark-theme");
      }
    }
  }

  // hier gaan we onze functie voor de zoek producten weergeven 
  function zoekProducten(){
    const zoekTerm = searchInput.value.toLowerCase();
    console.log("zoekTerm:",zoekTerm);

    // als de zoekterm leeg is,tonn alle producten
    if(zoekTerm === ""){
      zetFilters();
      return;
    }

    // we filteren de producten op basis van de zoekterm, maar we moeten controleren of de eigenschappen wel bestaan voordat je ze gebruikt

    let gezochteProducten = allProducts.filter(product =>{
   const nameMatch = product.name ? product.name.toLowerCase().includes(zoekTerm) : false;
   const descMatch = product.description ? product.description.toLowerCase().includes(zoekTerm) : false;
   const typeMatch = product.product_type ? product.product_type.toLowerCase().includes(zoekTerm) : false;
 
   return nameMatch || descMatch || typeMatch;
 });

    console.log("producten na zoeken filter:", gezochteProducten.map(product => product.product_type));
    
    const selectedType = filterType.value;
    const maxPrice = parseFloat(priceMaxInput.value);
    
    // Filter op type als er een type is geselecteerd
    if(selectedType){
      gezochteProducten = gezochteProducten.filter(product => product.product_type === selectedType);
    }

    //filter op prijs
    gezochteProducten = gezochteProducten.filter(product =>{
      const prijs = parseFloat(product.price);
      return !isNaN(prijs) && prijs <= maxPrice;
    });

    console.log("Gefilterde producten:", gezochteProducten.length);

    toonProducten(gezochteProducten);

  }


  // Hier maken we een filteroptie waarin we een schuifbalk gebruiken voor onze maximum prijs en de filter op type product wordt hier bij gezet
function zetFilters(){

 
  const selectedType = filterType.value;
  const maxPrice = parseFloat(priceMaxInput.value);

maxPriceValue.textContent = maxPrice;

  let filtered = allProducts;

  if(selectedType){
    filtered = filtered.filter(product => product.product_type === selectedType);
  }

  filtered = filtered.filter( product=>{
      const prijs = parseFloat(product.price);
      return !isNaN(prijs) &&  prijs <= maxPrice;
    }
  );

  toonProducten(filtered);
}

//We sorteren op prijs van goedkoopste naar duurste 
 function sorteerPrijsLaagste(){
    const sorted = [...huidigeProducten].sort((a,b) =>{
    const prijsA = parseFloat(a.price);
    const prijsB = parseFloat(b.price);
    // We gaan de producten met ongeldige prijs helemaal benenden zetten
    if(isNaN(prijsA)) 
      return 1;
    if (isNaN(prijsB))
      return -1;
    //We vergelijken de prijzen numeriek met elkaar
    return prijsA-prijsB;
  });
toonProducten(sorted);
  }

  // we gaan hier een nieuwe functie maken zodat we de zoekter,typefilter en prijsfilter allemaal de zelfde functie geven
  // Deze functie gaat ons helpen om te kunnen sorteren op de huidige producten en niet alleen alle producten samen 

  function zetFiltersEnZoek(){

    const zoekTerm = searchInput.value.toLowerCase();
    const selectedType = filterType.value;
    const maxPrice = parseFloat(priceMaxInput.value);

    let gefilterd = allProducts;

// We passen de zoekfilter aan 
    if(zoekTerm !==""){
      gefilterd = gefilterd.filter(product =>{
        const nameMatch = product.name?.toLowerCase().includes(zoekTerm) || false;
      const descMatch = product.description?.toLowerCase().includes(zoekTerm) || false;
      const typeMatch = product.product_type?.toLowerCase().includes(zoekTerm) || false;
      return nameMatch || descMatch || typeMatch;
      });
    }

    //We passen het typefilter aan 
     if (selectedType) {
    gefilterd = gefilterd.filter(product => product.product_type === selectedType);
  }

  //We passen de prijsfilter aan 
  gefilterd = gefilterd.filter(product => {
    const prijs = parseFloat(product.price);
    return !isNaN(prijs) && prijs <= maxPrice;
  });
  toonProducten(gefilterd);
  }


  function resetFilters(){
    filterType.value = ''; // de keuze van onze product type resetten
    priceMaxInput.value = priceMaxInput.max; //onze schuifbalk resetten
    maxPriceValue.textContent = priceMaxInput.max;
    searchInput.value = "" //zoekbalk resetten
    zetFiltersEnZoek();
    saveFilters();
}


// we maken een functie om de filters van de gebruiker op te slaan  in localStorage
function saveFilters(){
  const filters = {
    productType: filterType.value,
    maxPrice: priceMaxInput.value
  };
  
  localStorage.setItem("makeup-filters",JSON.stringify(filters));
}

// Deze functie gaat de opgeslagen filters op laden
function loadFilters(){
  try{
    const savedFilters = localStorage.getItem("makeup-filters");

    if(savedFilters){
      const filters = JSON.parse(savedFilters);

      if(filters.productType){
        filterType.value = filters.productType;
      }
      if (filters.maxPrice){
        priceMaxInput.value = filters.maxPrice;
        maxPriceValue.textContent = filters.maxPrice;
      }
      zetFilters();
      }
    }catch(error){
      console.error("Error loading filters:", error);
    }
  }

  //We halen de favorieten uit de localStorage 
  function getFavorites() {
    const favorites = localStorage.getItem("favoriteProducts");
    return favorites ? JSON.parse(favorites) : [];
  }

  //We gaan de favorieten opslaan in localStorage
  function saveFavorites(favorites){
    localStorage.setItem("favoriteProducts",JSON.stringify(favorites));
  }

  //we controleren of een product in de favorieten zit 
  function checkIfFavorite(productId){
    const favorites = getFavorites();
    return favorites.includes(productId);
  }

  //Hier gaan we  de stauts van een favoriet kunnen wisselen 
  function toggleFavorite(productId,button){
    let favorites = getFavorites();
    const icon = button.querySelector("i");

    if(favorites.includes(productId)){
      favorites = favorites.filter(id => id !== productId);
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
      icon.style.color = "#ddd1bd";
    }else{
      favorites.push(productId);
       icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      icon.style.color = "#ddd1bd";
    }
    saveFavorites(favorites);
  }


   
//Hier komen onze event listeners acties die de gebruiker kan verichten en wat de gewenste resultaten moeten zijn 


// Thema bij wijziging
themaSelect.addEventListener("change", changeTheme);

// Favorieten knop klik en laten tonen
showFavorites.addEventListener("click", () => { 
  const favorites = getFavorites(); 
  const favoriteProducts = allProducts.filter(product => favorites.includes(product.id));
  showingFavorites = true;
  toonProducten(favoriteProducts);

  // knop verbergen
  showFavorites.style.display = "none";  
  
  // 'toon alles' knop tonen
  showAll.style.display = "inline-block";  
});

// Toon alles knop klikken
showAll.addEventListener("click", () => {
  showingFavorites = false;
  toonProducten(allProducts);

  showAll.style.display = "none";
  showFavorites.style.display = "inline-block";
});

//Onze resetknop
document.getElementById("reset-button").addEventListener("click", () => {
  resetFilters();
});



  //We zetten een event listener hier zodat de filteroptie kan veranderen en we geven aan dat we een verandering willen nadat we op het knop hebben geklikt, voegen onze event listener hier zodat al de mogelijke veranderingen samen worden gevoeg 

  priceMaxInput.addEventListener("input", () => {
    maxPriceValue.textContent = priceMaxInput.value});
    
    priceMaxInput.addEventListener("change", () =>{
      zetFiltersEnZoek();
      saveFilters();
    })

// Filter opties toepassen 
  applyFilterButton.addEventListener("click", 
    () => {zetFilters();
  saveFilters();
});


//Product filter aanduiden
  filterType.addEventListener("change", ()=>{zetFilters();
    zetFiltersEnZoek();
    saveFilters();
  });

  
//Sorteren op prijs
  sortPriceButton.addEventListener("click",sorteerPrijsLaagste);

  //De reset knop om de filter opties te annuleren 
  resetButton.addEventListener("click",zetFiltersEnZoek);

  //De zoekbar en zoekknop
  searchButton.addEventListener("click",zoekProducten);
  searchInput.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
      zetFiltersEnZoek();
    }
  });

  //Thema en filters laden bij de start 
  document.addEventListener("DOMContentLoaded",loadThemePreference);
  document.addEventListener("DOMContentLoaded",loadFilters);
 



fetchData();

