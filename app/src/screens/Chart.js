import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, ScrollView, View, Image, Button, Alert} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +,
//     'Shake or press menu button for dev menu',
// });

export default class Chart extends Component {
  constructor(){
    super();
    //this.loadData();
  }
  render() {

    return (
      <ScrollView style={styles.outContainer}>
        <View style={styles.container}>   
        </View>
      </ScrollView>
    );
  }

  loadData(){
    fetch("http://bonsaiarduino.ga/api/color/get.php")
      .then(response => response.json())
      .then(json => this.setState({
          red:json.Red,
          green:json.Green,
          blue:json.Blue
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
    paddingTop: 10
  },
  buttonContainer: {
    margin:30,
    width:"80%"
  }
});
