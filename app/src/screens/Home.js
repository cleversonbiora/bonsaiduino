import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, View, TouchableWithoutFeedback, Button, Alert} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import Header from '../components/header'
import Luminosity from '../components/luminosity'
import SoilMoisture from '../components/soil-moisture'
import Temperature from '../components/temperature'
import style from '../assets/style'
import Humidity from '../components/humidity';
import { Actions } from 'react-native-router-flux';     
const Pages = {
  Chart: 1,
  Color: 2
};

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
          <TouchableWithoutFeedback onPress={() =>  this.openPage(Pages.Chart)}>
            <View>
              <Temperature temperature={this.state.temperature}/>
            </View>
          </TouchableWithoutFeedback>
          <Humidity humidity={this.state.humidity}/>
          <Luminosity luminosity={this.state.luminosity}/>
          <View style={styles.buttonContainer}>
            <Button onPress={() => this.openPage(Pages.Color)} title="Alterar Iluminação" color="#2eb82e"/>
          </View>
          {/* <View style={styles.buttonContainer}>
            <Button onPress={this._regar} title="Regar" color="#2eb82e"/>
          </View> */}
        </View>
      </ScrollView>
    );
  }
  openPage(page){
      switch (page) {
        case Pages.Chart:
          Actions.chart();
          break;
        case Pages.Color:
          Actions.color();
          break;
        default:
          Actions.Home();
          break;
      }
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
