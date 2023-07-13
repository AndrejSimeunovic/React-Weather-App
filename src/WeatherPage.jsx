import { useRef, useState } from "react";
import "./WeatherPage.css";
import getWeatherDataByCity from "./weatherService";
import ForeCastHourly from "./ForeCastHourly";
import ForeCastDaily from "./ForeCastDaily";
import CurrentWeather from "./CurrentWeather";
import LoadingScreen from "./LoadingScreen";

function WeatherPage() {
  const city = useRef();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  function displayData(cityValue) {
    setIsLoading(true);
    getWeatherDataByCity(cityValue)
      .then((response) => {
        setData(response);
        setIsFetched(true);
      })
      .catch((e) => {
        setIsFetched(false);
        alert(e.message);
      })
      .finally(() => {
        setIsLoading(false);
        city.current.value = "";
      });
  }

  return (
    <>
      <div className="container">
        <div className="weathercontainer">
          <div className="searchcontainer">
            <input type="search" ref={city} placeholder="Search for city..." />
            <button onClick={() => displayData(city.current.value)}>
              Search
            </button>
          </div>
          {isFetched ? (
            <>
              <CurrentWeather data={data} />
              <div className="forecast">
                <div className="hourly">
                  <div className="header">HOURLY FORECAST</div>
                  <div className="displayhourly">
                    {data.hourly.map((data, index) => {
                      return (
                        <ForeCastHourly
                          key={index}
                          timeStamp={data.timeStamp}
                          iconCode={data.iconCode}
                          temp={data.temp}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="daily">
                  <div className="header">DAILY FORECAST</div>
                  <div className="displaydaily">
                    {data.daily.map((data, index) => {
                      return (
                        <ForeCastDaily
                          key={index}
                          timeStamp={data.timeStamp}
                          iconCode={data.iconCode}
                          maxTemp={data.maxTemp}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        {isLoading ? <LoadingScreen /> : null}
      </div>
    </>
  );
}

export default WeatherPage;
