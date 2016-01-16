'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ProgressViewIOS,
  TouchableOpacity
} = React;

export default class RightButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    if (this.props.title === 'WORK') {
      this.rightText = 'All products'
    } else if (this.props.title === 'PUBLISH') {
      this.rightText = 'All articles'
    } else {
      this.rightText = ' ';
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.buttonNavBar} onPress={this.props.onPress()}>
        <Text>{this.rightText}</Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    paddingBottom: 12,
  },
});
