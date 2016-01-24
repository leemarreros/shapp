'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import DisplayList from '../../utilComponents/DisplayList'

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ProgressViewIOS,
  TouchableOpacity
} = React;

export default class AllProducts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log('All articles');
    return (
      <DisplayList
        items={this.props.route.work}
        butttonText={'+ Add a product'}
        navigator={this.props.navigator}/>
    );
  }
}

var styles = StyleSheet.create({
});
