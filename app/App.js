
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import Header from './src/components/header'
import Luminosity from './src/components/luminosity'
import SoilMoisture from './src/components/soil-moisture'
import Temperature from './src/components/temperature'
import style from './src/assets/style'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      soilMoisture: 0,
      temperature: 0,
      luminosity: 0
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
    return (
      <View style={styles.container}>
        <Header />
        <SoilMoisture soilMoisture={this.state.soilMoisture} />
        <Temperature temperature={this.state.temperature}/>
        <Luminosity luminosity={this.state.luminosity}/>
      </View>
    );
  }
  loadData(){
    fetch("http://bonsaiarduino.ga/api/dashboard")
      .then(response => response.json())
      .then(json => this.setState({
          soilMoisture:json.soilMoisture,
          temperature:json.temperature,
          luminosity:json.luminosity
        }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingTop: 10,
  }
});
