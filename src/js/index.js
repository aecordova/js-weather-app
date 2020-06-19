import '../style/main.scss';
import getW from './getWeather';


const wBox = document.querySelector('.weather-container'); 

const cityName = 'guadalupe';

const displayWeather = async () => {
  const data = await getW(cityName);
  wBox.textContent = JSON.stringify(data, null, 2);
};
displayWeather();
