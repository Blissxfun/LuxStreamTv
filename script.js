// URL del archivo JSON
const url = "https://raw.githubusercontent.com/Blissxfun/LuxStream/main/peliculas.json";

const contenedor = document.getElementById("peliculas");
const inputBuscar = document.getElementById("buscar");
let listaPeliculas = [];

// 🔹 Cargar películas
fetch(url)
  .then(res => res.json())
  .then(peliculas => {
    listaPeliculas = peliculas;
    mostrarPeliculas(listaPeliculas);
  })
  .catch(err => console.error("Error cargando las películas:", err));

// 🔹 Función para mostrar
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
}

// 🔹 Búsqueda en tiempo real
inputBuscar.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtradas = listaPeliculas.filter(p =>
    p.titulo.toLowerCase().includes(texto)
  );
  mostrarPeliculas(filtradas);
});
