import { apiKey } from "./api.js";
console.log(apiKey)

const apiURL = "https://api.themoviedb.org/3/discover/movie?api_key="


async function displayMovie() {
  const movieProperties = await getMovie();
  console.log(movieProperties);
  addMovieUI(movieProperties);
}

async function getMovie() {
  try {
    const response = await fetch(apiURL + apiKey);
    if (response.status === 404) {
      alert("No se encontró tu llave");
      return;
    }
    return response.json();
  } catch (err) {
    alert("Error al intentar conectar con el servidor");
  }
}

function addMovieUI(movie) {
  const movieList = document.getElementById("movie_container");
  const element = document.createElement("div");
  const uri = `https://image.tmdb.org/t/p/w500${movie.results[2].poster_path}`;
  element.innerHTML = `
  <img src=${uri} width ="300"></img>
    <strong>ID: </strong> ${movie.results[2].id}
    <strong>Name: </strong> ${movie.results[2].title}
  `;
  movieList.appendChild(element);
}

displayMovie();
//yo primero desde mi branch


  