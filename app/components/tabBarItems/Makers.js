'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavBar from '../../utilComponents/navBar';

import globalVar from '../../utils/globalVariables';

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
      loadingMakers: true,
      makers: null
    };
  }

  componentWillMount() {
    var url = `${globalVar.restUrl}/api/makers`;
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        makers: responseData.data,
        loadingMakers: false,
      });
    })
    .done();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>Makers</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
});
