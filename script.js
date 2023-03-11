// -------------SETAR O VH PARA MOBILE-------------
let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);

// ------------------------------------------------

let nav = document.querySelector("nav");
let span_icon_chevron = document.querySelector("#span-icon-chevron");
let icon_menu = document.querySelector("#icon-menu");
let btn_shopee = document.querySelector("#btn-canais-venda");
let divSubMenu = document.querySelector("#submenu-nav")

nav.addEventListener(`click`, showSubMenu);
btn_shopee.addEventListener('click', () => {
    window.open("https://shopee.com.br/kapepapelaria", "_blank");
});

function showSubMenu(){
    nav.classList.toggle("min-height-submenu");
    divSubMenu.classList.toggle("display-invisible");
    span_icon_chevron.classList.toggle("display-invisible");
    
    if (icon_menu.className == "fa fa-times"){
        icon_menu.className = "fa fa-bars";
    } else{
        icon_menu.className = "fa fa-times";
    }
}

// --------------PARA MENU ACOMPANHAR A PAGINA--------------
let posicaoInicialNav = nav.offsetTop;
window.addEventListener('scroll', () => {
  let posicaoScrollAtual = document.documentElement.scrollTop;

  if (posicaoScrollAtual >= posicaoInicialNav){
    nav.classList.add("positionFixed");
  } else if(nav.classList.contains("positionFixed")){
    nav.classList.remove("positionFixed");
    nav.style.top = posicaoInicialNav;
  }

});

// -----------------------------------------------------------

// POSICAO ICONS ASIDE PRODUTOS + VENDIDOS
let iconLeft = document.querySelector("#icon-left");
let iconRight = document.querySelector("#icon-right");

// AJUSTAR POSICIONAMENTO SETAS E PROGRAMAR CLIQUES

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

let cardContainerTranslate = cardsContainer.clientWidth;

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
    // console.log("currentTranslateInicial", currentTranslate);
  }
  
}

function onTouchEnd() {
  isDragging = false;

  // determina para qual card o usuário "arrastou" e ajusta o deslocamento
  const cards = Array.from(cardsContainer.children);
  const cardWidth = cards[0].getBoundingClientRect().width;
  // const cardTranslate = currentTranslate / cardWidth;
  const cardTranslate = cardContainerTranslate / cardWidth;
  const roundCardTranslate = Math.round(cardTranslate);
 

  if (roundCardTranslate < 0) {
    currentIndex = 0;
  } else if (roundCardTranslate >= cards.length - 1) {
    currentIndex = cards.length -1;
  } else {
    currentIndex = roundCardTranslate;
  }

  currentTranslate = currentIndex;
  // console.log("currentTranslate", currentTranslate);
  // console.log("currentIndex", currentIndex);

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

function verificarPosicaoScroll(){
  return cardsContainer.scrollLeft + cardsContainer.clientWidth;
}

function fimScroll(){ 
  return verificarPosicaoScroll() >= cardsContainer.scrollWidth - 1;
}

function inicioScroll(){
  return cardsContainer.scrollLeft == 0;
}

function mudarCorIconsAside(){
  if (fimScroll()){
    iconRight.style.color = "gray";
  } else if(inicioScroll()){
    iconLeft.style.color = "gray";
  } else{
    iconLeft.style.color = "inherit";
    iconRight.style.color = "inherit";
  }
}

cardsContainer.addEventListener('touchstart', onTouchStart);
cardsContainer.addEventListener('touchmove', onTouchMove);
cardsContainer.addEventListener('touchend', onTouchEnd);
mudarCorIconsAside();

cardsContainer.addEventListener("scroll", () => {
  mudarCorIconsAside();
})

// ---------------VALIDACAO FORM--------------------------------------
const form = document.querySelector('form');
		const nameInput = document.querySelector('#name');
		const phoneInput = document.querySelector('#phone');
		const emailInput = document.querySelector('#email');
		const subjectInput = document.querySelector('#subject');
		const messageInput = document.querySelector('#message');

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			if (nameInput.value.trim() === '') {
				alert('Por favor, preencha o campo Nome.');
				nameInput.focus();
				return;
			}
			if (phoneInput.value.trim() === '') {
				alert('Por favor, preencha o campo Telefone.');
				phoneInput.focus();
				return;
			}
			if (emailInput.value.trim() === '') {
				alert('Por favor, preencha o campo E-mail.');
				emailInput.focus();
				return;
			}
			if (subjectInput.value.trim() === '') {
				alert('Por favor, preencha o campo Assunto.');
				subjectInput.focus();
      }
    });

// configuracao form
let inputEmail = document.querySelector("#email");
let labelInputEmail = inputEmail.nextElementSibling;

inputEmail.addEventListener("blur", () => {
  if (inputEmail.value != ""){
    labelInputEmail.style.top = '-18px';
    labelInputEmail.style.left = '0';
    labelInputEmail.style.fontSize = '14px';
  }else{
    labelInputEmail.style.top = '10px';
    labelInputEmail.style.left = '10px';
    labelInputEmail.style.fontSize = '16px';
  }
});

inputEmail.addEventListener("focus", () => {
  labelInputEmail.style.top = '-18px';
  labelInputEmail.style.left = '0';
  labelInputEmail.style.fontSize = '14px';
});