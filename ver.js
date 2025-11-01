const url = "https://raw.githubusercontent.com/Blissxfun/LuxStream/main/peliculas.json";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const video = document.getElementById("video");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const actores = document.getElementById("actores");

// Cargar la película
fetch(url)
  .then(res => res.json())
  .then(peliculas => {
    const pelicula = peliculas.find(p => p.id == id);
    if (pelicula) {
      titulo.textContent = pelicula.titulo;
      descripcion.textContent = pelicula.descripcion;
      video.src = pelicula.url;

      // Información extra (opcional)
      fecha.textContent = pelicula.fecha ? `Fecha: ${pelicula.fecha}` : '';
      actores.textContent = pelicula.actores ? `Actores: ${pelicula.actores}` : '';

      video.play();
    } else {
      document.body.innerHTML = "<h2>Película no encontrada 😢</h2>";
    }
  })
  .catch(err => console.error("Error:", err));
