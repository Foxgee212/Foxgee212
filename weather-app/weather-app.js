const form = document.getElementById("weather-form");
const input = document.getElementById("city-input");
const result = document.getElementById("weather-result");

const cityName = document.getElementById("city-name");
const icon = document.getElementById("weather-icon");
const description = document.getElementById("description");
const temp = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const darkToggle = document.getElementById("dark-toggle");

form.onsubmit = async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  const API_KEY = "c93e6fddbe57c0dc595e59cca16f23e7"; // Replace this
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temp.textContent = Math.round(data.main.temp);
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;

    result.classList.remove("hidden");
  } catch (err) {
    alert("Error: " + err.message);
    result.classList.add("hidden");
  }
};

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("weatherDark", document.body.classList.contains("dark"));
};

if (localStorage.getItem("weatherDark") === "true") {
  document.body.classList.add("dark");
}
