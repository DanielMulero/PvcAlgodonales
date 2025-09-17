const slides = document.querySelectorAll(".color-slide");
const prevBtn = document.querySelector(".color-btn.prev");
const nextBtn = document.querySelector(".color-btn.next");

let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

showSlide(current);

prevBtn.addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});
