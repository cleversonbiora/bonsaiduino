
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Header extends Component {
  render() {
    return (
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../assets/icon.png')}/>
          <Text style={styles.welcome}>BonsaiDuino</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#e6e6e6',
    margin: 10,
  },
  logo:{
    width:70,
    height:70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
});
