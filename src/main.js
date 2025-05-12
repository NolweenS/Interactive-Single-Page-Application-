
import "./style.css"


// API ophalen: We maken hem constant en daar gaan we onze adres bewaren van de API waar we data ophalen
const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx";

// Hier gaan we onze "data-list" in onze HTML aanspreken, om daar de producten van de data te plaatsen
const dataList = document.getElementById("data-list");

// we maken een functie om data op te halen voor merk en we doen dit asynchroon zodat JavaScript eerst wacht op de serer en we gebruiken await zodat we op elke stap wachten
async function fetchData() {
  try {

    // const response wacht dat fetchData de data bij de API heeft opgehaald 
    const response = await fetch(API_URL);

    // hier gaan we de response van de API_URL omzetten naar Json-data, om het later makkelijker te gebruiken 
    const data = await response.json();

    //Hier gaan we de data uitprinten om na te kijken of alles klopt (debuggen)
    console.log(data);


    // we maken een forEach zodat we over de producten kunnen lopen en ze aan de tabel kunnen toevoegen
    data.forEach(product => {
      const productCard = document.createElement("div");
      // Hier voegen we de product class
      productCard.classList.add("product-card");

      //sommoge beschrijving onderdelen zijn onderverdeeld en deze gaan we hier aan passen zodat het visueel overzichterlijker is 

      
      // we maken van de informatie deel een product card zodat het overzichtelijker is 
      productCard.innerHTML = `

    <img src = "${product.image_link || "placeholder.jpg"}" alt= "${product.name}" width="100" />
    <h3>${product.name}</h3>
    <p> Prijs: €${product.price || "?"}</p>
    <p>Merk: ${product.brand}</p>
    <p>Type: ${product.product_type}</p>
     <p><strong>Beschrijving: </strong> ${product.description || "Geen beschrijving beschikbaar"}</p>
  `;
      dataList.appendChild(productCard);
    })




  } catch (error) {
    // Bij een fout melding wordt het hier opgenomen en kunnen we het met de console bekijken
    console.error(" Er ging iets mis bij het ophalen: " + error);

  }

}

fetchData();

