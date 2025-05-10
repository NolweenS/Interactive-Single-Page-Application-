import './style.css'

// API ophalen 
const API_URL =  "http://makeup-api.herokuapp.com/";

// we maken een functie om data op te halen
function fetchMakeup(productType){
fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`)
.then(response => response.json())
.then (data => {
  const first20 = data.slice(0,25);

  // Hier gaan we de lijst selecteren in de DOM
  const dataList = document.getElementById ("data-list");
 //we maken de lijst leeg voordat je nieuwe producten toevoegt
  dataList.innerHTML = '';

first20.forEach (product => {
  const li = document.createElement("li");
  
      // Controleer of er een afbeelding is en voeg die toe/ lazy loading
      const imageUrl = product.image_link ? product.image_link : '';
      const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="${product.name}" class="product-image" loading="lazy" />` : '';
  
      li.innerHTML= `
      ${imageHtml}
      <strong>${product.name} </strong><br>
  Merk: ${product.brand}<br>
  Prijs: ${product.price_sign ?? ''}${product.price ?? 'n.v.t.'} <br>
  Type: ${product.product_type}
   `;
   dataList.appendChild(li);
});
})
.catch(error =>{
  console.error("Er is een fout bij het ophalen: " , error);
  const dataList = document.getElementById("data-list");
  dataList.innerHTML = `<li>Er ging iets mis: ${error.message}</li>`;
});
}

document.getElementById("product-type").addEventListener("change", (event) =>{
  const selectedType = event.target.value;
  fetchMakeup(selectedType);
});

fetchMakeup();
