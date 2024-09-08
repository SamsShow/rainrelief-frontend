"use client";

import React, { useState } from "react";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_OPEANWEATHER_API;

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      );
      setWeather(response.data);
      setMessage("");
    } catch (error) {
      setMessage("Error fetching weather data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center text-black justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Weather Information</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Weather
          </button>
        </div>

        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        {weather && (
          <div className="bg-gray-100 rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <WeatherItem label="Temperature" value={`${(weather.main.temp - 273.15).toFixed(2)}°C`} />
              <WeatherItem label="Weather" value={weather.weather[0].description} />
              <WeatherItem label="Wind" value={`${weather.wind.speed} m/s`} />
              <WeatherItem label="Rain" value={weather.rain ? `${weather.rain["1h"]} mm` : "N/A"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const WeatherItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);