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
// const carousel = document.querySelector('.carousel');
// const carouselContainer = carousel.querySelector('.carousel-container');
// const carouselItems = carousel.querySelectorAll('.carousel-item');

// let currentIndex = 0;
// let translateX = 0;

// function slideCarousel() {
//   currentIndex++;

//   if (currentIndex > carouselItems.length - 1) {
//     currentIndex = 0;
//   }

//   translateX = -currentIndex * carouselItems[0].offsetWidth;

//   carouselContainer.style.transform = `translateX(${translateX}px)`;
// }

// setInterval(slideCarousel, 3000);

// CARROSSEL MOBILE
const carousel = document.querySelector('.carousel');
const carouselContainer = carousel.querySelector('.carousel-container');
const carouselItems = carousel.querySelectorAll('.carousel-item');

let currentIndex = 0;
let startX = 0;
let currentTranslateX = 0;
let previousTranslateX = 0;
let dragging = false;

function slideCarousel() {
  currentIndex++;

  if (currentIndex > carouselItems.length - 1) {
    currentIndex = 0;
  }

  currentTranslateX = -currentIndex * carousel.clientWidth;

  carouselContainer.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
}

function startDrag(event) {
  event.preventDefault();

  dragging = true;
  startX = event.touches[0].clientX;
  previousTranslateX = currentTranslateX;
}

function drag(event) {
  event.preventDefault();

  if (dragging) {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslateX = previousTranslateX + deltaX;

    carouselContainer.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
  }
}

function endDrag(event) {
  event.preventDefault();

  dragging = false;

  const threshold = carousel.clientWidth / 3;
  const deltaX = currentTranslateX - previousTranslateX;

  if (deltaX > threshold && currentIndex > 0) {
    currentIndex--;
  } else if (deltaX < -threshold && currentIndex < carouselItems.length - 1) {
    currentIndex++;
  }

  slideCarousel();
}

carousel.addEventListener('touchstart', startDrag);
carousel.addEventListener('touchmove', drag);
carousel.addEventListener('touchend', endDrag);
carousel.addEventListener('touchcancel', endDrag);

