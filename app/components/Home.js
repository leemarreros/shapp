'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';

var window = Dimensions.get('window');

let {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  PixelRatio,
  NavigatorIOS,
  Text,
  StatusBarIOS,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Textinput
} = React;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {

    return (
      <View>
        <Text>This is home :)</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({

});

module.exports = Home;