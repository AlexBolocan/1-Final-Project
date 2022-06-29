let state = {
  product: [],
  idxEdit: null,
};
let dataBaseUrl =
  "https://shopapp-7d224-default-rtdb.europe-west1.firebasedatabase.app/";
let dataBaseList = {};

// functia de preluare din baza de date
async function getAdminProducts() {
  const response = await fetch(dataBaseUrl + ".json");
  dataBaseList = await response.json();
  if (dataBaseList === null) {
    state.product = {};
  } else {
    state.product = dataBaseList;
  }
  adminDraw();
}

// functia de desenare html
function adminDraw() {
  // butonul de adaugare articol nou
  let stringHtml = `
    <div class="gap-8 col-lg-2 col-md-4 col-sm-6 text-center"> 
        <div class="card h-60" > 
         <div class=" d-md-flex justify-content-md" style="align-items: center;">
          <button  type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
           </svg>    
          </button>           
         </div> 
       </div>
      </div>
`;
  if (dataBaseList === null) {
    stringHtml += "";
  } else {
    //  bucla de preluare date din FireBase
    for (let [i, product] of Object.entries(dataBaseList)) {
      if (product === null) {
        continue;
      }
      stringHtml += `
    <div class="gap-8 col-lg-2 col-md-4 col-sm-6"> 
      <div class="card h-100" > 
       <div class=" d-md-flex justify-content-md-end">
        <button href="#" onclick="editProduct('${i}')" class="btn btn-outline-secondary me-md-2 btn-md" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >EDITEAZA
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>       
          </button>
          <button href="#" onclick="editProduct('${i}')" class="btn btn-outline-secondary btn-md" id="liveAlertBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropDelete" >STERGE
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>           
           </button>
            </div> 
          <img src="${product.photo[0]}" class="card-img-top" name="photo" alt="Poza Bicicleta">
       <div class="card-body">
         <h4 class="card-title">${product.title}</h4>
         <p class="card-text">${product.price}</p>
          </div>  
     </div>
    </div> 
  </div>
`;
    }
  }
  stringHtml += `  
  <!--Add and Edit Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"  name=" " data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Articol</h5>
          <button type="button" class="btn-close"  onclick="resetForm(event)" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="addProductForm"onsubmit="addProduct(event)" >
           <div class="input-group mb-3">
            <span class="input-group-text">Denumire</span>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Bicicleta" name="title">
           </div>
              <div class=class="input-group col-md-6 mb-3">
             <span class="input-group-text">Descriere</span>
             <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="description"></textarea>
           </div>
           <div class="input-group col-md-2 mb-3">
             <span class="input-group-text">Pret articol</span>
             <input type="number" class="form-control" id="formGroupExampleInput" placeholder="Pret" name="price">
             <span class="input-group-text">RON</span>
           </div>
           <div class="input-group col-md-2 mb-3">
             <span class="input-group-text">Stoc</span>
             <input type="number" class="form-control" id="formGroupExampleInput" placeholder="Stoc" name="stock">
             <span class="input-group-text">buc</span>
            </div>
             <div id=""class="input-group col-md-6 mb-3" >
              <div class="input-group-text">Poza 1</div>
              <input "type="text" class="form-control" aria-describedby="button-addon1" placeholder="poza articol" name="photoProduct">
             </div>
              <div class="input-group col-md-6 mb-3" >
              <div class="input-group-text">Poza 2</div>
              <input type="text" class="form-control"  aria-describedby="button-addon1" placeholder="poza articol" name="photoProduct" >
              </div>
              <div class="input-group col-md-6 mb-3" >
              <div class="input-group-text">Poza 3</div>
              <input type="text" class="form-control" aria-describedby="button-addon1" placeholder="poza articol" name="photoProduct" >
             </div>
        </form>   
         </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary " onclick="resetForm(event)" data-bs-dismiss="modal">Inchide</button>
        <input type="submit" class="btn btn-primary submitBtn " onclick="addProduct(event)" value="Salveaza">
        </div>
      </div>
    </div>
  </div>
  
  <!-- Delete Modal -->
  <div class="modal fade" id="staticBackdropDelete" data-bs-backdrop="static"  name=" " data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Stergere articol</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"  onclick="resetForm(event)" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <form onsubmit="addProduct(event)" >
            <div class="input-group mb-3">
            <span class="text" name="title">Doriti sa stergeti articolul ?</span>
            </div>
          </div>
        </form>   
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary " onclick="resetForm(event)"  data-bs-dismiss="modal">Inchide</button>
        <input type="submit" class="btn btn-danger submitBtn " onclick="deleteProduct(event)" value="Sterge">
        </div>
      </div>
    </div>
  </div>
  `;
  document.querySelector("#adminContent").innerHTML = stringHtml;
}

//  functia de editare produs
function editProduct(idx) {
  let elem = state.product[idx];
  document.querySelector("[name='title']").value = elem.title;
  document.querySelector("[name='description']").value = elem.description;
  document.querySelector("[name='stock']").value = elem.stock;
  document.querySelector("[name='price']").value = elem.price;

  let picturesInput = document.querySelectorAll("[name='photoProduct']");
  for (let i = 0; i < elem.photo.length; i++) {
    picturesInput[i].value = elem.photo[i];
  }
  state.idxEdit = idx;
}

// functia de stergere produs
async function deleteProduct(event) {
  event.preventDefault();
  let title = document.querySelector("[name='title']").value.trim();
  let description = document.querySelector("[name='description']").value.trim();
  let stock = document.querySelector("[name='stock']").value.trim();
  let price = document.querySelector("[name='price']").value.trim();
  let pictureInputs = document.querySelectorAll("[name='photoProduct']");
  let pictures = [];
  for (let input of pictureInputs) {
    if (input.value !== "") {
      pictures.push(input.value);
    }
  }
  let response = await fetch(dataBaseUrl + state.idxEdit + "/.json", {
    method: "DELETE",
  });

  state.idxEdit = null;
  window.location = "admin.html";
}

// functia de adaugare produs
async function addProduct(event) {
  event.preventDefault();
  let title = document.querySelector("[name='title']").value.trim();
  let description = document.querySelector("[name='description']").value.trim();
  let stock = document.querySelector("[name='stock']").value.trim();
  let price = document.querySelector("[name='price']").value.trim();
  let pictureInputs = document.querySelectorAll("[name='photoProduct']");
  let pictures = [];
  for (let input of pictureInputs) {
    if (input.value !== "") {
      pictures.push(input.value);
    }
  }
  if (state.idxEdit === null) {
    //vreau sa adaug un element nou in lista
    let response = await fetch(dataBaseUrl + ".json", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        stock: stock,
        photo: pictures,
      }),
    });
  } else {
    //aici sunt in timpul editarii
    let response = await fetch(dataBaseUrl + state.idxEdit + "/.json", {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        stock: stock,
        photo: pictures,
      }),
    });

    state.idxEdit = null;
  }
  window.location = "admin.html";
}
function resetForm(event) {
  event.preventDefault(event);
  document.querySelector("#addProductForm").reset();
}
