// data/WeatherData.js
export const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];

export const weatherData = {
  London: { temp: 15, condition: 'Partly Cloudy', humidity: 70, precipitation: 10, wind: 10, high: 31, low: 13, icon: 'cloud-sun' },
  'New York': { temp: 12, condition: 'Rainy', humidity: 85, precipitation: 45, wind: 15, high: 20, low: 8, icon: 'cloud-rain' },
  Tokyo: { temp: 22, condition: 'Sunny', humidity: 60, precipitation: 5, wind: 8, high: 28, low: 18, icon: 'sun' },
  Paris: { temp: 14, condition: 'Cloudy', humidity: 75, precipitation: 20, wind: 12, high: 19, low: 10, icon: 'cloud' },
  Sydney: { temp: 25, condition: 'Sunny', humidity: 55, precipitation: 0, wind: 5, high: 30, low: 20, icon: 'sun' }
};

export const hourlyForecast = [
  { time: '6am', temp: 15, icon: 'cloud-sun' },
  { time: '7am', temp: 15, icon: 'cloud-sun' },
  { time: '8am', temp: 16, icon: 'cloud' },
  { time: '9am', temp: 13, icon: 'cloud-rain' },
  { time: '10am', temp: 14, icon: 'cloud-rain' }
];
