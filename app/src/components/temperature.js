
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import style from '../assets/style'


export default class Temperature extends Component {
  render() {
    return (
      <View>
         <Text style={styles.temperature}>{Number.parseInt(this.props.temperature,0)}°</Text>
         <Text style={style.instructions}>Temperatura</Text>
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
