import { apiKey } from "./api.js";

const apiURL = "https://api.themoviedb.org/3/discover/movie";
const MAX_PAGES = 50;
const SELECT_ESTRENOS = "Estrenos";

let moviesArray = [];

async function displayMovies() {
  for (let i = 1; i <= MAX_PAGES; i++) {
    const movieProperties = await getMovies(i);
    addMoviesToArray(movieProperties);
  }

  displayAllMovies(moviesArray);
}

async function getMovies(page) {
  try {
    const response = await fetch(`${apiURL}?api_key=${apiKey}&page=${page}`);
    if (!response.ok) {
      throw new Error(`Error fetching movies. Status: ${response.status}`);
    }
    return response.json();
  } catch (err) {
    console.error("Error:", err.message);
    alert("Error al intentar conectar con el servidor");
  }
}

function addMoviesToArray(movie) {
  moviesArray = moviesArray.concat(movie.results);
}

function filterPremierMovies() {
  const currentDate = new Date();
  return moviesArray.filter((result) => new Date(result.release_date) >= currentDate);
}

function displayAllMovies(movies) {
  const movieList = document.getElementById("movie_container");
  const fragment = document.createDocumentFragment();

  movies.forEach((result) => {
    const element = createMovieElement(result);
    fragment.appendChild(element);
  });

  movieList.innerHTML = '';
  movieList.appendChild(fragment);
}

function createMovieElement(result) {
  const element = document.createElement("div");
  const uri = `https://image.tmdb.org/t/p/w500${result.poster_path}`;

  element.innerHTML = `
    <strong>ID: </strong> ${result.id}
    <strong>Title: </strong> ${result.title}
    <strong>Date: </strong> ${result.release_date}
    <div></div> 
    <img src="${uri}" width="250"></img>
  `;
  return element;
}

const select = document.getElementById("select");
const searchButton = document.getElementById("search");
const movieNameInput = document.getElementById("movieName");

select.addEventListener("change", async () => {
  const selectedValue = select.value;

  if (selectedValue === SELECT_ESTRENOS) {
    hideSearchElements();
    const premierMovies = filterPremierMovies();
    displayAllMovies(premierMovies);
  } else {
    showSearchElements();
    displayAllMovies(moviesArray);
  }
});

searchButton.addEventListener("click", handleSearch);

async function handleSearch() {
  const searchTerm = movieNameInput.value.toLowerCase();
  const filteredMovies = filterMoviesByTitle(searchTerm);

  if (filteredMovies.length === 0) {
    displayNotFoundMessage("No se encontraron películas con ese título.");
  } else {
    displayAllMovies(filteredMovies);
  }

  movieNameInput.value = '';
}

function displayNotFoundMessage(message) {
  const movieList = document.getElementById("movie_container");
  movieList.innerHTML = `<p style="color: red;">${message}</p>`;
}

function filterMoviesByTitle(searchTerm) {
  return moviesArray.filter((result) => result.title.toLowerCase().includes(searchTerm));
}

function hideSearchElements() {
  searchButton.style.display = "none";
  movieNameInput.style.display = "none";
}

function showSearchElements() {
  searchButton.style.display = "inline-block";
  movieNameInput.style.display = "inline-block";
}

displayMovies();
