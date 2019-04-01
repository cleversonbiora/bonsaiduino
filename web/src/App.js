import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer"
import logo from './assets/icon.png';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      soilMoisture: 0,
      temperature: 0,
      luminosity: 0,
      humidity: 0
    }
  }
  componentDidMount() {
    this.loadData()
    this.interval = setInterval(() => this.loadData(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let speedConfig = {
      maxValue: 1000,
      segments:3
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>BonsaiDuino</h1>
        </header>
        <div>
          <div style={{
              width: '300px',
              height: '170px',
              margin: "auto"
            }}>
            <ReactSpeedometer value={this.state.soilMoisture} fluidWidth {...speedConfig}/>
          </div>
          Humidade do Solo: {this.state.soilMoisture}
        </div>

        <div>
          Temperatura:
          <div style={{
              fontSize: '70px'
            }}>
            {this.state.temperature}°
          </div>
        </div>
        <div>
          Humidade do Ar: 
          <div style={{
              fontSize: '70px'
            }}>
            {this.state.humidity} %
          </div>
        </div>
        <div>
          Luminosidade: {this.state.luminosity}
        </div>
      </div>
    );
  }

  _regar(){
    alert('Regando...');
  }
  loadData(){
    fetch("http://bonsaiarduino.ga/api/dashboard")
      .then(response => response.json())
      .then(json => this.setState({
          soilMoisture:json.soilMoisture,
          temperature:json.temperature,
          luminosity:json.luminosity,
          humidity:json.humidity
        }));
  }
}

export default App;
