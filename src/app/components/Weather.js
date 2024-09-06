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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Weather Information</h2>
        <input
          type="text"
          className="w-full p-2 border rounded text-black"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
        >
          Get Weather
        </button>
        {message && <p className="text-center text-red-500">{message}</p>}
        {weather && (
          <div className="text-white mt-4">
            <p>Location: {weather.name}</p>
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Wind:{weather.wind.speed}</p>
            <p>Rain:</p>
          </div>
        )}
      </div>
    </div>
  );
}
