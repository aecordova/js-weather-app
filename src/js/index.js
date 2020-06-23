import '../style/main.scss';
import getW from './getWeather';

const searchForm = document.querySelector('.search-frm');
const searchInput = document.querySelector('.search-inp');
const searchToggle = document.querySelector('.expand-search');

const cityDisplay = document.querySelector('.disp-city');
const tempDisplay = document.querySelector('.disp-temp');
const descDisplay = document.querySelector('.disp-desc');
const feelsDisplay = document.querySelector('.disp-fls');
const minDisplay = document.querySelector('.disp-min');
const maxDisplay = document.querySelector('.disp-max');
const wIcon = document.querySelector('.disp-icon');
const header = document.querySelector('header');
const welcome = document.querySelector('.welcome');
const display = document.querySelector('.main-display');

const toggleFoldHeader = () => {
  header.classList.toggle('fold');
  searchForm.classList.toggle('invisible');
  searchInput.value = '';
  searchToggle.classList.toggle('rotate');
  searchToggle.classList.toggle('wobble-y');
};

const hide = (element) => {
  if (!(element.classList.contains('invisible') && element.classList.contains('d-none'))) {
    element.classList.add('invisible');
    element.addEventListener('transitionend', () => {
      element.classList.add('d-none');
    });
  }
};

const show = (element) => {
  if (
    element.classList.contains('invisible')
    && element.classList.contains('d-none')
  ) {
    element.classList.remove('d-none');
    setTimeout(() => {
      element.classList.remove('invisible');
    }, 600);
  }
};

const displayWeather = async (city) => {
  const w = await getW(city);
  cityDisplay.textContent = [w.data.city, w.data.country].join(', ');
  tempDisplay.textContent = Math.trunc(w.data.temp.temp);
  descDisplay.textContent = w.data.weather[0].description;
  feelsDisplay.textContent = Math.trunc(w.data.temp.feels_like);
  minDisplay.textContent = Math.trunc(w.data.temp.temp_min);
  maxDisplay.textContent = Math.trunc(w.data.temp.temp_max);
  wIcon.style.backgroundImage = `url(${w.icon})`;
  toggleFoldHeader();
  hide(welcome);
  show(display);
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityName = searchInput.value.toLowerCase();
  displayWeather(cityName);
});

const expand = document.querySelector('.expand-search-box');

expand.addEventListener('click', () => {
  toggleFoldHeader();
});
