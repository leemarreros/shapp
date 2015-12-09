'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  Navigator,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput
} = React;

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.signupWrapper}>

        <View style={styles.whiteBoard}>
          <View style={styles.userName}>
            <Image source={require('../img/user-signup-icon.png')}/>
            <TextInput
              key={1}
              style={styles.inputBox}
              placeholder="Create a username"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="white"
              onChangeText={(userName) => this.setState({userName})}
              value={this.state.text}/>
          </View>
          <View style={styles.fullName}>
            <Image source={require('../img/blank-square-icon.png')}/>
            <TextInput
              key={1}
              style={styles.inputBox}
              placeholder="Full Name"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="white"
              onChangeText={(fullName) => this.setState({fullName})}
              value={this.state.text}/>
          </View>
          <View style={styles.email}>
            <Image source={require('../img/email-signup-icon.png')}/>
            <TextInput
              key={1}
              style={styles.inputBox}
              placeholder="E-mail"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="white"
              onChangeText={(userEmail) => this.setState({userEmail})}
              value={this.state.text}/>
          </View>
          <View style={styles.password}>
            <Image source={require('../img/locker-signup-icon.png')}/>
            <TextInput
              key={1}
              style={styles.inputBox}
              placeholder="Password"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="white"
              onChangeText={(userEmail) => this.setState({userEmail})}
              value={this.state.text}/>
            <Image source={require('../img/user-signup-icon.png')}/>
          </View>
          <View style={styles.zipCode}>
            <Image source={require('../img/location-signup-icon.png')}/>
            <TextInput
              key={1}
              style={styles.inputBox}
              placeholder="Zip Code"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="white"
              onChangeText={(userEmail) => this.setState({userEmail})}
              value={this.state.text}/>
          </View>

          <View style={styles.createButton}>
          </View>
        </View>

        <View style={styles.wrapperTerms}>
          {this.props.route.footerText}
        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  signupWrapper: {
    backgroundColor: '#285DA1',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  wrapperTerms: {
    width: window.width * 0.75,
  },
  whiteBoard: {
    width: window.width * 0.90,
    backgroundColor: 'white',
    borderRadius: 20
  }
});

module.exports = SignUp;