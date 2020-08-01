const APIKEY = '1c46b4274489cf56fe2ee767e9586191';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const buildRequest = (city, units = 'metric') => [BASE_URL, `?q=${city}`, `&units=${units}`, `&appid=${APIKEY}`].join('');
const handleError = (response) => {
  let msg = 'Error - ';
  if (response.status === 404) {
    msg += 'Could not find a city with that name...';
  } else {
    msg += response.statusText;
  }
  throw new Error(msg);
};

const getIcon = async (iconName) => {
  const icon = await fetch(
    `https://openweathermap.org/img/wn/${iconName}@4x.png`,
  )
    .then((response) => {
      if (!response.ok) {
        handleError(response);
      }
      return response.blob();
    })
    .then(URL.createObjectURL);
  return icon;
};

const getWeatherData = async (city, units = 'metric') => {
  const data = await fetch(buildRequest(city, units))
    .then((response) => {
      if (!response.ok) {
        handleError(response);
      }
      return response.json();
    })
    .then((respData) => ({
      status: 'OK',
      city: respData.name,
      country: respData.sys.country,
      weather: respData.weather,
      temp: respData.main,
    }))
    .catch((error) => ({
      status: 'Error',
      msg: error.message,
    }));

  let icon = null;

  if (data.status === 'OK') {
    icon = await getIcon(data.weather[0].icon);
  }

  return { data, icon };
};

export default getWeatherData;
