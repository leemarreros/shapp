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

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    // if (!this.props.sourceRight)
  }

  render() {
    return (
      <NavigationBar
          title={<Text style={styles.titleNavBar}>{this.props.title}</Text>}
          style={styles.navigationBar}
          tintColor={'#285DA1'}
          statusBar={{style: 'light-content', hidden: false}}
          leftButton={
            <TouchableOpacity style={styles.buttonNavBar}>
              <Image
                source={this.props.sourceLeft}
                style={[{ width: 15, height: 15}]}/>
            </TouchableOpacity>}
          rightButton={
            <TouchableOpacity style={styles.buttonNavBar}>
              <Image
                source={this.props.sourceRight}
                style={[{ width: 15, height: 15}]}/>
            </TouchableOpacity>}
          />
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
