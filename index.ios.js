/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import TabManager from './app/components/TabManager';


var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  Navigator,
  Component,
  StatusBarIOS,
  TouchableOpacity,
  TouchableWithoutFeedback
} = React;

class shapp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hideNavBar: true,
      userInfo: null
    };
  }

  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  renderScene (route, navigator) {
    let Component = route.component;
    let navBar = route.navigationBar;

    if (navBar) {
      navBar = React.cloneElement(navBar, { navigator, route, });
    }

    return (
      <View style={styles.app}>
        {route.navigationBar}
        <Component
          userInfo={this.state.userInfo}
          route={route}
          navigator={navigator}/>
      </View>
    );
  }

  setUserInformation(userInfo) {
    this.setState({userInfo});
  }

  render() {
   return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          component: Login,
          setUserInformation: this.setUserInformation.bind(this)
        }}
      />
    );
  }

}

var styles = StyleSheet.create({
  app: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#285DA1',
  },
});

AppRegistry.registerComponent('shapp', () => shapp);
