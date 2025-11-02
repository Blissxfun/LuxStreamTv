const url = "https://raw.githubusercontent.com/Blissxfun/LuxStream/main/peliculas.json";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

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
let peli;

fetch(url)
  .then(res => res.json())
  .then(peliculas => {
    peli = peliculas.find(p => p.id === id);
    if (!peli) return alert("Película no encontrada 😢");

    imagen.src = peli.imagen;
    titulo.textContent = peli.titulo;
    descripcion.textContent = peli.descripcion;
    año.textContent = peli.año;
    duracion.textContent = peli.duracion;
    clasificacion.textContent = peli.clasificacion;
    idioma.textContent = peli.idioma;
    director.textContent = peli.director;
    actor.textContent = peli.actor;
    fondoBorroso.style.backgroundImage = `url(${peli.imagen})`;

    verBtn.onclick = () => iniciarVideo(peli.url);

    iniciarCuentaRegresiva();
  })
  .catch(err => console.error("Error al cargar:", err));

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

function iniciarVideo(url, auto = false) {
  video.src = url;
  videoContainer.style.display = "flex";
  video.play();

  // Pantalla completa automática
  if (video.requestFullscreen) {
    video.requestFullscreen().catch(() => {});
  }
}

cerrarVideo.onclick = () => {
  video.pause();
  videoContainer.style.display = "none";
  document.exitFullscreen?.();
};
