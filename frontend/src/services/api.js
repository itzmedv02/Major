import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL = apiUrl
  ? `${apiUrl.replace(/\/+$/, '')}/api`
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const getSubdivisions = async () => {
  const response = await api.get('/subdivisions');
  return response.data;
};

export const predictRainfall = async (data) => {
  const response = await api.post('/predict', data);
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const exportPDF = async (predictionData) => {
  const response = await api.post('/export-pdf', predictionData, {
    responseType: 'blob', // Important for file download
  });
  
  // Create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Rainfall_Report_${predictionData.metadata.year}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export const fetchWeather = async (lat, lon) => {
  // Free OpenWeatherMap endpoint (replace with valid key in production)
  // For now using a mock response or user needs to add their key to the environment.
  try {
     const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
     if (!API_KEY) {
         return {
             main: { temp: 25, humidity: 60 },
             weather: [{ description: 'API Key Required', icon: '01d' }]
         };
     }
     const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
     return res.data;
  } catch(e) {
     console.error(e);
     return null;
  }
};

export default api;
