const header = document.getElementById("main-header");
let timer;

// Función para ocultar el header
function ocultarHeader() {
  header.style.transform = "translateY(-100%)";
}

// Función para mostrar el header
function mostrarHeader() {
  header.style.transform = "translateY(0)";
}

// Mostrar al entrar
mostrarHeader();

// Ocultar tras 3s sin mover pantalla
function reiniciarTimer() {
  mostrarHeader();
  clearTimeout(timer);
  timer = setTimeout(ocultarHeader, 1500);
}

// Detectar scroll o movimiento
window.addEventListener("scroll", reiniciarTimer);
window.addEventListener("mousemove", reiniciarTimer);
window.addEventListener("touchstart", reiniciarTimer);

// Iniciar el timer al cargar
reiniciarTimer();
