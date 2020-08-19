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
      location: null,
    };
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;

        const api = `/.netlify/functions/weatherGeo?lat=${lat}&long=${long}`;

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
