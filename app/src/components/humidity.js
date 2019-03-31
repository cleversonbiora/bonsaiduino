
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import style from '../assets/style'


export default class Humidity extends Component {
  render() {
    return (
      <View>
         <Text style={styles.temperature}>{Number.parseInt(this.props.humidity,0)}%</Text>
         <Text style={style.instructions}>Humidade do Ar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  temperature:{
    fontSize: 50,
    textAlign: 'center',
    color: '#999999',
  },
});
