
import "./style.css"


// API ophalen: We maken hem constant en daar gaan we onze adres bewaren van de API waar we data ophalen
const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx";

// Hier gaan we onze "data-list" in onze HTML aanspreken, om daar de producten van de data te plaatsen
const dataList = document.getElementById("data-list");

//  we maken een filter constante op basis van de type product 

const filterType = document.getElementById("filter-type");

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


// we willen de data altijd opneiuw roepen das niet effciente dus we bewaren het data hier zodat we bij het filtreren,sorter,.. eenvoudiger data kunnen ophalen
let allProducts = [];


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
      toonProducten(data);
    }catch (error){
      // Bij een fout melding wordt het hier opgenomen en kunnen we het met de console bekijken
      console.error(" Er ging iets mis bij het ophalen: " + error);
    }
    
  }

  function toonProducten(products){
    console.log("Showing products:",products.length);
    dataList.innerHTML = ""; //geen spatie

    // We gaan de reultaat teller updaten na zoek resultaat
    const countElement = document.getElementById("count");
    countElement.textContent = products.length;

    //we gaan controleren of er een resultaat is 
    const noResultsElement = document.getElementById("no-results");
    if (products.length === 0){
      noResultsElement.style.display = "block";
    } else{
      noResultsElement.style.display = "none";
    }

// een forEach loop zodat het over alle producten gaat lopen 
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      // we zetten onze innerhtml die we in de vorige stap hebben gemaakt hier zodat de filteroptie hier op kan werken
  productCard.innerHTML = `

    <img src = "${product.image_link || "placeholder.jpg"}" alt= "${product.name}" width="100" />
    <h3>${product.name}</h3>
    <p>Prijs: €${product.price || "?"}</p>
    <p>Merk: ${product.brand}</p>
    <p>Type: ${product.product_type}</p>
     <p><strong>Beschrijving: </strong> ${product.description || "Geen beschrijving beschikbaar"}</p>
  `;
  dataList.appendChild(productCard);
    });
    

  }

  // Hier komt de functie om van thema te veranderen 
  function changeTheme(){
    if(themaSelect.value === "dark"){
    document.body.classList.add("dark-theme");
  }else {
    document.body.classList.remove("dark-theme");
  }

  localStorage.setItem("theme-preference", themaSelect.value);
  }

  // Event listener voor de thema-selector
  themaSelect.addEventListener("change",changeTheme)

  //We maken een functie om de opgelasgen voorkeur bij het laden van de pagina

  function loadThemePreference(){
    const savedTheme = localStorage.getItem("theme-preference");

    if(savedTheme){
      themaSelect.value = savedTheme;

      if(savedTheme === "dark"){
        document.body.classList.add("dark-theme");
      }
    }

  }

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


  // Hier maken we een filteroptie waarin we een schuifbalk gebruiken voor onze minimun -en maximum prijs en de filter op type product wordt hier bij gezet
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

//We sorteren op prijs van kleinste prijs naar hoogtse prijs 
 function sorteerPrijsLaagste(){
    const sorted = [...allProducts].sort((a,b) =>{
    const prijsA = parseFloat(a.price);
    const prijsB = parseFloat(b.price);
    if(isNaN(prijsA)) 
      return 1;
    if (isNaN(prijsB))
      return -1;
    return prijsA-prijsB;
  });
toonProducten(sorted);
  }


  function resetFilters(){
    filterType.value = ''; // de keuze van onze product type resetten
    priceMaxInput.value = priceMaxInput.max; //onze schuifbalk resetten
    searchInput.value = "" //zoekbalk resetten
    toonProducten(allProducts);
}

  // we zetten een event listener hier zodat de filteroptie kan veranderen en we geven aan dat we een verandering willen nadat we op het knop hebben geklikt, voegen onze event listener hier zodat al de mogelijke veranderingen samen worden gevoeg 

  priceMaxInput.addEventListener("input", () => {
    maxPriceValue.textContent = priceMaxInput.value});
  applyFilterButton.addEventListener("click",zetFilters);
  filterType.addEventListener("change", zetFilters);
  sortPriceButton.addEventListener("click",sorteerPrijsLaagste);
  resetButton.addEventListener("click",resetFilters);
  searchButton.addEventListener("click",zoekProducten);
  searchInput.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
      zoekProducten();
    }
  });

  document.addEventListener("DOMContentLoaded",loadThemePreference);



fetchData();

