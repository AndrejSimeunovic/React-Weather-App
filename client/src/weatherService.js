import { ICON_MAP } from "./iconMap";

export default async function getWeatherDataByCity(value) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/openweathermap?q=${value}`
    );
    const data = await res.json();
    const lonlat = await getLonLat(data);
    const customData = await fetchForecast(lonlat, data);
    return customData;
  } catch (error) {
    throw new Error("City not found!");
  }
}

async function getLonLat(data) {
  const lon = Math.round(data.coord.lon * 100) / 100;
  const lat = Math.round(data.coord.lat * 100) / 100;
  return { lon, lat };
}

async function fetchForecast({ lon, lat }, dataOW) {
  return fetch(
    `http://localhost:5000/api/open-meteo?latitude=${lat}&longitude=${lon}`
  )
    .then((res) => res.json())
    .then((data) => {
      return {
        current: parseCurrent(data, dataOW),
        daily: parsedaily(data),
        hourly: parseHourly(data),
      };
    });
}

function parseCurrent({ current_weather, daily }, dataOW) {
  const {
    temperature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
  } = current_weather;

  const {
    temperature_2m_max: [highTemp],
    temperature_2m_min: [lowTemp],
    apparent_temperature_max: [highFeelsLike],
    apparent_temperature_min: [lowFeelsLike],
    sunrise: [sunRise],
    sunset: [sunSet],
  } = daily;

  return {
    name: dataOW.name,
    country: dataOW.sys.country,
    description: dataOW.weather[0].main,
    humidity: dataOW.main.humidity,
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(highTemp),
    lowTemp: Math.round(lowTemp),
    highFeelsLike: Math.round(highFeelsLike),
    lowFeelsLike: Math.round(lowFeelsLike),
    feelsLike: Math.round(dataOW.main.feels_like),
    sunRise: parseTime(sunRise * 1000),
    sunSet: parseTime(sunSet * 1000),
    windSpeed: Math.round(windSpeed),
    iconCode: parseIcon(iconCode),
  };
}

function parsedaily({ daily }) {
  return daily.time
    .map((time, index) => {
      return {
        timeStamp: parseDay(time * 1000),
        iconCode: parseIcon(daily.weathercode[index]),
        maxTemp: Math.round(daily.temperature_2m_max[index]),
      };
    })
    .slice(1, 6);
}

function parseHourly({ hourly, current_weather }) {
  return hourly.time
    .map((time, index) => {
      return {
        timeStamp: parseTime(time * 1000),
        iconCode: parseIcon(hourly.weathercode[index]),
        temp: Math.round(hourly.temperature_2m[index]),
      };
    })
    .filter(
      ({ timeStamp }) => timeStamp >= parseTime(current_weather.time * 1000)
    )
    .slice(1, 6);
}

function parseTime(time) {
  const timeFormat = new Date(time);
  return timeFormat.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function parseIcon(iconCode) {
  return ICON_MAP.get(iconCode);
}

function parseDay(time) {
  const date = new Date(time);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}
