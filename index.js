let dataBaseUrl =
  "https://shopapp-7d224-default-rtdb.europe-west1.firebasedatabase.app/";
let dataBaseList = {};

// functia de preluare din baza de date
async function getProducts() {

  const response = await fetch(dataBaseUrl + ".json");
  dataBaseList = await response.json();
  if (dataBaseList === null) {
    window.location="admin.html"
      }
  console.log(dataBaseList);
  draw();
}

// functia de desenare html
function draw(){
 
let stringHtml="";    

for (let [i,product] of Object.entries(dataBaseList)) {
  if (product === null) {
    continue;
  }
    stringHtml+=`
    <div class="gap-8 col-lg-4 col-md-6 col-sm-8"> 
    <div class="card h-100" > 
     <div class=" d-md-flex justify-content-md-end">
     <a href="details.html?id=${i}">
     <button  class="btn btn-outline-success me-md-2 btn-lg"> DETALII
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
         <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
       </svg>
        </button>
        </a>
        </div> 
        <img src=${product.photo[0]} class="card-img-top" alt="...">
     <div class="card-body">
       <h4 class="card-title">${product.title}</h4>
       <p class="card-text">Pret: ${product.price} RON</p>
        </div>
   </div>
  </div>
`
document.querySelector("#mainContent").innerHTML = stringHtml;    
}

}