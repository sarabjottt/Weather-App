import React, { Component } from 'react';
import Weather from './Weather';
import './AssetsImport';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // wData: null,
      temperature: null,
      apparentTemperature: null,
      summary: null,
      humidity: null,
      icon: null,
      precipProbability: null,
      precipType: null,
      visibility: null,
      windSpeed: null,
<<<<<<< HEAD
=======
      location: null,
>>>>>>> 7fab2ab7a623f34674d96718ce9f5a4017807035
    };
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather() {
<<<<<<< HEAD
    let long;
    let lat;
=======
>>>>>>> 7fab2ab7a623f34674d96718ce9f5a4017807035
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;

<<<<<<< HEAD
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${lat},${long}?exclude=minutely,hourly,daily,alert,flags`;
=======
        const api = `/.netlify/functions/weatherGeo?lat=${lat}&long=${long}`;
>>>>>>> 7fab2ab7a623f34674d96718ce9f5a4017807035

        fetch(api)
          .then(response => response.json())
          .then(data => {
            const {
              weatherData: { currently },
            } = data;
            console.log(data.locationData);
            this.setState({
              isLoading: true,
              // wData: data,
<<<<<<< HEAD
              temperature: data.currently.temperature,
              apparentTemperature: data.currently.apparentTemperature,
              summary: data.currently.summary,
              humidity: data.currently.humidity,
              icon: data.currently.icon,
              precipProbability: data.currently.precipProbability,
              precipType: data.currently.precipType,
              visibility: data.currently.visibility,
              windSpeed: data.currently.windSpeed,
=======
              temperature: currently.temperature,
              apparentTemperature: currently.apparentTemperature,
              summary: currently.summary,
              humidity: currently.humidity,
              icon: currently.icon,
              precipProbability: currently.precipProbability,
              precipType: currently.precipType,
              visibility: currently.visibility,
              windSpeed: currently.windSpeed,
              location: data.locationData,
>>>>>>> 7fab2ab7a623f34674d96718ce9f5a4017807035
            });
          });
      });
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="loading">
          <div className="card">
            <h1>Weather Forecast</h1>
            <h2>Allow location to access.</h2>
          </div>
        </div>
      );
    }
    return <Weather props={this.state} />;
  }
}
