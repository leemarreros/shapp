'use strict';

import React from 'react-native';

let {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  Navigator,
  Text,
  View,
  TouchableOpacity,
  Image
} = React;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.loginScreen}>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#285DA1'
  }
});

module.exports = Login;