import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, View, Image, Button, Alert} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import Header from '../components/header'
import Luminosity from '../components/luminosity'
import SoilMoisture from '../components/soil-moisture'
import Temperature from '../components/temperature'
import style from '../assets/style'
import Humidity from '../components/humidity';
import { Actions } from 'react-native-router-flux'; 

export default class Home extends Component {
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
    return (
      <ScrollView style={styles.outContainer}>
        <View style={styles.container}>        
          <Header />
          <SoilMoisture soilMoisture={this.state.soilMoisture} />
          <Temperature temperature={this.state.temperature}/>
          <Humidity humidity={this.state.humidity}/>
          <Luminosity luminosity={this.state.luminosity}/>
          <View style={styles.buttonContainer}>
            <Button onPress={() => Actions.color()} title="Alterar Iluminação" color="#2eb82e"/>
          </View>
          {/* <View style={styles.buttonContainer}>
            <Button onPress={this._regar} title="Regar" color="#2eb82e"/>
          </View> */}
        </View>
      </ScrollView>
    );
  }
  _regar(){
    Alert.alert('Regando...');
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

const styles = StyleSheet.create({
  outContainer: {
    backgroundColor: '#333'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  buttonContainer: {
    margin:30,
    width:"80%"
  }
});
