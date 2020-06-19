const APIKEY = '1c46b4274489cf56fe2ee767e9586191';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const buildRequest = (city) => [BASE_URL, `?q=${city}`, `&appid=${APIKEY}`].join('');

const getWeatherBy = async (city) => {
  const data = await fetch(buildRequest(city)).then(d => d.json());
  return data;
};

export default getWeatherBy;
