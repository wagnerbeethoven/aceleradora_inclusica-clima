// api.js

// Chave de API 
const API_KEY = '221ffc853d0fe920bb3bb7b17604e522';

// Base URL da OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Função para fazer a chamada à API do OpenWeatherMap e retornar dados do clima
 * @param {string} city - Nome da cidade para a qual buscar o clima
 * @param {string} units - Unidade de medida para a temperatura (pode ser 'metric' ou 'imperial')
 * @returns {Promise<Object>} - Dados do clima
 */
async function getWeather(city, units = 'metric') {
  // Monta a URL com a chave da API, nome da cidade e unidades
  const url = `${BASE_URL}?q=${city}&units=${units}&appid=${API_KEY}`;

  try {
    // Fazendo a requisição para a API
    const response = await fetch(url);

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do clima');
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Retorna os dados do clima
    return data;
  } catch (error) {
    // Em caso de erro, exibe a mensagem
    console.error('Erro:', error);
    return null;
  }
}

/**
 * Função para formatar os dados recebidos e exibir as informações principais
 * @param {Object} data - Dados do clima
 */
function displayWeather(data) {
  if (data && data.main) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const weather = data.weather[0].description;

    // Exibir os resultados na página
    document.getElementById('weather').innerHTML = `
      <h3>Clima de Porto Alegre</h3>
      <p><strong>Temperatura:</strong> ${temp}°C</p>
      <p><strong>Humidade:</strong> ${humidity}%</p>
      <p><strong>Condição:</strong> ${weather}</p>
    `;
  } else {
    document.getElementById('weather').innerHTML = '<p>Dados de clima não encontrados.</p>';
  }
}
