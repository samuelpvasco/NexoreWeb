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
    setTimeout(()=> {
        const isDark = document.body.classList.contains("dark");
        // em modo escuro mantém ícone branco; no modo claro alterna conforme estado do menu
        if (isDark) {
            menuBtn.src = "imgs/menu-white.png";
        } else {
            menuBtn.src = menu.classList.contains("ativo") ? "imgs/menu-white.png" : "imgs/menu.svg";
        }
    }, 300);
}

menuBtn.addEventListener("click", ativarMenu);
const form = document.querySelector(".form-talk");
const popup = document.getElementById("popup");
const fecharPopup = document.getElementById("fecharPopup");

form.querySelector("button").addEventListener("click", () => {

    // pega valores
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // valida
    if (!nome || !email || !mensagem) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    // mostra popup
    popup.style.display = "flex";

    // limpa form
    form.reset();
});

// botão fechar popup
fecharPopup.addEventListener("click", () => {
    popup.style.display = "none";
});

// fechar clicando fora
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

function mudarImagemTema() {
    const imgLogo = document.getElementsByClassName("img-logo");
    const imgTema = document.getElementsByClassName("btn-tema");
    const imgIllustration = document.getElementsByClassName("phone-img");
    const imgIllustration2 = document.getElementsByClassName("form-illustration");
    const imgMenuBtn = document.getElementsByClassName("btn-menu");

    if (document.body.classList.contains("dark")) {
        for (let img of imgLogo) {
            img.src = "imgs/dark/NexoreWhite.png";
        }
        for (let img of imgTema) {
            img.src = "imgs/dark/temaWhite.png";
        }
        for (let img of imgIllustration) {
            img.src = "imgs/dark/IllustrationWhite.svg";
        }
        for (let img of imgIllustration2) {
            img.src = "imgs/dark/Illustration2White.png";
        }
        for (let img of imgMenuBtn) {
            img.src = "imgs/menu-white.png";
        }
    } else {
        for (let img of imgLogo) {
            img.src = "imgs/nexore-logo.png";
        }
        for (let img of imgTema) {
            img.src = "imgs/tema-img.png";
        }
        for (let img of imgIllustration) {
            img.src = "imgs/phone-img.png";
        }
        for (let img of imgIllustration2) {
            img.src = "imgs/Illustration.svg";
        }
        for (let img of imgMenuBtn) {
            img.src = "imgs/menu.svg";
        }
    }
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark");

    // Salva o tema escolhido
    if (body.classList.contains("dark")) {
        localStorage.setItem("tema", "dark");
    } else {
        localStorage.setItem("tema", "light");
    }
    mudarImagemTema();
}

// Mantém o tema salvo ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
    const tema = localStorage.getItem("tema");
    if (tema === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    // atualiza todas as imagens conforme o tema atual
    mudarImagemTema();

    // garante src correto do botão de menu caso seja selecionado por querySelector
    if (menu && menuBtn) {
        menuBtn.src = document.body.classList.contains("dark") || menu.classList.contains("ativo")
            ? "imgs/menu-white.png"
            : "imgs/menu.svg";
    }
});
