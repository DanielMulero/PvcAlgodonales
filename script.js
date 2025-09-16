document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (!toggle || !menu) return; // si no existen, salimos

  // Alterna el menú
  function openMenu() {
    menu.classList.add("show");
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    menu.classList.remove("show");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  function toggleMenu() {
    if (menu.classList.contains("show")) closeMenu();
    else openMenu();
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Cerrar al clicar un enlace del menú
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  // Cerrar al clicar fuera
  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  // Cerrar con ESC
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
});

let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling hacia abajo → ocultar
    header.classList.add("hide");
  } else {
    // Scrolling hacia arriba → mostrar
    header.classList.remove("hide");
  }
  lastScrollY = window.scrollY;
});

(function () {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const AUTO_MS = 5000;

  if (slides.length === 0) return;

  // Crear dots dinámicamente
  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", "Ir a la diapositiva " + (i + 1));
    btn.dataset.index = i;
    if (i === 0) btn.classList.add("active");
    dotsContainer.appendChild(btn);
    return btn;
  });

  let current = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  // Auto-play
  function startAuto() {
    stopAuto();
    timer = setInterval(nextSlide, AUTO_MS);
  }
  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAuto();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAuto();
  });

  dots.forEach((d) => {
    d.addEventListener("click", (e) => {
      const idx = Number(e.currentTarget.dataset.index);
      showSlide(idx);
      startAuto();
    });
  });

  // Pause on hover / touch
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("touchstart", stopAuto, { passive: true });
  carousel.addEventListener("touchend", startAuto, { passive: true });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      startAuto();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
      startAuto();
    }
  });

  // Preload images (optional - ensures transición suave)
  slides.forEach((s) => {
    const img = s.querySelector("img");
    if (img && img.dataset && !img.complete) {
      const tmp = new Image();
      tmp.src = img.src;
    }
  });

  // Iniciar
  showSlide(0);
  startAuto();
})();
