const track = document.querySelector(".carousel-feedback");
const slides = document.querySelectorAll(".block-main");
const prev = document.querySelector(".seta-esquerda");
const next = document.querySelector(".seta-direita");
const pontos = document.querySelectorAll(".pointer1");
const menuBtn = document.querySelector(".btn-menu");
const menu = document.querySelector(".side-bar");



let index = 1; // começa no meio, como antes

function updateCarousel() {
    const slideWidth = slides[0].clientWidth;

    // Centraliza o slide ativo
    const offset = (track.clientWidth / 2) - (slideWidth / 2);
    track.style.transform = `translateX(${offset - index * slideWidth}px)`;

    // Atualiza os pontos
    pontos.forEach((p, i) => {
        const img = p.querySelector("img");
        img.src = i === index ? "imgs/pointer-selected.svg" : "imgs/pointer-default.svg";
    });
}

// Avançar
next.addEventListener("click", () => {
    if (index < slides.length - 1) {
        index++;
    } else {
        // chegou no limite direito → volta para o índice 0
        index = 0;
    }
    updateCarousel();
});

// Voltar
prev.addEventListener("click", () => {
    if (index > 0) {
        index--;
    } else {
        // chegou no limite esquerdo → volta para o índice 0
        index = 0;
    }
    updateCarousel();
});

// Inicializa
updateCarousel();


function ativarMenu() {
    menu.classList.toggle("ativo");
    setTimeout( ()=> {

        menuBtn.src = menu.classList.contains("ativo") ? "imgs/menu-white.png" : "imgs/menu.svg";
    }, 300);
}

menuBtn.addEventListener("click", ativarMenu);