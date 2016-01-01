'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  AlertIOS,
  TouchableOpacity,
  Image
} = React;

export default class MakerDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.makerDashboard}>
        <View style={styles.topSide}>
          <View style={styles.welcome}>
            <Text style={styles.welcomeText}>Welcome Maker!</Text>
          </View>
          <View style={styles.picture}>
            <Image style={{width: 146, height: 146 ,borderRadius: 146/2}} source={{uri: this.props.userInfo.picture}}/>
          </View>
          <View style={styles.names}>
            <Text style={styles.namesText}>{this.props.userInfo.name}</Text>
            {this.props.userInfo.userName ?
              <Text style={styles.namesText}>{this.props.userInfo.userName}</Text>
              :
              <Text style={styles.namesText}>Create a user name</Text>
            }
          </View>
        </View>

        <View style={styles.downSide}>
          <TouchableOpacity
            style={styles.buttonDashboard}>
            <Image style={styles.iconButton} source={require('../../img/article-icon.png')}/>
            <Text style={styles.textIcon}>Publish an article</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDashboard}>
            <Image style={styles.iconButton} source={require('../../img/profile-maker-icon.png')}/>
            <Text style={styles.textIcon}>Update profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDashboard}>
            <Image style={styles.iconButton} source={require('../../img/work-maker-icon.png')}/>
            <Text style={styles.textIcon}>Upload work</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  welcome: {
    flex:1.25 ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 19,
    fontFamily: 'Avenir'
  },
  picture: {
    flex:3 ,
    width: 146,
    alignItems: 'center',
    justifyContent: 'center',
  },
  names: {
    flex:1.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namesText: {
    fontSize: 13,
    fontFamily: 'Avenir',
  },
  buttonDashboard: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#285DA1',
    height: 75,
    width: window.width*7.5/10,
    margin: 10,
    borderRadius: 5
  },
  textIcon: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15
  },
  iconButton: {
    width: 15,
    height: 20,
  },
  downSide: {
    flex:1.25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topSide: {
    flex:1 ,
    alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  makerDashboard: {
    flex:1 ,
    backgroundColor: 'white'
  }
});
