/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Navigator,
  StatusBarIOS,
  TouchableOpacity,
  TouchableWithoutFeedback
} = React;

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title} [{index}]
      </Text>
    );
  },

};

class shapp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  renderScene (route, nav) {
    switch (route.id) {
      case 'tour':
        return ;
      case 'signup':
            // <Login navigator={nav}/>
        break;
      default:
        return (
        <SignUp navigator={nav} route={route}/>
        );
    }
  }

  render() {
    return (
      <Navigator
        style={styles.app}
        initialRoute={{
          title: 'Login',
          component: Login,
        }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}/>
    );
  }
};

        // renderScene={this.renderScene}
var styles = StyleSheet.create({
  app: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#285DA1',
  },
});

AppRegistry.registerComponent('shapp', () => shapp);
