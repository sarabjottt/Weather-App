import React, { Component } from "react";
import Weather from "./Weather";
import "./AssetsImport";

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
      windSpeed: null
    };
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather() {
    let long, lat;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/7e9f07d026e672219dff217176d64c0d/${lat},${long}?exclude=minutely,hourly,daily,alert,flags`;

        fetch(api)
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({
              isLoading: true,
              // wData: data,
              temperature: data.currently.temperature,
              apparentTemperature: data.currently.apparentTemperature,
              summary: data.currently.summary,
              humidity: data.currently.humidity,
              icon: data.currently.icon,
              precipProbability: data.currently.precipProbability,
              precipType: data.currently.precipType,
              visibility: data.currently.visibility,
              windSpeed: data.currently.windSpeed
            });
          });
      });
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className='loading'>
          <div className='card'>
            <h1>Weather Forcast</h1>
            <h2>Allow location to access.</h2>
          </div>
        </div>
      );
    } else {
      return <Weather props={this.state} />;
    }
  }
}
