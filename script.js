const apikey = "ccffe1fa1824317235e5988f34237a7a";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const units = "&units=metric";

const searchBox = document.querySelector("#inputfeild");
const searchBtn = document.querySelector(".searchbtn button");
const weatherIcon = document.querySelector(".weathericon img");

async function getWeather(city) {
  try {
    const response = await fetch(`${url}${city}${units}&appid=${apikey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".weathercity h1").innerHTML = data.name;
    document.querySelector(".weatherpoints h1").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png"; 
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = "images/default.png";
    } 

  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("City not found or API issue!");
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather(searchBox.value);
  }
});
