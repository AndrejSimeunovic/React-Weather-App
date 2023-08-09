import React from "react";
import "./WeatherPage.css";

export default function CurrentWeather({ data }) {
  return (
    <>
      <div className="currentweather">
        <div className="city">
          {data.current.name}, {data.current.country}
        </div>
        <div className="weather">{data.current.description}</div>

        <div className="details">
          <img
            className="currentImg"
            src={`/icons/${data.current.iconCode}.png`}
            alt="weather"
          />
          <div className="temp">{data.current.currentTemp} °C</div>
          <div className="moredetailed">
            <div className="realfelt">
              Real felt: {data.current.feelsLike} °C
            </div>
            <div className="humidity"> Humidity: {data.current.humidity} %</div>
            <div className="wind"> Wind: {data.current.windSpeed} km/H</div>
          </div>
        </div>
        <div className="HighLow">
          Rise: {data.current.sunRise} | Set: {data.current.sunSet} | High:{" "}
          {data.current.highTemp} °C | Low: {data.current.lowTemp} °C
        </div>
      </div>
    </>
  );
}
