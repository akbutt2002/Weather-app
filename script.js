// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const API_KEY = "216b6af3bf24d66f75d30a5eb2af03f1";
const weatherInfo = document.getElementById("weather-info");

async function getWeather() {
  const location = document.getElementById("location").value;

  if (!location) {
    showError("Please enter a location");
    return;
  }

  // Show loading state
  weatherInfo.innerHTML = `
        <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    `;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Location not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  const weather = {
    location: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
  };

  weatherInfo.innerHTML = `
        <div class="space-y-3 sm:space-y-4">
            <div class="flex items-center justify-center">
                <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" 
                     alt="${weather.description}" 
                     class="w-16 h-16 sm:w-20 sm:h-20">
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">${weather.location}, ${weather.country}</h2>
            <p class="text-3xl sm:text-4xl font-bold text-blue-500">${weather.temperature}°C</p>
            <p class="text-sm sm:text-base text-gray-600 capitalize">${weather.description}</p>
            <div class="grid grid-cols-2 gap-2 sm:gap-4 mt-3 sm:mt-4">
                <div class="bg-gray-100 p-2 sm:p-3 rounded-lg">
                    <p class="text-xs sm:text-sm text-gray-600">Humidity</p>
                    <p class="text-base sm:text-lg font-semibold">${weather.humidity}%</p>
                </div>
                <div class="bg-gray-100 p-2 sm:p-3 rounded-lg">
                    <p class="text-xs sm:text-sm text-gray-600">Wind Speed</p>
                    <p class="text-base sm:text-lg font-semibold">${weather.windSpeed} m/s</p>
                </div>
            </div>
        </div>
    `;
}

function showError(message) {
  weatherInfo.innerHTML = `
        <div class="text-red-500 font-semibold text-sm sm:text-base py-4">
            ${message}
        </div>
    `;
}

// Add event listener for Enter key
document.getElementById("location").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
