let nav = document.querySelector("nav");
let span_icon_chevron = document.querySelector("#span-icon-chevron");
let icon_menu = document.querySelector("#icon-menu");
let btn_shopee = document.querySelector("#btn-canais-venda");

nav.addEventListener(`click`, showSubMenu);
btn_shopee.addEventListener('click', () => {
    window.open("https://shopee.com.br/kapepapelaria", "_blank");
});

function showSubMenu(){
    nav.classList.toggle("min-height-submenu");
    span_icon_chevron.classList.toggle("display-invisible");
    
    if (icon_menu.className == "fa fa-times"){
        icon_menu.className = "fa fa-bars";
    } else{
        icon_menu.className = "fa fa-times";
    }
}

// CARROSSEL
const carousel = document.querySelector('.carousel');
const carouselContainer = carousel.querySelector('.carousel-container');
const carouselItems = carousel.querySelectorAll('.carousel-item');

let currentIndex = 0;
let translateX = 0;

function slideCarousel() {
  currentIndex++;

  if (currentIndex > carouselItems.length - 1) {
    currentIndex = 0;
  }

  translateX = -currentIndex * carouselItems[0].offsetWidth;

  carouselContainer.style.transform = `translateX(${translateX}px)`;
}

// setInterval(slideCarousel, 3000);
