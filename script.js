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
  <div class="container text-center">
    <div class="row">
      <div class="col">
      <div class="flex">
        <div class="card border-success mb-3 mx-auto" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Pelicula: ${result.title}</h5>
            <p class="card-text">Fecha: ${result.release_date}.</p>
            <img src="${uri}" class="card-img-top" alt="..." width="250">
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  
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
