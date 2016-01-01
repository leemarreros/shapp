'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  AlertIOS,
  TouchableOpacity,
  Image
} = React;

export default class MakerDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.makerDashboard}>
        <Text>Maker Dashboard</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  makerDashboard: {
    flex:1 ,
    backgroundColor: 'white'
  }
});
