import { useEffect, useState } from "react";

export default function InfoBoxTopBar() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("da-DK", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Roskilde,DK&units=metric&appid=${API_KEY}`,
      );

      const data = await res.json();

      console.log("API KEY:", import.meta.env.VITE_OPENWEATHER_KEY);

      setWeather({
        temp: Math.round(data.main.temp),
        icon: data.weather[0].icon,
        description: data.weather[0].main,
      });
    };

    getWeather();

    const interval = setInterval(getWeather, 10 * 60 * 1000); // hvert 10 min

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="infoBoxTopBar">
      <strong>DAY 5</strong>

      <div className="topBarRight">
        <strong className="clock">{time}</strong>

        {weather && (
          <div className="weatherBox">
            <img
              className="weatherIcon"
              src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
              alt="weather icon"
            />
            <span className="weatherTemp">{weather.temp}°C</span>
          </div>
        )}
      </div>
    </div>
  );
}
