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
  // desenare html mesaj cos gol
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
    // desenare html pentru total produse si cost
    for (let i = 0; i < cart.length; i++) {
      // checkAvailability(i);
      valueProductCart = Number(cart[i].pret) * Number(cart[i].cantitate);
      totalPriceCart += valueProductCart;
      totalProductCart += Number(cart[i].cantitate);
    }
    stringHtml += `
    <div class="card mb-2 h-40">
      <div class="d-md-flex ">
         <div class="col-md-5 justify-content-md-start" >
          <h5 class=" card-text text-center">Total: ${totalProductCart} produse</h5>
          </div>
          <div class="col-md-5 justify-content-md-start" >
          <h5 class=" card-text text-center">Cost total : ${totalPriceCart} RON</h5>
         </div>
         <div class="h-100 col-md-2 justify-content-end text-end" >
          <button onclick="buyProducts(event)" class="text-end btn btn-outline-success" type="button">Cumpara  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
        </svg></button>
       </div>
      </div>  
    </div>
 `;
    // draw html with details of product
    for (let i = 0; i < cart.length; i++) {
      stringHtml += ` 
          <div class="card p-2 mb-2 justify-content-evenly text-end">
            <div class=" d-md-flex mb-2 justify-content-end" style="max-width: 100rem;">
             <div class="input-group-text bg-light text-dark" ><a style="max-width:350px"; href="details.html?id=${
               cart[i].idProdus
             }"> ${cart[i].title}</a></div>
              <span class="input-group-text bg-light text-dark justify-content-end "style="min-width: 100px;">Pret: ${
                cart[i].pret
              } RON</span>
              <span class="input-group-text bg-light text-dark justify-content-end">
                <button onclick="decrProductToCart(${i})" class=" btn btn-outline-secondary" type="button">-</button>
                <input id="idQuantity" onchange="checkValue(${i})" type="number" class="form-control text-end" style="width:100px;" name="quantity" value="${
        cart[i].cantitate
      }">
                <button onclick="incrProductToCart(${i})" class="btn btn-outline-secondary" type="button">+</button>
               <span class="input-group-text">BUC</span>  
             </span>
              <span class="input-group-text bg-light text-dark justify-content-end " style="min-width:250px;">TOTAL: ${
                Number(cart[i].pret) * Number(cart[i].cantitate)
              } RON</span>
             <button onclick="deleteProduct(${i})" class="btn btn-outline-danger" type="button" id="button-addon2" data-bs-toggle="" data-bs-target="">Sterge 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" >
               <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
               <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
           </div>
          </div>
          `;
      if (cart !== null) {
        checkStockAvailability(i);
      }
    }
    
    // stringHtml += `
    // <!-- Delete Modal -->
    // <div class="modal fade" id="staticBackdropDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    //   <div class="modal-dialog">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title" id="exampleModalLabel">Stergere articol</h5>
    //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //       </div>
    //       <div class="modal-body">
    //        <form >
    //           <div class="input-group mb-3">
    //           <span class="text" name="title">Doriti sa stergeti articolul ?</span>
    //           </div>
    //         </div>
    //       </form>   
    //       <div class="modal-footer">
    //       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Inchide</button>
    //       <input type="button" class="btn btn-danger " onclick="deleteProduct(idx)" value="Sterge">
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // `;
     document.querySelector("#cartContainer").innerHTML = stringHtml;
  }
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
  checkStockAvailability(idx);
  getCart();
}

// functia de decrementare nr de produse dorite
function decrProductToCart(idx) {
  cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  cart[idx].cantitate--;
  localStorage.setItem("cart", JSON.stringify(cart));
  checkStockAvailability(idx);
  getCart();
}

// functia de verificare produs
async function checkStockAvailability(idx) {
  let productFound = false;
  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
  cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  const resAllProduct = await fetch(dataBaseUrl + ".json");
  dataBaseProducts = await resAllProduct.json();
  if (dataBaseProducts === null) {
    window.location = "index.html";
  } else {
    for (let nrIdProdus of Object.keys(dataBaseProducts)) {
      if (cart[idx].idProdus === nrIdProdus) {
        productFound = true;
        break;
      } else {
        productFound = false;
      }
    }
    // check product available
    if (productFound === false) {
      let stringHtml = `
    <p class="fs-3"> Cosul a fost actualizat. Unele produse nu mai sunt disponibile</p>
    `;
      document.querySelector("#textModal").innerHTML = stringHtml;
      myModal.show();
      deleteProduct(idx);
    } else {
      const response = await fetch(dataBaseUrl + cart[idx].idProdus + "/.json");
      dataBaseList = await response.json();

      if (dataBaseList === null) {
        state.product = {};
      } else {
        state.product = dataBaseList;
      }
      // check maxim stock
      if (Number(state.product.stock) < cart[idx].cantitate) {
        let stringHtml = `
    <p class="fs-3"> Cantiatea produselor din cos a fost actaulizat la valoarea maxima a stocului</p>
    `;
        document.querySelector("#textModal").innerHTML = stringHtml;
        myModal.show();
        cart[idx].cantitate = Number(state.product.stock);
        localStorage.setItem("cart", JSON.stringify(cart));
        getCart();
      }
      // update price if change
      if (Number(state.product.price) !== Number(cart[idx].pret)) {
        let stringHtml = `
    <p class="fs-3"> Pretul produselor din cos a fost actaulizat.</p>
    `;
        document.querySelector("#textModal").innerHTML = stringHtml;
        myModal.show();
        cart[idx].pret = Number(state.product.price);
        localStorage.setItem("cart", JSON.stringify(cart));
        getCart();
      }

      // check minim stock
      if (0 >= cart[idx].cantitate) {
        cart[idx].cantitate = 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        getCart();
      }
    }
  }
}

// update local storage wiht input value
function checkValue(idx) {
  cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  let valueStocInput = [];
  let varNr = document.querySelectorAll("[name='quantity']")[idx];
  valueStocInput = varNr.value;
  if (Number(valueStocInput) !== cart[idx].cantitate) {
    cart[idx].cantitate = valueStocInput;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  getCart();
}

// functia de finalizare comanda => sterge locat storage si stocul produselor
async function buyProducts(event) {
  event.preventDefault();
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  const response = await fetch(dataBaseUrl + ".json");
  dataBaseList = await response.json();
  state.product = dataBaseList;
  console.log(state.product);
  console.log(cart);
  // update data base stock 
  for (let [i, product] of Object.entries(dataBaseList)) {
    let title = product.title;
    let description = product.description;
    let stock = product.stock;
    let price = product.price;
    let pictures = product.photo;
    for (let idx = 0; idx < cart.length; idx++) {
      if (i === cart[idx].idProdus) {
        console.log("sunt egale");
        console.log(Number(product.stock));
        let productStock = Number(product.stock);
        let storageStock = Number(cart[idx].cantitate);
        stock = productStock - storageStock;
         let response = await fetch(
           dataBaseUrl + cart[idx].idProdus + "/.json",
           {
             method: "PUT",
             body: JSON.stringify({
               title: title,
               description: description,
               price: price,
               stock: stock,
               photo: pictures,
             }),
           }
         );
         cart.splice(idx, 1);
         localStorage.setItem("cart", JSON.stringify(cart));
       }
    }
  }
  getCart();
}