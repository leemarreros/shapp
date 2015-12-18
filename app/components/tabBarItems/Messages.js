'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavBar from '../../utilComponents/navBar';


var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet
} = React;

export default class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar title={'MESSAGES'} sourceLeft={require('../../img/burguer-menu.png')}/>

        <Text>Messages</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
});
