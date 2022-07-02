const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

function getHeader() {
  let headerHtml=`
<header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
   <a href="admin.html" data-bs-toggle="tooltip"  data-bs-placement="right" 
   data-bs-custom-class="custom-tooltip" title="Administrator" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none ">
    <img class="btn btn-outline-light " src="" alt=""> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 1000 1000">
    <path d="M483 181.7a49.2 49.2 0 0 0-9.9 79.8c25 22 63.5 15.4 76.8-12.8a52.7 52.7 0 0 0-16.6-65c-11.5-8.5-36.4-9.7-50.4-2z"/>
    <path d="M343.3 216.1A207.8 207.8 0 0 0 222.9 287c-37.7 43-40 90.7-6.2 121.2 23.4 21 55.1 31.2 131.9 41.8 19.6 3 36.8 6.3 38 7.5 1.1 1.1-4.5 13.3-12.8 27-47.7 78.2-63.4 150.6-39.1 178.2 8 9.4 11.8 5.9 16.9-16 9.5-42.5 37-89.3 84.8-144.8 27.8-32.3 36.7-48.9 33.5-63.1a48.4 48.4 0 0 0-22.9-34.1c-16.8-11.6-30.5-16-91-31.5-55.7-13.9-68.2-18-68.2-21.9 0-7.7 38-30.8 56.4-34.7a107 107 0 0 0 14.8-3.3c3.2-.8 5.3 2.7 8 13.7a79 79 0 0 0 54 56.3c16 4.5 54.8 3.6 75.6-1.7 39.7-10.4 96.6-47.2 96.6-63 0-8.5-7.4-8.5-53.6 1.3-42.4 8.6-82.5 10.6-96.7 4.4-8.3-3.2-9.8-5.6-9.8-14.2 0-5.3 3.3-16.3 7.1-24 12.5-24.6 11.3-36.2-5-52.5-21-21-49.5-26.4-92-17.5z"/>
    <path d="M609.5 328.2c-12.7 5.6-43.5 39.7-57.2 63.1a329.5 329.5 0 0 0-30.2 71.2c-3.3 11-5 12.5-14.9 14.2-45 7.7-92.5 54-105.5 103.5a194.5 194.5 0 0 0-1 73c14.6 63.4 77.5 112.6 143.6 112.6 89.6 0 160.4-81.5 147-169a146 146 0 0 0-119.7-122.1c-11-1.8-19.9-4.8-19.9-6.9 0-5.3 22.9-51 33.2-66 5-7.8 18.1-23 28.5-33.9 20.5-21.3 24.3-32.3 13.6-40-6.2-4.8-6.2-4.8-17.5.3zm-14.8 172c79.8 39.1 97.3 142.6 34.1 201.6-72.3 67.9-188.6 27.3-204.6-71.2A126.3 126.3 0 0 1 490 502.2c10.1-5 19.6-9.2 21.4-9.2 2 0 3 9 2.4 26.7-1.5 32.6 4.7 63.5 17.2 85.1 8.3 14.3 14 20.8 16.3 18.1a129 129 0 0 0-4.8-24.6c-7.7-32.6-6.8-82.1 2.1-108 2-6.5 26.4-1.7 50.1 9.9zM117.6 477a144 144 0 0 0-94.9 76C-5.7 610.7 5 675 50.6 721.6A147.5 147.5 0 0 0 276 703.3a137 137 0 0 0 26-78.6c2.1-44.8-13-83.3-44.4-112.4a151.5 151.5 0 0 0-140-35.3zm79.5 19.3c21 7.7 44.2 26.1 58.4 46.6 36.5 52.1 25 129-25.8 166.9a121.4 121.4 0 0 1-185.3-46c-22-46.8-11.6-101 26.4-139.3A115.3 115.3 0 0 1 197 496.3z"/>
  </svg>
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