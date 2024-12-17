import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #74ebd5, #acb6e5);
  font-family: "Arial", sans-serif;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin: 20px 0;
  width: 300px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #4e54c8;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8f94fb;
  }
`;

const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 300px;
  margin-top: 20px;
`;

const WeatherIcon = styled.img`
  width: 80px;
  margin-bottom: 10px;
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
`;

const getWeather = async (city) => {
  const API_KEY = "221ffc853d0fe920bb3bb7b17604e522";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Cidade não encontrada");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getCustomWeatherIcon = (weatherMain) => {
  const weatherIcons = {
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
    Clouds: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
    Snow: "https://cdn-icons-png.flaticon.com/512/130/130299.png",
    Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
    Drizzle: "https://cdn-icons-png.flaticon.com/512/4150/4150921.png",
    Fog: "https://cdn-icons-png.flaticon.com/512/3208/3208755.png",
    default: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  };
  return weatherIcons[weatherMain] || weatherIcons.default;
};

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleFetchWeather = async () => {
    if (!city) return;
    setError("");
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <Container>
      <h1>Consulta de Clima</h1>
      <Input
        type="text"
        placeholder="Digite o nome da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button onClick={handleFetchWeather}>Buscar</Button>
      {error && <Error>{error}</Error>}
      {weather && (
        <WeatherCard>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <WeatherIcon
            src={getCustomWeatherIcon(weather.weather[0].main)}
            alt="Clima"
          />
          <p>
            <strong>Temperatura:</strong> {weather.main.temp} °C
          </p>
          <p>
            <strong>Humidade:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Condição:</strong> {weather.weather[0].description}
          </p>
        </WeatherCard>
      )}
    </Container>
  );
};
