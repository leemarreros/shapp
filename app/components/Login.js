'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import SignUp from  './SignUp';
import TabManager from  './TabManager';
import NavigationBar from 'react-native-navbar';
import helpers from '../utils/dbHelper';
import FBSDKCore from 'react-native-fbsdkcore';
import FBSDKLogin from 'react-native-fbsdklogin';

import globalVar from '../utils/globalVariables';
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

var window = Dimensions.get('window');

var {
  FBSDKLoginManager,
} = FBSDKLogin;

var {
  FBSDKAccessToken,
  FBSDKGraphRequest
} = FBSDKCore;

let {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  PixelRatio,
  NavigatorIOS,
  Text,
  StatusBarIOS,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Textinput
} = React;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmailorUserName: null,
      password: null,
      openSideMenu: false,
    };
  }

  componentWillMount() {
    var url = `${globalVar.restUrl}/api/session`;
    StatusBarIOS.setStyle('light-content');
     fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Login', responseData);
        if (responseData.session != 'false') this.switchToTabManager();
      })
      .done();
    this.eventEmitter = new EventEmitter();
    this.opened = false;
  }

  onSignUp() {
    this.props.navigator.push({
      component: SignUp,
      footerText: this.footerText(),
      switchToTabManager: this.switchToTabManager,
      navigationBar: (
        <NavigationBar
          title={<Text style={styles.titleSignUp}>SIGN UP</Text>}
          style={styles.navigationBar}
          tintColor={'#285DA1'}
          statusBar={{style: 'light-content', hidden: false}}
          leftButton={
            <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
              <Image
                source={require('../img/back-icon.png')}
                style={[{ width: 15, height: 15}]}/>
            </TouchableOpacity>
          }/>
      )
    });
  }

  footerText() {
    return (
      <Text style={styles.terms}>
        By clicking Sign Up you are agreeing to the <Text style={{color: '#64A1EF'}}>Terms of use</Text> and <Text style={{color: '#64A1EF'}}>Privacy Policy</Text>.
      </Text>
    );
  }

  alertIOS(title, message) {
    AlertIOS.alert(title, message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  onSignInPress() {
    if (this.state.userEmailorUserName === null ||
        this.state.userEmailorUserName === "") return;

    var url = `${globalVar.restUrl}/api/loginmanual`;
    var body = {
      password: this.state.password,
      email: null,
      username: null,
    };

    if (this.state.userEmailorUserName.indexOf('@') != -1) {
      body.email = this.state.userEmailorUserName;
    } else {
      body.username = this.state.userEmailorUserName;
    }

    fetch(helpers.requestHelper(url, body, 'POST'))
    .then((response) => response.json())
    .then((responseData) => {
      console.log('onSignInpress', responseData);
      if (responseData.status === 'nonUser') {

        this.alertIOS('Unrecognized User', 'Please, sign up!');

      } else if (responseData.status === 'passwordIncorrect') {

        this.alertIOS('Password Incorrect!', 'Please, try again.');

      } else if ( responseData.status === 'successLogin') {

        console.log('Successfull login');
        this.props.route.setUserInformation(responseData.maker);
        this.alertIOS('Welcome again!', 'Please, continue.');
        this.switchToTabManager();
      }

    })
    .done();
  }


  onBurguerMenuPress(bool) {
    if (!this.opened) {
      this.eventEmitter.emit('burguerBtnEvent', true);
      this.opened = true;
    } else {
      this.eventEmitter.emit('burguerBtnEvent', false);
    }
    if (!bool) {
      this.opened = false;
      this.eventEmitter.emit('burguerBtnEvent', false);
    }
  }
  switchToTabManager() {
    this.props.navigator.push({
      component: TabManager,
      events: this.eventEmitter,
      onBurguerMenuPress: this.onBurguerMenuPress.bind(this),
      onLogOutPress: this.onLogOutPress.bind(this),
      navigationBar: (
        <NavigationBar
          title={<Image style={{width: 55, height: 25}} source={require('../img/logo-as-title.png')}/>}
          style={styles.navigationBar}
          tintColor={'#285DA1'}
          statusBar={{style: 'light-content', hidden: false}}
          leftButton={
            <TouchableOpacity
              style={styles.buttonNavBar}
              onPress={this.onBurguerMenuPress.bind(this)}>
              <Image
                source={require('../img/burguer-menu.png')}
                style={[{ width: 20, height: 15}]}/>
            </TouchableOpacity>
          }/>
      )
    });
  }

  async getAccesToken(updateUserInfo) {
    var responseToken = await (FBSDKAccessToken.getCurrentAccessToken((token) => {

      if(!token) {
        this.setState({responseToken: true});
        console.log('No token founded');
        return;
      }

      let fetchProfileRequest = new FBSDKGraphRequest((error, userInfo) => {
        if (error) {
          console.warn('FBSDKGraphRequest', error);
          this.alertIOS('Error logging in', 'Please try again!');
          return;
        }
        // console.log('getAccesToken', userInfo);

        var url = `${globalVar.restUrl}/api/loginfb`;
        var body = {
          fbId: userInfo.id,
        };

        fetch(helpers.requestHelper(url, body, 'POST'))
        .then((response) => response.json())
        .then((responseData) => {
          // console.log('getAccesToken 2', responseData.);
          if (responseData.status === 'noexist') {
            this.alertIOS('This user does not exist!', 'Please, Sign Up.');
          } else if (responseData.status = 'successLogin') {
            this.alertIOS('Welcome again to Shapp!', 'Please, Continue.');
            this.props.route.setUserInformation(responseData.maker);
            this.switchToTabManager();
          }
        })
        .done();

      }, 'me');

      fetchProfileRequest.start(0);
    }));
  }

  onFbSignInPress() {
     FBSDKLoginManager.logInWithReadPermissions([], (error, result) => {
      if (error) {
        alert('Error logging in.');
      } else {
        if (result.isCanceled) {
          alert('Login cancelled.');
        } else {
          console.log('result', result);
          this.getAccesToken();
        }
      }
    });
  }

  onLogOutPress() {
    FBSDKLoginManager.logOut();
    this.props.navigator.popToTop();
    var url = `${globalVar.restUrl}/api/session`;
    var body = {
      logOut: false,
    };
    fetch(helpers.requestHelper(url, body, 'POST'))
    .done();
    this.opened = false;
  }

  componentDidMount() {
    this.getAccesToken();
  }

  render() {

    return (
      <View style={styles.loginScreen}>

        <View style={styles.brandWrap}>
          <Image source={require('../img/logo-s.png')} style={styles.iconApp}/>
          <Text style={styles.description}>Independent makers reaching the market</Text>
        </View>

        <View style={styles.identityPass}>
          <View style={styles.inputBoxWrapper}>
            <Image style={styles.icons} source={require('../img/email-login-icon.png')}/>
            <TextInput
              key={1}
              style={styles.inputBox}
              placeholder="EMAIL or USERNAME"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="white"
              onChangeText={(userEmailorUserName) => this.setState({userEmailorUserName})}
              value={this.state.text}/>
          </View>
          <View style={styles.inputBoxWrapper}>
            <Image style={styles.icons} source={require('../img/locker-login-icon.png')}/>
            <TextInput
              key={2}
              style={styles.inputBox}
              placeholder="PASSWORD"
              password={true}
              placeholderTextColor="white"
              onChangeText={(password) => this.setState({password})}
              value={this.state.text}/>
            <Image style={styles.icons} source={require('../img/interrogacion-login-sign.png')}/>
          </View>
        </View>

        <View style={styles.buttonsWrapper}>
          <View key={0}><Text style={styles.tour}>Take a tour</Text></View>
          <TouchableHighlight
            key={1}
            onPress={this.onSignInPress.bind(this)}
            style={styles.button}>
            <Text style={[styles.textButton]}>SIGN IN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            key={2}
            onPress={this.onFbSignInPress.bind(this)}
            style={styles.button}>
            <Text style={[styles.textButton]}>FACEBOOK</Text>
          </TouchableHighlight>
          <Text style={styles.signUp} onPress={this.onSignUp.bind(this)}>SIGN UP</Text>
        </View>

        <View style={styles.wrapperTerms}>
          {this.footerText}
        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  titleSignUp: {
    fontFamily: 'Avenir',
    fontWeight: '500',
    fontSize: 15,
    color: 'white',
  },
  navigationBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    paddingBottom: 12,
  },
  navigator: {
    backgroundColor: 'yellow',
    width: window.width,
    borderColor: 'black',
    borderWidth: 10
  },
  loginScreen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#285DA1',
  },
  brandWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width * 0.8,
    justifyContent: 'space-around',
    paddingTop: 40
  },
  description: {
    fontFamily: 'Avenir-Book',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 30,
    color: 'white',
  },
  iconApp: {
    width: 70,
    height: 70,
  },
  identityPass: {
    flexDirection: 'column'
  },
  inputBoxWrapper: {
    width: window.width * 0.80,
    flexDirection: 'row',
    borderColor: '#4A77B0',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    marginVertical: 8
  },
  inputBox: {
    padding: 9,
    height: 40,
    flex: 5,
    fontFamily: 'Avenir-Book',
    fontWeight: "100",
    color: 'white',
    fontSize: 13,
    opacity: 0.65,
    textAlign: 'center'
  },
  icons: {
    flex: 1,
    maxWidth: 15,
    resizeMode: 'contain',
    opacity: 0.65
  },
  buttonsWrapper: {
    alignItems: 'center',
    flexDirection: 'column',

  },
  button: {
    width: window.width * 0.8,
    borderWidth: 1.2 / PixelRatio.get(),
    alignItems: 'center',
    borderColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
  },
  textButton: {
    fontFamily: 'Avenir-Roman',
    color: 'white',
    shadowColor: 'black',
    paddingVertical: 12,
    fontSize: 13,
  },
  tour: {
    fontFamily: 'Avenir-Black',
    color: 'white',
    marginBottom: 25,
    fontSize: 13
  },
  signUp: {
    fontFamily: 'Avenir-Black',
    shadowColor: 'black',
    color: 'white',
    marginTop: 27,
    fontSize: 12
  },
  wrapperTerms: {
    width: window.width * 0.75,
  },
  terms: {
    textAlign: 'center',
    fontFamily: 'Avenir-Roman',
    fontSize: 13,
    color: 'white',
    marginBottom: 30
  },
});

module.exports = Login;