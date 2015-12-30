'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} = React;

export default class SideMenuLeft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={{backgroundColor: 'yellow', flex: 1}}>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      <Text>Side Menu</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
});
