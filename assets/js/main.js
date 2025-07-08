import { projetos } from "./projetos.js";

/* ========== ELEMENTOS DOM ========== */
const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
const toggle = document.querySelector("#sw-checkbox");
const projectsSection = document.querySelector("#projects .wrapper");

const notebook_1 = document.querySelector("#notebook-1");
const notebook_2 = document.querySelector("#notebook-2");
const notebook_2_white = document.querySelector("#notebook-2-white");
const vidro = document.querySelector("#vidro");

const sections = ["about", "projects", "knowledge", "contact"].map((id) =>
  document.getElementById(id)
);

/* ========== EVENTOS ========== */
window.addEventListener("load", () => {
  projetos(projectsSection);
  const desafioBtn = document.querySelector("#desafio");

  if (desafioBtn) {
    desafioBtn.addEventListener("click", () => {
      desafios(projectsSection);
      document
        .querySelector("#backToProjectsBtn")
        .addEventListener("click", () => location.reload()); // evita erro com `begin` fora de escopo
    });
  }

  // Delay para sumir os notebooks
  setTimeout(() => {
    notebook_1.style.opacity = 0;
    [notebook_1, notebook_2, notebook_2_white, vidro].forEach((el) => {
      el.style.animation = "none";
    });
  }, 4000);
});

window.addEventListener("scroll", onScroll);
onScroll();

toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

document.addEventListener("DOMContentLoaded", () => {
  // Alternar imagem
  const img = document.getElementById("imagem");
  const imagem1 = "./assets/images/bruno3.png";
  const imagem2 = "./assets/images/bruno.jpg";

  if (img) {
    setInterval(() => {
      img.src = img.src.includes("bruno3.png") ? imagem2 : imagem1;
    }, 10000);
  }

  // Abrir/fechar menu
  document
    .querySelectorAll(".open")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        document.body.classList.add("menu-expanded")
      )
    );

  document
    .querySelectorAll(".close")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        document.body.classList.remove("menu-expanded")
      )
    );

  // WhatsApp dropdown (por clique)
  const toggleButton = document.querySelector(".whatsapp-toggle");
  const dropdown = document.getElementById("whatsappMenu");

  if (toggleButton && dropdown) {
    toggleButton.addEventListener("click", () => {
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    // Fecha ao clicar fora
    document.addEventListener("click", (e) => {
      if (!toggleButton.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }
});

/* ========== SCROLL BEHAVIOR ========== */
function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();
  sections.forEach(activateMenuAtCurrentSection);
}

function showNavOnScroll() {
  navigation.classList.toggle("scroll", scrollY > 0);
}

function showBackToTopButtonOnScroll() {
  backToTopButton.classList.toggle("show", scrollY > 550);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionInView =
    targetLine >= sectionTop && targetLine <= sectionTop + sectionHeight;

  const menuElement = document.querySelector(`.menu a[href*="${section.id}"]`);
  if (menuElement) {
    menuElement.classList.toggle("active", sectionInView);
  }
}
 function toggleWhatsappMenu() {
    const menu = document.getElementById("whatsappMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  document.addEventListener("click", function (e) {
    const toggleBtn = document.querySelector(".whatsapp-toggle");
    const dropdown = document.getElementById("whatsappMenu");
    if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
/* ========== ANIMAÇÕES ========= */
ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(`
  #home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledge header,
  #knowledge .card,
  #contact,
  #contact header
`);
