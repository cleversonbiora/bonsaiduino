import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, ScrollView, View, Image, Button, Alert} from 'react-native';
import { ColorPicker } from 'react-native-color-picker'
import { Actions } from 'react-native-router-flux'; 

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class Color extends Component {
  render() {
    return (
      <ScrollView style={styles.outContainer}>
        <View style={styles.container}>        
            <ColorPicker
                onColorSelected={color => this._save(color)}
                style={{height: 300, width: Dimensions.get('window').width - 20}}
            />
        </View>
      </ScrollView>
    );
  }

  _save(color){
    Actions.pop();
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
