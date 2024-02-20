import { useState } from "react";
import Forecast from "./components/forecast/forecast";
import "./App.css";
import { WeatherApiUrl, myapikey } from "./api";
import CurrentWeather from "./components/currentweather/currentweather";
import Search from "./components/search/search";

function App() {
  const [currentweather, setcurrentweather] = useState(null);
  const [CurrentWeatherForcast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const CurrentWeatherfetch = fetch(
      `${WeatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${myapikey}&units=metric`
    );
    const CurrentWeatherForcast = fetch(
      `${WeatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${myapikey}&units=metric`
    );
    Promise.all([CurrentWeatherfetch, CurrentWeatherForcast])
     .then(
      async (response) => {
        const WeatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        
        setcurrentweather({city: searchData.label , ...WeatherResponse});
        setforecast({city: searchData.label, ...forecastResponse});
      })
      .catch((err)=>console.log(err));
  }
  console.log(currentweather);
  console.log(CurrentWeatherForcast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentweather&&<CurrentWeather data={currentweather} />}
      {CurrentWeatherForcast && <Forecast data={CurrentWeatherForcast}/>}
    </div>
  );
}

export default App;
