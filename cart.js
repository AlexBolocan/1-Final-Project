let state = {
  product: [],
  idxEdit: null,
};

let totalPriceCart = 0;
let totalProductCart = 0;
let valueProductCart = [];
let dataBaseUrl =
  "https://shopapp-7d224-default-rtdb.europe-west1.firebasedatabase.app/";
let dataBaseList = {};

// functia de preluare data din local storge si desenare html
function getCart() {
  let stringHtml = "";
  let cart = localStorage.getItem("cart");
  if (cart === null || cart.length < 3) {
    stringHtml += `
    <div class="card mb-3 h-40">
      <div class="d-md-flex justify-content-md-end">
         <div class="col-md-4">
           <div class="card-body text-start">
             <h4 class="card-title">Nu sunt produse in cos</h4>
            </div>
       </div>
     </div>

`;
    document.querySelector("#cartContainer").innerHTML = stringHtml;
  } else {
    totalPriceCart = 0;
    totalProductCart = 0;
    cart = JSON.parse(cart);
    for (let i = 0; i < cart.length; i++) {
      //checkAvailability(i);
      valueProductCart[i] = cart[i].pret * cart[i].cantitate;
      totalPriceCart += valueProductCart[i];
      totalProductCart += cart[i].cantitate;
    }

    stringHtml += `
    <div class="card mb-2 h-20">
      <div class="d-md-flex ">
         <div class="col-md-2"justify-content-md-start >
          <span><h5 class=" card-text">Produse: ${totalProductCart} buc</h5></span>
          <span><h5 class=" card-text">Cost : ${totalPriceCart} RON</h5></span>
         </div>
         <div class="col-md-2"justify-content-md-end >
          <button onclick="" class="text-end btn btn-outline-secondary " type="button">Cumpara </button>
       </div>
      </div>  
    </div>
 `;
    for (let i = 0; i < cart.length; i++) {
      //checkAvailability(i);
      valueProductCart[i] = cart[i].pret * cart[i].cantitate;
      stringHtml += ` 
          <div class="row g-0 text-end">
            <div class="d-md-flex  justify-content-end">
             <div class="input-group-text " ><a href="details.html?id=${cart[i].idProdus}"> ${cart[i].title}</a></div>
              <span class="input-group-text">Pret: ${cart[i].pret} RON</span>
                <button onclick="decrProductToCart(${i})" class=" btn btn-outline-secondary" type="button">-</button>
                <input onchange="" type="number" class="form-control" style="width:100px;" "name="quantity" value="${cart[i].cantitate}">
                <button onclick="incrProductToCart(${i})" class="btn btn-outline-secondary" type="button">+</button>
               <span class="input-group-text">BUC</span>  
              <span class="input-group-text">TOTAL: ${valueProductCart[i]} RON</span>
             <button onclick="deleteProduct(${i})" class="btn btn-outline-secondary" type="button" id="button-addon2" >Sterge 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" >
               <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
               <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
          </div>
          </div>
          `;
      totalPriceCart += valueProductCart[i];
      totalProductCart += cart[i].cantitate;
    }
    //modal pentru confirmarea stocului
    stringHtml+=`
    <!-- Modal stoc -->
    <div class="modal fade" id="staticBackdrop" name="stocModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog  ">
        <div class="modal-content bg-danger text-white">
          <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Stoc depasit</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
          <h5 class="modal-title bg-danger text-white">Stocul de produse a fost setat la valoarea maxima:  buc  </h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Am inteles</button>
          </div>
        </div>
      </div>
    </div>

    `;  
    document.querySelector("#cartContainer").innerHTML = stringHtml;
  }

}

// functia ce actualizeaza localStorage
function updateQuantity(idx) {
  let cartQuantity = [];
  cartQuantity = document.querySelectorAll("[name='prodQuantity']");
  console.log(cartQuantity[idx]);
}

// functia care sterge un produs din local storage
function deleteProduct(idx) {
  cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  cart.splice(idx, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getCart();
}

// functia de incrementare nr de produse dorite
function incrProductToCart(idx) {
  cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  cart[idx].cantitate++;
  localStorage.setItem("cart", JSON.stringify(cart));
  checkAvailability(idx);
  getCart();
}

// functia de decrementare nr de produse dorite
function decrProductToCart(idx) {
  cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  cart[idx].cantitate--;
  localStorage.setItem("cart", JSON.stringify(cart));
  checkAvailability(idx);
  getCart();
}

// functia de verificare produs
async function checkAvailability(idx) {
  const myStocModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
  cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  const response = await fetch(dataBaseUrl + cart[idx].idProdus + "/.json");
  dataBaseList = await response.json();
  if (dataBaseList === null) {
    state.product = {};
  } else {
    state.product = dataBaseList;
  }
  quantityCart =Number( document.querySelector("[name='quantity']").value.trim());

  if (Number(state.product.stock) < cart[idx].cantitate) {
    myStocModal.show();
    cart[idx].cantitate = Number(state.product.stock);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }
  
}
