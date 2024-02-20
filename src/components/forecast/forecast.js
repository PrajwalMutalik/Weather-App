import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const Forecast = ({ data }) => {
  const dayinweek = new Date().getDay();
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const forecastdays = weekdays
    .slice(dayinweek, weekdays.length)
    .concat(weekdays.slice(0, dayinweek));

  return (
    <>
      <label className="title">Forcast</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-forcast">
                  <img
                    alt="weather"
                    className="icon-forcast"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastdays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min">
                    {Math.round(item.main.temp_min)}°C /
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="forcast-details">
                <div className="forcast-details-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure}hPa</label>
                </div>
                <div className="forcast-details-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="forcast-details-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="forcast-details-item">
                  <label>Wind Speed:</label>
                  <label>{item.wind.speed}m/s</label>
                </div>
                <div className="forcast-details-item">
                  <label>Sea level</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="forcast-details-item">
                  <label>Feels Like</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
export default Forecast;
