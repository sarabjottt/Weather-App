require('isomorphic-fetch');

async function getWeather(lat, long) {
  // const weatherAPI = `https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${lat},${long}?exclude=minutely,hourly,daily,alerts,flags`;
  // const weatherData = await fetch(weatherAPI)
  //   .then(res => res.json())
  //   .catch(err => err.name);
  // return weatherData;
  return 'Sucess Test';
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
      fullAddress: data.formatted,
    };
    return trimData;
  } catch (error) {
    return error.toString();
  }
}

async function getRegion() {
  const { city, latitude: lat, longitude: long } = await fetch(
    'https://freegeoip.app/json/'
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
      fullAddress: data.formatted,
    },
  };
}

exports.handler = async (event, context) => {
  const { lat, long } = event.queryStringParameters;
  const { region } = event.queryStringParameters;
  const { search } = event.queryStringParameters;

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
      const regionData = await getRegion();
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
