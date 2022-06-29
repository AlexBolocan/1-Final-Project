const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

function getHeader() {
  let headerHtml=`
<header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
   <a href="admin.html" data-bs-toggle="tooltip"  data-bs-placement="right" 
   data-bs-custom-class="custom-tooltip" title="Administrator" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none ">
    <img class="btn btn-outline-light " src="/icon/logo.svg" alt=""> 
  </a>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a href="index.html" id="idPageHome"class="nav-link active " aria-current="page">Acasa
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
        <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
     </svg>
     </a>
     </i></li>
    <li class="nav-item"><a href="cart.html" id="idPageCart" class="nav-link ">Cos
     </span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 20 20">
       <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
     </a>
    </li>
  </ul>
</header>
`
document.querySelector("#pageHeader").innerHTML=headerHtml;
  
if (window.location.pathname === "/index.html") {
  document.querySelector("#idPageHome").classList.add("active")
}else   document.querySelector("#idPageHome").classList.remove("active")
 
if (window.location.pathname === "/cart.html") {
  document.querySelector("#idPageCart").classList.add("active")
}else   document.querySelector("#idPageCart").classList.remove("active")

}