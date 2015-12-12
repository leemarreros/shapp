'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';

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
        {this.props.navBar}

        <Text>Home</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
   titleNavBar: {
    fontFamily: 'Avenir',
    fontWeight: '100',
    fontSize: 15,
    color: 'white',
    marginBottom: 3
  },
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginBottom: 4,
    paddingBottom: 12,
  },
  navigationBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    overflow: 'hidden',
  },
});
