import React from "react";
import "./WeatherPage.css";

export default function ForeCastDaily({ timeStamp, iconCode, maxTemp }) {
  return (
    <>
      <div className="forecastcontent">
        <div>{timeStamp}</div>
        <img src={`/icons/${iconCode}.png`} alt="weather"></img>
        <div>{maxTemp} °C</div>
      </div>
    </>
  );
}
