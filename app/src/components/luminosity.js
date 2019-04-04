
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import style from '../assets/style'
import {valuePercent,valueAdjust} from '../helpers/MathExtension';


export default class Luminosity extends Component {

  render() {
    return (
      <View>
         <View style={styles.luminosity}>
            <Progress.Bar progress={(valueAdjust(this.props.luminosity) / 1024)} width={250} color='#ffff00'/>
         </View>
         <Text style={style.instructions}>Luminosidade:{valuePercent(this.props.luminosity)}%</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  luminosity:{
    marginTop: 10,
    marginBottom: 10,
  }
});
