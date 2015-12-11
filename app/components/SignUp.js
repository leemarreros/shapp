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
  StatusBarIOS,
  TextInput
} = React;

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  render() {

    return (
      <View style={styles.signupWrapper}>

        <View style={styles.whiteBoard}>
          <View key={1} style={styles.row}>
            <Image style={styles.icons} source={require('../img/user-signup-icon.png')}/>
            <TextInput
              style={styles.inputBox}
              placeholder="Create a username"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="#CACACA"
              onChangeText={(userName) => this.setState({userName})}
              value={this.state.text}/>
          </View>
          <View key={2} style={styles.row}>
            <Image style={styles.icons} source={require('../img/blank-square-icon.png')}/>
            <TextInput
              style={styles.inputBox}
              placeholder="Full Name"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="#CACACA"
              onChangeText={(fullName) => this.setState({fullName})}
              value={this.state.text}/>
          </View>
          <View key={3} style={styles.row}>
            <Image style={styles.icons} source={require('../img/email-signup-icon.png')}/>
            <TextInput
              style={styles.inputBox}
              placeholder="E-mail"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="#CACACA"
              onChangeText={(userEmail) => this.setState({userEmail})}
              value={this.state.text}/>
          </View>
          <View key={4} style={[styles.row, styles.passRow]}>
            <Image style={styles.icons} source={require('../img/locker-signup-icon.png')}/>
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="#CACACA"
              onChangeText={(userEmail) => this.setState({userEmail})}
              value={this.state.text}/>
            <Image style={styles.icons} source={require('../img/show-signup-icon.png')}/>
          </View>
          <View key={5} style={styles.row}>
            <Image style={styles.icons} source={require('../img/location-signup-icon.png')}/>
            <TextInput
              style={styles.inputBox}
              placeholder="Zip Code"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="#CACACA"
              onChangeText={(userEmail) => this.setState({userEmail})}
              value={this.state.text}/>
          </View>

          <TouchableHighlight key={6} style={[styles.button, styles.createAccount]}>
            <Text style={styles.createAccountTxt}>CREATE ACCOUNT</Text>
          </TouchableHighlight>

          <View style={styles.wrapperLine}>
            <View style={styles.lineDivision}></View>
            <View style={styles.wrapperLineText}><Text style={styles.orText}>or</Text></View>
          </View>

          <TouchableHighlight key={7} style={[styles.button, styles.facebook]}>
            <View style={styles.buttonContent}>
              <Image style={styles.imgIconButton} source={require('../img/fb-icon.png')}/>
              <Text style={styles.textIconButon}>SIGN UP WITH FACEBOOK</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight key={8} style={[styles.button, styles.twitter]} >
            <View style={styles.buttonContent}>
              <Image style={styles.imgIconButton} source={require('../img/twitter-icon.png')}/>
              <Text style={styles.textIconButon}>SIGN UP WITH TWITTER</Text>
            </View>
          </TouchableHighlight>

        </View>

        <View key={9} style={styles.wrapperTerms}>
          {this.props.route.footerText}
        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapperLineText: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#979797',
    height: 25,
    width: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    left: 160,
    backgroundColor: 'white',
    bottom: 11.5,
  },
  orText: {
    color: '#979797',
    fontFamily: 'Avenir-Book',
    fontWeight: '100',
    fontSize: 13,
  },
  wrapperLine: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  lineDivision: {
    width: window.width * 0.88,
    height: 1,
    backgroundColor: '#979797',
    opacity: 0.65
  },
  createAccountTxt: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Avenir-Book',
  },
  textIconButon: {
    fontSize: 12,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Avenir-Book',
  },
  imgIconButton: {
    maxWidth: 15,
    maxHeight: 15,
    resizeMode: 'contain',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  facebookTxt: {
    fontFamily: 'Avenir-Book',
    fontWeight: '100',
    color: 'white'
  },
  twitter: {
    backgroundColor: '#4FC0F2',
    marginBottom: 30
  },
  createAccount: {
    backgroundColor: '#9EA8B4',
    marginTop: 15
  },
  facebook: {
    backgroundColor: '#3C5B98'
  },
  button: {
    height: 47,
    width: window.width * 0.75,
    borderRadius: 4,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    flex: 1,
    maxWidth: 18,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    marginRight: 30,
    marginLeft: 20
  },
  inputBox: {
    flex: 5,
    fontFamily: 'Avenir-Book',
    fontWeight: "100",
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: 'transparent',
    width: window.width * 0.88,
  },
  passRow: {
    flexDirection: 'row'
  },
  navBar: {
    backgroundColor: 'white',
  },
  signupWrapper: {
    backgroundColor: '#285DA1',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  wrapperTerms: {
    width: window.width * 0.75,
    marginTop: 32
  },
  whiteBoard: {
    marginTop: 35,
    borderRadius: 20,
    backgroundColor: 'white',
    width: window.width * 0.88,
    flexDirection: 'column',
    alignItems: 'center',
  }
});

module.exports = SignUp;