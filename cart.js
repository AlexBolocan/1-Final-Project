let valueProductCart = [];

// functia ce preia din localStorage
function cartFromStorage() {}

function getCart() {
  let stringHtml = "";
  let cart = localStorage.getItem("cart");
    if (cart === null || cart.length < 3  ) {
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
    cart = JSON.parse(cart);
    stringHtml = "";
    for (let i = 0; i < cart.length; i++) {
      valueProductCart[i] = cart[i].pret * cart[i].cantitate;

      stringHtml += `

    <div class="card mb-3 h-20">
      <div class="d-md-flex justify-content-md-end">
      <span class="input-group-text">${cart[i].title}</span>
      <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" value="${cart[i]}">
      <span class="input-group-text">.00</span>

      <button onclick="deleteProduct(${i})"
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
        Sterge
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-trash"
      viewBox="0 0 16 16"
    >
      <path
        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
      />
      <path
     fill-rule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
       />
     </svg>
 </button>
 </div>
<div class="row g-0 text-end">
  <div class="col-md-2">
    <img
      src="${cart[i].photo[0]}"
      class="img-fluid rounded-start  "
      alt="..."
    />
  </div>
</div>
</div>

`;
    }
    document.querySelector("#cartContainer").innerHTML = stringHtml;
  }
}

// functia ce actualizeaza localStorage
function updateQuantity(idx) {
let cartQuantity=[];
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
  console.log(cart);
  console.log(idx);
  cart.splice(idx, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getCart();
}
