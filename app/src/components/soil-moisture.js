
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import style from '../assets/style'
import {valuePercent,valueAdjust} from '../helpers/MathExtension';

export default class SoilMoisture extends Component {
  render() {
    return (
      <View>
        <Speedometer 
            value={valueAdjust(this.props.soilMoisture)} 
            totalValue={1024}
            innerColor="#333"
            internalColor={this.getColor(valueAdjust(this.props.soilMoisture))}/>
         <Text style={style.instructions}>Humidade do Solo:{valuePercent(this.props.soilMoisture)}%</Text>
      </View>
    );
  }
  getColor(value){
    if(value > 580)
      return '#2eb82e';
    else if(value > 350)
      return '#dddd00';
    else
      return '#ff0000';
  }
}
