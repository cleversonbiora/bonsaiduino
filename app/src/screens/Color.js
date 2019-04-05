import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, ScrollView, View, Image, Button, Alert} from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import { Actions } from 'react-native-router-flux'; 
import {hexToRgb,fullColorHex} from '../helpers/Color';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +,
//     'Shake or press menu button for dev menu',
// });

export default class Color extends Component {
  constructor(){
    super();
    this.state = {
        red: 0,
        green: 255,
        blue: 47
    }
    this.loadData();
  }
  render() {
    let hex = fullColorHex(this.state.red,this.state.green,this.state.blue);
    return (
      <ScrollView style={styles.outContainer}>
        <View style={styles.container}>   
            <ColorPicker
                oldColor={hex}
                onColorSelected={color => this._save(color)}
                style={{height: 300, width: Dimensions.get('window').width - 20}}
            />
        </View>
      </ScrollView>
    );
  }

  _save(color){
    let newColor = hexToRgb(color);
    fetch('http://bonsaiarduino.ga/api/color/put.php',{
          method: 'PUT',
          body: JSON.stringify({Red:newColor.red, Green:newColor.green, Blue: newColor.blue})
        })
      .then(() => Actions.pop());
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
