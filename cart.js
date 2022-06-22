let stringHtml="";

function getCart(){
stringHtml=`

<div class="card mb-3 h-40">
<div class="d-md-flex justify-content-md-end">
  <button
    class="btn btn-outline-secondary"
    type="button"
    id="button-addon2"
  >
    Sterge
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
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
  <div class="col-md-4">
    <img
      src="https://s13emagst.akamaized.net/products/39630/39629804/images/res_07998473feb589c019aed62a1a3d94e0.jpg"
      class="img-fluid rounded-start "
      alt="..."
    />
  </div>
  <div class="col-md-8  ">
        <div class="card-body text-start">
      <h4 class="card-title">Bicicletă Eighty Eight MTB</h4>
      <p class="card-text">
        Bicicleta Eighty Eight MTB Challenge 29 inch, Manete Schimbator Secventiale, 21 Viteze, Frane Disc fata/spate, Negru/Portocaliu/Bleu.
      </p>
      </div>
      <div class="input-group mb-8 " style="width: 9rem; height: 3rem;">
        <input
          type="number"
          class="form-control text-end  "
          placeholder="Stock"
          aria-label="Add part on stock"
          aria-describedby="button-addon2"
          value="1"
        />
      </div>
    </div>
<div class="card-footer">
    <p><h4 class="card-title text-end">Total: 4000 RON</h4></p>
  </div>
</div>
</div>

`

document.querySelector("#cartContainer").innerHTML = stringHtml;  }