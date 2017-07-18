import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import Map from '../components/map';

class WeatherList extends Component {

  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp -273);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);

    const {lon, lat} = cityData.city.coord;

    return (
      <tr key={name}>
        <td><Map lat={lat} lon={lon}/></td>
        <td><Chart data={temps} color="orange" unit="°C"/></td>
        <td><Chart data={pressures} color="purple" unit="hPa"/></td>
        <td><Chart data={humidities} color="blue" unit="%"/></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);