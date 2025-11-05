// URL del archivo JSON
const url = "https://raw.githubusercontent.com/Blissxfun/LuxStream/main/peliculas.json";

const contenedor = document.getElementById("peliculas");
const inputBuscar = document.getElementById("buscar");
let listaPeliculas = [];
let indiceSeleccionado = 0;

// 🔹 Cargar películas
fetch(url)
  .then(res => res.json())
  .then(peliculas => {
    listaPeliculas = peliculas;
    mostrarPeliculas(listaPeliculas);
    setTimeout(() => enfocarPelicula(0), 400); // Enfoca al cargar
  })
  .catch(err => console.error("Error cargando las películas:", err));

// 🔹 Función para mostrar películas
function mostrarPeliculas(peliculas) {
  contenedor.innerHTML = "";
  peliculas.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("pelicula");
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.titulo}">
      <h3>${p.titulo}</h3>
    `;
    card.onclick = () => window.location.href = `ver.html?id=${p.id}`;
    contenedor.appendChild(card);
  });
  indiceSeleccionado = 0;
  enfocarPelicula(0);
}

// 🔹 Búsqueda en tiempo real
inputBuscar.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtradas = listaPeliculas.filter(p =>
    p.titulo.toLowerCase().includes(texto)
  );
  mostrarPeliculas(filtradas);
});

// --- 🎮 Navegación con control remoto / teclado ---
function enfocarPelicula(index) {
  const tarjetas = document.querySelectorAll(".pelicula");
  if (tarjetas.length === 0) return;

  tarjetas.forEach(card => card.classList.remove("seleccionada"));
  const actual = tarjetas[index];
  if (actual) {
    actual.classList.add("seleccionada");
    actual.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

document.addEventListener("keydown", e => {
  const tarjetas = document.querySelectorAll(".pelicula");
  if (tarjetas.length === 0) return;

  // Determinar columnas según el ancho de pantalla
  const columnas = Math.floor(document.body.clientWidth / 220);

  switch (e.key) {
    case "ArrowRight":
      if (indiceSeleccionado < tarjetas.length - 1) indiceSeleccionado++;
      enfocarPelicula(indiceSeleccionado);
      break;

    case "ArrowLeft":
      if (indiceSeleccionado > 0) indiceSeleccionado--;
      enfocarPelicula(indiceSeleccionado);
      break;

    case "ArrowDown":
      if (indiceSeleccionado + columnas < tarjetas.length)
        indiceSeleccionado += columnas;
      enfocarPelicula(indiceSeleccionado);
      break;

    case "ArrowUp":
      if (indiceSeleccionado - columnas >= 0)
        indiceSeleccionado -= columnas;
      enfocarPelicula(indiceSeleccionado);
      break;

    case "Enter":
    case "NumpadEnter":
      tarjetas[indiceSeleccionado].click();
      break;
  }
});
