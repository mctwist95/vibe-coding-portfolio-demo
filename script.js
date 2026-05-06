const API_KEY = "415b4849f4d1d3db22b7275eaa581f10";
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.getElementById("movie-grid");
const statusEl = document.getElementById("status");

function createMovieCard(movie) {
  const card = document.createElement("article");
  card.className = "movie-card";

  const poster = document.createElement("img");
  poster.className = "poster";
  poster.src = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  poster.alt = `${movie.title} 포스터`;
  poster.loading = "lazy";

  const title = document.createElement("h2");
  title.className = "movie-title";
  title.textContent = movie.title;

  card.append(poster, title);
  return card;
}

async function loadNowPlayingMovies() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const movies = data.results ?? [];

    movieGrid.innerHTML = "";

    if (movies.length === 0) {
      statusEl.textContent = "현재 표시할 영화가 없습니다.";
      return;
    }

    const fragment = document.createDocumentFragment();
    movies.forEach((movie) => {
      fragment.appendChild(createMovieCard(movie));
    });

    movieGrid.appendChild(fragment);
    statusEl.textContent = `${movies.length}개의 현재 상영작`;
  } catch (error) {
    console.error(error);
    statusEl.textContent = "영화 데이터를 불러오지 못했습니다. API Key를 확인해주세요.";
  }
}

loadNowPlayingMovies();
