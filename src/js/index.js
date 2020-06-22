import '../style/main.scss';
import getW from './getWeather';

const searchForm = document.querySelector('.search-frm');
const searchInput = document.querySelector('.search-inp');

const cityDisplay = document.querySelector('.disp-city');
const tempDisplay = document.querySelector('.disp-temp');
const descDisplay = document.querySelector('.disp-desc');
const feelsDisplay = document.querySelector('.disp-fls');
const minDisplay = document.querySelector('.disp-min');
const maxDisplay = document.querySelector('.disp-max');
const wIcon = document.querySelector('.disp-icon');

const displayWeather = async (city) => {
  const w = await getW(city);
  cityDisplay.textContent = [w.data.city, w.data.country].join(', ');
  tempDisplay.textContent = Math.trunc(w.data.temp.temp);
  descDisplay.textContent = w.data.weather[0].description;
  feelsDisplay.textContent = Math.trunc(w.data.temp.feels_like);
  minDisplay.textContent = Math.trunc(w.data.temp.temp_min);
  maxDisplay.textContent = Math.trunc(w.data.temp.temp_max);
  wIcon.style.backgroundImage = `url(${w.icon})`;
  console.log(w.icon);
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityName = searchInput.value.toLowerCase();
  displayWeather(cityName);
});