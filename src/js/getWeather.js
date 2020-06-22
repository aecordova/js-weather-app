const APIKEY = '1c46b4274489cf56fe2ee767e9586191';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const ICON_URL = 'https://openweathermap.org/img/wn/02d@4x.png'

const buildRequest = (city, units = 'metric') => [BASE_URL, `?q=${city}`, `&units=${units}`, `&appid=${APIKEY}`].join('');
const handleError = (response) => {
  let msg;
  if (response.status === 404) {
    msg = 'Could not find a city with that name...';
  } else {
    msg = response.statusText;
  }
  throw new Error(msg);
};

const getIcon = async (iconName) => {
  const icon = await fetch(`https://openweathermap.org/img/wn/${iconName}@4x.png`)
    .then(r => {
      if (!r.ok) {
        handleError(r);
      }
      return r.blob();
    })
    .then(URL.createObjectURL);
  return icon;
};

const getWeatherData = async (city, units = 'metric') => {
  const data = await fetch(buildRequest(city, units))
    .then((r) => {
      if (!r.ok) {
        handleError(r);
      }
      return r.json();
    })
    .then((d) => ({
      city: d.name,
      country: d.sys.country,
      weather: d.weather,
      temp: d.main,
    }))
    .catch((e) => e.message);

    const icon = await getIcon(data.weather[0].icon);

  return { data, icon };
};

export default getWeatherData;


// example or data received
// { "coord": { "lon": -96.78, "lat": 32.77 },
// "weather": [ { "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" } ], "base": "stations", "main": { "temp": 301.6, "feels_like": 302.64, "temp_min": 300.37, "temp_max": 302.59, "pressure": 1017, "humidity": 51 }, "visibility": 16093, "wind": { "speed": 2.1, "deg": 0 }, "clouds": { "all": 40 }, "dt": 1592677538, "sys": { "type": 1, "id": 3783, "country": "US", "sunrise": 1592651969, "sunset": 1592703487 }, "timezone": -18000, "id": 4684904, "name": "Dallas", "cod": 200 }
