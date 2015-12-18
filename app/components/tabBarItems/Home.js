'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import NavBar from '../../utilComponents/navBar';


var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} = React;

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', height: window.height }}>
        <NavBar title={'HOME'} sourceLeft={require('../../img/burguer-menu.png')}/>

        <Text>Home</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
});
