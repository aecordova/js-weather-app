const APIKEY = "1c46b4274489cf56fe2ee767e9586191";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const buildRequest = (city) =>
  [BASE_URL, `?q=${city}`, `&appid=${APIKEY}`].join("");

const getWeatherBy = async (city) => {
  const data = await fetch(buildRequest(city))
    // .then((r) => r.json());
    .then((r) => {
      let msg;
      if (!r.ok) {
        if (r.status === 404) {
          msg = 'Could not find a city with that name...';
        } else {
          msg = r.statusText;
        }
        throw new Error(msg);
      }
      return r.json();
    })
    .then((d) => {
      return {
        weather: {
          type: d.weather[0].main,
          desc: d.weather[0].description,
        },
        temp: d.main,
        sunset: d.sys.sunset,
        sunrise: d.sys.sunrise,
      };
    })
    .catch((e) => e.message);
  return data;
};

export default getWeatherBy;

// { "coord": { "lon": -96.78, "lat": 32.77 },
// "weather": [ { "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" } ], "base": "stations", "main": { "temp": 301.6, "feels_like": 302.64, "temp_min": 300.37, "temp_max": 302.59, "pressure": 1017, "humidity": 51 }, "visibility": 16093, "wind": { "speed": 2.1, "deg": 0 }, "clouds": { "all": 40 }, "dt": 1592677538, "sys": { "type": 1, "id": 3783, "country": "US", "sunrise": 1592651969, "sunset": 1592703487 }, "timezone": -18000, "id": 4684904, "name": "Dallas", "cod": 200 }
