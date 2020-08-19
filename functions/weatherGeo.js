require('isomorphic-fetch');

async function getWeather(lat, long) {
  const weatherAPI = `https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${lat},${long}?exclude=minutely,hourly,daily,alerts,flags`;
  const weatherData = await fetch(weatherAPI).then(res => res.json());
  return weatherData;
}

async function getGeocode(lat, long) {
  const geocodeAPI = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&key=${process.env.GEOCODE_API}&no_annotations=1&limit=1`;
  const {
    results: [data],
  } = await fetch(geocodeAPI).then(res => res.json());
  const trimData = {
    suburb: data.components.suburb,
    city: data.components.city,
    fullAddress: data.formatted,
  };
  return trimData;
}

exports.handler = async (event, context) => {
  const { lat, long } = event.queryStringParameters;
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
