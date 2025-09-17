const galeria = document.querySelectorAll(".galeria-slides img");
const prevGaleria = document.querySelector(".galeria-btn.prev");
const nextGaleria = document.querySelector(".galeria-btn.next");

let galeriaIndex = 0;

function showGaleria(index) {
  galeria.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });
}

showGaleria(galeriaIndex);

prevGaleria.addEventListener("click", () => {
  galeriaIndex = (galeriaIndex - 1 + galeria.length) % galeria.length;
  showGaleria(galeriaIndex);
});

nextGaleria.addEventListener("click", () => {
  galeriaIndex = (galeriaIndex + 1) % galeria.length;
  showGaleria(galeriaIndex);
});
