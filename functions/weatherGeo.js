require('isomorphic-fetch');

async function getWeather(lat, long) {
  const weatherAPI = `https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${lat},${long}?exclude=minutely,daily,alerts,flags`;
  const weatherData = await fetch(weatherAPI)
    .then(res => res.json())
    .catch(err => err.name);
  return weatherData;
  // return {"latitude":-37.81,"longitude":144.9644,"timezone":"Australia/Melbourne","currently":{"time":1598153529,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0.0167,"precipProbability":0.14,"precipType":"rain","temperature":53.74,"apparentTemperature":53.74,"dewPoint":39.89,"humidity":0.59,"pressure":1013.3,"windSpeed":16.93,"windGust":26.05,"windBearing":218,"cloudCover":0.84,"uvIndex":2,"visibility":10,"ozone":348.1},"offset":10}
}

async function getGeocode(lat, long) {
  const geocodeAPI = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&key=${process.env.GEOCODE_API}&no_annotations=1&limit=1`;
  try {
    const {
      results: [data],
    } = await fetch(geocodeAPI)
      .then(res => res.json())
      .catch(err => err);
    const trimData = {
      suburb: data.components.suburb,
      city: data.components.city,
      stateCode: data.components.state_code,
      countryCode: data.components.country_code.toUpperCase(),
      fullAddress: splitCity(data.formatted),
    };
    return trimData;
  } catch (error) {
    return error.toString();
  }
}

async function getRegion(clientIP) {
  const { city, latitude: lat, longitude: long } = await fetch(
    `https://freegeoip.app/json/${clientIP}`
  ).then(res => res.json());
  const weatherData = await getWeather(lat, long);
  return { weatherData, locationData: { city } };
}
async function getSearchData(query) {
  const forwardApi = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.GEOCODE_API}&no_annotations=1&limit=1`;
  const {
    results: [data],
  } = await fetch(forwardApi).then(res => res.json());
  const weatherData = await getWeather(data.geometry.lat, data.geometry.lng);

  return {
    weatherData,
    locationData: {
      suburb: data.components.suburb,
      city: data.components.city,
      stateCode: data.components.state_code,
      countryCode: data.components.country_code.toUpperCase(),
      fullAddress: splitCity(data.formatted),
    },
  };
}
function splitCity(string) {
  const newString = string.split(',', 1).toString();
  return newString;
}
exports.handler = async (event, context) => {
  const { lat, long } = event.queryStringParameters;
  const { region } = event.queryStringParameters;
  const { search } = event.queryStringParameters;
  const clientIP = event.headers['client-ip'];

  if (search) {
    try {
      const searchData = await getSearchData(search);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.name.toString(),
      };
    }
  }
  if (region === 'true') {
    try {
      const regionData = await getRegion(clientIP);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regionData),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.name.toString(),
      };
    }
  }

  if (!lat || !long) {
    return {
      statusCode: 500,
      body: 'Error: Missing Latitude (and/or) Longitude attributes',
    };
  }
  try {
    const weatherData = await getWeather(lat, long);
    const locationData = await getGeocode(lat, long);
    const data = {
      weatherData,
      locationData,
    };
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
