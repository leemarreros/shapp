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

export default class Makers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar title={'MAKERS'} sourceLeft={require('../../img/burguer-menu.png')} sourceRight={require('../../img/filters-icon.png')}/>

        <Text>Makers</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
});
