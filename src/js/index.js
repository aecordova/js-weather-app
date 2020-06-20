import '../style/main.scss';
// import make from './make';

import getW from './getWeather';
const searchForm = document.querySelector('.search-frm');
const searchInput = document.querySelector('.search-inp');
const wBox = document.querySelector('.weather-container');

const displayWeather = async (city) => {
  const data = await getW(city);
  wBox.textContent = JSON.stringify(data, null, 2);
  console.log(data);
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityName = searchInput.value.toLowerCase();
  displayWeather(cityName);
});


// displayWeather();
