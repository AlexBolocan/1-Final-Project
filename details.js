let dataBaseUrl =
  "https://shopapp-7d224-default-rtdb.europe-west1.firebasedatabase.app/";
let index = window.location.search.substring(4);
let dataBaseProduct = {};
let product = {};
// functia de preluare din baza de date
if (index.length < 1) {
  window.location = "index.html";
}

async function getDetailProduct() {
  const response = await fetch(dataBaseUrl + index + "/.json");
  dataBaseProduct = await response.json();
  detailsDraw();
  document.querySelector("#addToCartAlert").classList.add("fade");
  document.querySelector("#addToCartAlert").classList.remove("show");
  document.querySelector("#maximCartAlert").classList.add("fade");
  document.querySelector("#maximCartAlert").classList.remove("show");
}

// functia de desenare html
function detailsDraw() {
  let stringHtml = "";
  stringHtml += `
       <div id="addToCartAlert" class="alert alert-success " role="alert" >Articolul a fost adaugat in cos
       </div>
     <div id="detailsContent" class="row row-cols-2 ">  
      <div id="carouselExampleControls" class="carousel slide col" data-bs-ride="carousel">
       <div class="carousel-inner h-80">
        <div class="carousel-item active ">
          <img src="${dataBaseProduct.photo[0]}" class="img-thumbnail img-thumbnail float-sm-start " alt="poza produs">
        </div>
        <div class="carousel-item">
          <img src="${dataBaseProduct.photo[1]}" class="img-thumbnail img-thumbnail float-sm-start" alt="poza produs">
        </div>
        <div class="carousel-item">
          <img src="${dataBaseProduct.photo[2]}" class="img-thumbnail img-thumbnail float-sm-start" alt="poza produs">
        </div>
      </div> 
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
       </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
       </button>
    </div>
    <div class="col ">
        <div> 
         <h1 class="display-6">${dataBaseProduct.description}</h1></div>
         <hr>
         <div class="d-flex justify-content-center mb-3">
         <h4 class="text-xl-start p-2 flex-fill"> Pret: ${dataBaseProduct.price} RON</h4>
         <h4 class="text-xl-start p-2 flex-fill" name=""> ${dataBaseProduct.stock} buc in stoc</h4>
         </div> 
         <div class="input-group mb-8">
          <input type="number" onchange="quantityChange()" class="form-control" placeholder="Stock" aria-label="Add part on stock" aria-describedby="button-addon2" name="cantitate" value="1">
          <button onclick="addProductCart()" class="btn btn-outline-success" type="button" id="button-addon2" name="addToCartButton">Adauga in cos
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 20 20">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
           </svg>
          </button>
         </div>
         <div id="maximCartAlert" class="alert alert-danger  fw-bold" role="alert" >Cantitatea maxima a produselor este ${dataBaseProduct.stock}
         </div>
     </div>
    </div>
`;
  document.querySelector("#detailsContent").innerHTML = stringHtml;
}

// functia care adauga produsul in cos
function addProductCart() {
  let stringHtml = document.querySelector("#detailsContent");
  let idProdus = index;
  let cantitate = document.querySelector("[name='cantitate']").value;
  cantitate = Number(cantitate);
  if (isNaN(cantitate) || cantitate <= 0) {
    document.querySelector("[name='cantitate']").value=1;
    return;
  }
  let produs = {
    idProdus: idProdus,
    title: dataBaseProduct.title,
    photo: dataBaseProduct.photo,
    pret: dataBaseProduct.price,
    stoc: dataBaseProduct.stoc,
    cantitate: cantitate,
  };

  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  let found = false;
  for (let p of cart) {
    if (p.idProdus === produs.idProdus) {
      p.cantitate += produs.cantitate;
      found = true;
    }
  }
  if (!found) {
    cart.push(produs);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  document.querySelector("#addToCartAlert").classList.add("show");
  document.querySelector("#addToCartAlert").classList.remove("fade");
  document.querySelector("#maximCartAlert").classList.remove("show");
  document.querySelector("#maximCartAlert").classList.add("fade");
}
// functia de ascundere a "alertei" dupa modificarea cantitatii
function quantityChange() {
  document.querySelector("#maximCartAlert").classList.remove("show");
  document.querySelector("#maximCartAlert").classList.add("fade");

  document.querySelector("#addToCartAlert").classList.remove("show");
  document.querySelector("#addToCartAlert").classList.add("fade");
  let cantitate = document.querySelector("[name='cantitate']").value;
  cantitate = Number(cantitate);
  if (isNaN(cantitate) || cantitate <= 0) {
    document.querySelector("[name='cantitate']").value=1;
    return;
  }

  if (isNaN(cantitate) || cantitate > dataBaseProduct.stock) {
    document.querySelector("#maximCartAlert").classList.add("show");
    document.querySelector("#maximCartAlert").classList.remove("fade");
    document.querySelector("[name='cantitate']").value=dataBaseProduct.stock;
      return;
  }

}
