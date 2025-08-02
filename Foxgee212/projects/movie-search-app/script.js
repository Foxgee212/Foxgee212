const form = document.getElementById("movie-form");
const input = document.getElementById("movie-input");
const result = document.getElementById("movie-result");

const poster = document.getElementById("poster");
const title = document.getElementById("title");
const genre = document.getElementById("genre");
const year = document.getElementById("year");
const plot = document.getElementById("plot");
const darkToggle = document.getElementById("dark-toggle");

form.onsubmit = async (e) => {
  e.preventDefault();
  const movie = input.value.trim();
  if (!movie) return;

  const API_KEY = "7dfb8f83"; // Replace this
  const url = `https://www.omdbapi.com/?t=${movie}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
      alert("Movie not found!");
      result.classList.add("hidden");
      return;
    }

    poster.src = data.Poster !== "N/A" ? data.Poster : "";
    title.textContent = data.Title;
    genre.textContent = data.Genre;
    year.textContent = data.Year;
    plot.textContent = data.Plot;

    result.classList.remove("hidden");
  } catch (err) {
    alert("Error fetching movie data.");
  }
};

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("movieDark", document.body.classList.contains("dark"));
};

if (localStorage.getItem("movieDark") === "true") {
  document.body.classList.add("dark");
}
