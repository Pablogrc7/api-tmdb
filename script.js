import { apiKey } from "./api.js";

const apiURL = "https://api.themoviedb.org/3/discover/movie";
let moviesArray = [];

async function displayMovies() {
  for (let i = 1; i <= 4; i++) {
    const movieProperties = await getMovies(i);
    addMoviesToArray(movieProperties);
  }

  const allMovies = moviesArray;
  displayAllMovies(allMovies);
}

async function getMovies(page) {
  try {
    const response = await fetch(`${apiURL}?api_key=${apiKey}&page=${page}`);
    if (response.status === 404) {
      alert("No se encontró tu llave");
      return;
    }
    return response.json();
  } catch (err) {
    alert("Error al intentar conectar con el servidor");
  }
}

function addMoviesToArray(movie) {
  moviesArray = moviesArray.concat(movie.results);
}

function filterPremierMovies() {
  const currentDate = new Date();
  return moviesArray.filter((result) => {
    const releaseDate = new Date(result.release_date);
    return releaseDate >= currentDate;
  });
}

function displayAllMovies(movies) {
  const movieList = document.getElementById("movie_container");
  movieList.innerHTML = '';
  movies.forEach((result) => {
    const element = document.createElement("div");
    const uri = `https://image.tmdb.org/t/p/w500${result.poster_path}`;

    element.innerHTML = `
      <strong>ID: </strong> ${result.id}
      <strong>Title: </strong> ${result.title}
      <strong>Date: </strong> ${result.release_date}
      <div></div> 
      <img src="${uri}" width="250"></img>
    `;
    movieList.appendChild(element);
  });
}

const select = document.getElementById("select");
select.addEventListener("change", async () => {
  if (select.value === "Estrenos") {
    const premierMovies = filterPremierMovies();
    displayAllMovies(premierMovies);
  } else {
    const allMovies = moviesArray;
    displayAllMovies(allMovies);
  }
});

displayMovies();
