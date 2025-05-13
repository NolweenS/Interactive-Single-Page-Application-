
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
    dataList.innerHTML = ""; //geen spatie
// een forEach loop zodat het over alle producten gaat lopen 
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      // we zetten onze innerhtml die we in de vorige stap hebben gemaakt hier zodat de filteroptie hier op kan werken
  productCard.innerHTML = `

    <img src = "${product.image_link || "placeholder.jpg"}" alt= "${product.name}" width="100" />
    <h3>${product.name}</h3>
    <p> Prijs: €${product.price || "?"}</p>
    <p>Merk: ${product.brand}</p>
    <p>Type: ${product.product_type}</p>
     <p><strong>Beschrijving: </strong> ${product.description || "Geen beschrijving beschikbaar"}</p>
  `;
  dataList.appendChild(productCard);
    });
    

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
    toonProducten(allProducts);
}

  // we zetten een event listener hier zodat de filteroptie kan veranderen en we geven aan dat we een verandering willen nadat we op het knop hebben geklikd

  priceMaxInput.addEventListener("input", () => {
    maxPriceValue.textContent = priceMaxInput.value});
  applyFilterButton.addEventListener("click",zetFilters);
  filterType.addEventListener("change", zetFilters);
  sortPriceButton.addEventListener("click",sorteerPrijsLaagste);
  resetButton.addEventListener("click",resetFilters);




fetchData();

