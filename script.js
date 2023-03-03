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

// PERCORRER PRODUTOS + VENDIDOS
const cardsContainer = document.querySelector('.cards-container');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId = 0;
let currentIndex = 0;

function onTouchStart(e) {
  currentIndex = Array.from(cardsContainer.children).indexOf(e.target);
  startPosition = e.touches[0].clientX;
  isDragging = true;

  // interrompe a animação atual, se houver
  cancelAnimationFrame(animationId);
}

function onTouchMove(e) {
  if (isDragging) {
    const currentPosition = e.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
}

function onTouchEnd() {
  isDragging = false;

  // determina para qual card o usuário "arrastou" e ajusta o deslocamento
  const cards = Array.from(cardsContainer.children);
  const cardWidth = cards[0].getBoundingClientRect().width;
  const cardTranslate = currentTranslate / cardWidth;
  const roundCardTranslate = Math.round(cardTranslate);

  if (roundCardTranslate < 0) {
    currentIndex = 0;
  } else if (roundCardTranslate >= cards.length - 1) {
    currentIndex = cards.length - 1;
  } else {
    currentIndex = roundCardTranslate;
  }

  currentTranslate = currentIndex * -cardWidth;
  prevTranslate = currentTranslate;

  // anima o scroll para o card selecionado
  requestAnimationFrame(() => {
    animateScroll();
  });
}

function animateScroll() {
  cardsContainer.style.transform = `translateX(${currentTranslate}px)`;

  // atualiza a posição do card atual
  const cards = Array.from(cardsContainer.children);
  cards.forEach((card, index) => {
    if (index === currentIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // requisita animação recursiva até o deslocamento atual ser igual ao deslocamento desejado
  if (currentTranslate !== prevTranslate) {
    animationId = requestAnimationFrame(animateScroll);
  }
}

cardsContainer.addEventListener('touchstart', onTouchStart);
cardsContainer.addEventListener('touchmove', onTouchMove);
cardsContainer.addEventListener('touchend', onTouchEnd);



