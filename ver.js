// URL del archivo JSON
const url = "https://raw.githubusercontent.com/Blissxfun/LuxStream/main/peliculas.json";

// Obtener el ID desde la URL (ver.html?id=123)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Referencias a los elementos HTML
const imagen = document.getElementById("imagen");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const año = document.getElementById("año");
const duracion = document.getElementById("duracion");
const clasificacion = document.getElementById("clasificacion");
const idioma = document.getElementById("idioma");
const director = document.getElementById("director");
const actor = document.getElementById("actor");
const verBtn = document.getElementById("verBtn");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");
const cerrarVideo = document.getElementById("cerrarVideo");
const fondoBorroso = document.getElementById("fondoBorroso");
const contador = document.getElementById("contador");

let segundos = 5;
let peli = null;

// 🔹 Cargar las películas
fetch(url)
  .then(res => res.json())
  .then(peliculas => {
    // Buscar la película por ID
    peli = peliculas.find(p => p.id === id);

    if (!peli) {
      alert("❌ Película no encontrada.");
      window.location.href = "index.html"; // volver a inicio
      return;
    }

    // Mostrar los datos de la película
    mostrarDetalles(peli);

    // Iniciar el contador
    iniciarCuentaRegresiva();
  })
  .catch(err => {
    console.error("Error cargando las películas:", err);
    alert("Hubo un error al cargar la película 😢");
  });

// 🔹 Función para mostrar la información
function mostrarDetalles(p) {
  imagen.src = p.imagen;
  titulo.textContent = p.titulo;
  descripcion.textContent = p.descripcion;
  año.textContent = p.año;
  duracion.textContent = p.duracion;
  clasificacion.textContent = p.clasificacion;
  idioma.textContent = p.idioma;
  director.textContent = p.director;
  actor.textContent = p.actor;
  fondoBorroso.style.backgroundImage = `url(${p.imagen})`;

  verBtn.onclick = () => iniciarVideo(p.url);
}

// 🔹 Cuenta regresiva antes de reproducir
function iniciarCuentaRegresiva() {
  const intervalo = setInterval(() => {
    segundos--;
    contador.textContent = segundos;

    if (segundos <= 0) {
      clearInterval(intervalo);
      iniciarVideo(peli.url, true);
    }
  }, 1000);
}

// 🔹 Reproducir el video
function iniciarVideo(url, auto = false) {
  video.src = url;
  videoContainer.style.display = "flex";
  video.play().catch(() => {});

  // Modo pantalla completa
  if (video.requestFullscreen) {
    video.requestFullscreen().catch(() => {});
  }
}

// 🔹 Cerrar el video
cerrarVideo.onclick = () => {
  video.pause();
  videoContainer.style.display = "none";
  if (document.fullscreenElement) document.exitFullscreen();
};
