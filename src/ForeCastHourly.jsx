import React from "react";
import "./WeatherPage.css";

export default function ForeCastHourly({ timeStamp, iconCode, temp }) {
  return (
    <>
      <div className="forecastcontent">
        <div>{timeStamp}</div>
        <img src={`/icons/${iconCode}.png`} alt="weather"></img>
        <div>{temp} °C</div>
      </div>
    </>
  );
}
