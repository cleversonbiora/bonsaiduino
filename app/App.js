
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Home from './src/screens/Home';
import Color from './src/screens/Color';
import Chart from './src/screens/Chart';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {

  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#333' }} titleStyle={{color: '#fff'}} >
        <Stack key="root">
          <Scene key="home" component={Home} hideNavBar={true} initial />
          <Scene key="color" component={Color} title="Iluminação" headerTintColor="#fff"/>
          <Scene key="chart" component={Chart} title="Resumo" headerTintColor="#fff"/>
        </Stack>
      </Router>
    );
  }
}
