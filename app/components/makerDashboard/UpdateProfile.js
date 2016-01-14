'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import CameraShowRoll from '../camera/CameraShowRoll';
import CameraLive from '../camera/CameraLive';
import NavigationBar from 'react-native-navbar';
import Geocoder from 'react-native-geocoder';
import FBSDKCore from 'react-native-fbsdkcore';
import FBSDKLogin from 'react-native-fbsdklogin';

import globalVar from '../../utils/globalVariables';
import helpers from '../../utils/dbHelper';


var {
  FBSDKLoginManager,
} = FBSDKLogin;

var {
  FBSDKAccessToken,
  FBSDKGraphRequest
} = FBSDKCore;

var window = Dimensions.get('window');

let {
  View,
  Text,
  Image,
  AlertIOS,
  TextInput,
  StyleSheet,
  ScrollView,
  ProgressViewIOS,
  TouchableOpacity,
  ActivityIndicatorIOS,
} = React;

export default class UpdateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nameIn: this.props.userInfo.name || '',
      usernameIn: this.props.userInfo.username || '',
      emailIn: this.props.userInfo.email || '',
      pictureIn: this.props.userInfo.picture || '',
      bioIn: this.props.userInfo.bio || '',
      addressIn: this.props.userInfo.address.address || '',
      zipcodeIn: "" + this.props.userInfo.address.zipcode || '',
      cityIn: this.props.userInfo.address.city || '',
      stateIn: this.props.userInfo.address.state || '',
      latitude: "",
      longitude: "",
      name: this.props.userInfo.name,
      username: "",
      email: "",
      picture: "",
      bio: "",
      address: "",
      zipcode: "",
      city: "",
      state: "",
      modalOpen: false,
      animatingPos: false,
      animatingEmail: false,
      animatingBio: false,
      savingData: false,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
  }

  handleSavePress() {
    this.setState({savingData: true});
    var url = `${globalVar.restUrl}/api/makerprofileupdate`;
    var body = {};
    if (this.state.name != this.props.userInfo.name && this.state.name != "") body.name = this.state.name;
    !!this.state.username ? body.username = this.state.username : null;
    !!this.state.address ? body.address = this.state.address : null;
    !!this.state.city ? body.city = this.state.city : null;
    !!this.state.state ? body.state = this.state.state : null;
    !!this.state.zipcode ? body.zipcode = this.state.zipcode : null;
    !!this.state.latitude ? body.latitude = this.state.latitude : null;
    !!this.state.longitude ? body.longitude = this.state.longitude : null;
    !!this.state.email ? body.email = this.state.email : null;
    !!this.state.bio ? body.bio = this.state.bio : null;
    !!this.props.userInfo ? body.fbId = this.props.userInfo.fbId : null;

    if (Object.keys(body).length === 1 && 'fbId' in body) {
      this.setState({savingData: false});
    } else {
      fetch(helpers.requestHelper(url, body, 'POST'))
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({savingData: false});
        })
        .done();
    }
  }

  handlePublishPress() {
    this.handleSavePress.bind(this);
    this.props.navigator.pop();
  }

  openModalSelection() {
    this.setState({modalOpen: true});
  }

  handleModalSelection(type) {

    this.setState({modalOpen: false});
    switch (type) {
      case 'camera':
        this.props.navigator.push({
          component: CameraLive,
        })
        break;

      case 'file':
        this.props.navigator.push({
          component: CameraShowRoll,
          navigationBar: (
            <NavigationBar
              title={<Text style={styles.titleSignUp}>SELECT A PICTURE</Text>}
              style={styles.navigationBar}
              tintColor={'#285DA1'}
              statusBar={{style: 'light-content', hidden: false}}
              leftButton={
                <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
                  <Image
                    source={require('../../img/back-icon.png')}
                    style={[{ width: 15, height: 15}]}/>
                </TouchableOpacity>
              }/>
          )
        });

        break;

      default:
        return;
    }
  }

  onPressCurrentPosition(count) {
    this.setState({animatingPos: true});
    navigator.geolocation.getCurrentPosition(
      (userPosition) => {
        var coords = {
          latitude: userPosition.coords.latitude,
          longitude: userPosition.coords.longitude,
        }
        this.setState({
          latitude: userPosition.coords.latitude,
          longitude: userPosition.coords.longitude,
        })
        Geocoder.reverseGeocodeLocation(coords, (err, data) => {
          if (err) { console.log(err); return;}
          this.setState({
            addressIn: data[0].name,
            cityIn: data[0].locality,
            stateIn: data[0].administrativeArea,
            zipcodeIn: data[0].postalCode,
            address: data[0].name,
            city: data[0].locality,
            state: data[0].administrativeArea,
            zipcode: data[0].postalCode,
          });
          this.setState({animatingPos: false});
        })
      },
      (error) => {
        count = !count ? 1 : (count + 1);
        var txt = count <= 3 ? 'We are having trouble finding your location.' : 'We can\'t locate you.\nEnsure your location service is enabled.';
        AlertIOS.alert(
          'Yikes',
          txt,
          [
            {text: 'Try Again', onPress: this.onPressCurrentPosition.bind(this, count)}
          ]
        )
        console.warn(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  async getAccesToken(selection) {
    var responseToken = await (FBSDKAccessToken.getCurrentAccessToken((token) => {
    let fetchProfileRequest;
      if(!token) {
        console.log('No token founded');
        this.alertIOS('Error getting email', 'Please sign in or try again!');
        return;
      }
      if (selection === 'bio') {

        fetchProfileRequest = new FBSDKGraphRequest((error, userInfo) => {
          if (error) {
            console.warn('FBSDKGraphRequest', error);
            this.alertIOS('Error retrieving bio', 'Please sign in or try again!');
            return;
          }

          this.setState({
            bio: userInfo.bio,
            bioIn: userInfo.bio,
            animatingBio: false,
          });
        }, 'me?fields=bio');

      } else {

        fetchProfileRequest = new FBSDKGraphRequest((error, userInfo) => {
          if (error) {
            console.warn('FBSDKGraphRequest', error);
            this.alertIOS('Error getting email', 'Please sign in or try again!');
            return;
          }

          this.setState({
            emailIn: userInfo.email,
            email: userInfo.email,
            animatingEmail: false,
          });
        }, 'me?fields=email');

      }

      fetchProfileRequest.start(0);
    }));
  }

  alertIOS(title, message) {
    AlertIOS.alert(title, message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  onGetDataFromFacebook(selection) {
    if (selection === 'bio') {
      this.setState({animatingBio: true});
      FBSDKLoginManager.logInWithReadPermissions(['user_about_me'], (error, result) => {
        if (error) {
          alert('Error getting bio.');
        } else {
          if (result.isCanceled) {
            alert('Cancelled.');
          } else {
            this.getAccesToken(selection);
          }
        }
      });
      return;
    }
    this.setState({animatingEmail: true});
    FBSDKLoginManager.logInWithReadPermissions(['email'], (error, result) => {
      if (error) {
        alert('Error getting e-mail.');
      } else {
        if (result.isCanceled) {
          alert('Cancelled.');
        } else {
          this.getAccesToken();
        }
      }
    });
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <View style={styles.title}>
          <Text style={styles.titleText}>Share who you are with the</Text>
          <Text style={styles.titleText}>world!</Text>
        </View>

        <this.props.route.progressBar
          progress={this.props.route.progress}
          widthContainer={this.props.route.widthContainer}/>

        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          style={styles.fields}>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>NAME</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>USERNAME</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.nameIn}
                style={styles.inputBox}
                placeholder="Name"
                onChangeText={(name) => this.setState({name})}/>
            </View>
            <View style={{flex: 1, borderLeftWidth: 0.5, borderLeftColor: '#D1D1D1'}}>
              <TextInput
                value={this.state.usernameIn}
                style={styles.inputBox}
                placeholder="Username"
                onChangeText={(username) => this.setState({username})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>ADDRESS</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
               <ActivityIndicatorIOS
                  animating={this.state.animatingPos}
                  style={[styles.centering, {height: 20}]}
                  size="small"/>
              <TouchableOpacity
                onPress={this.onPressCurrentPosition.bind(this)}
                style={{flex: 1}}>
                <Text
                  style={[styles.fieldName, {textAlign: 'right', marginRight: 15, fontWeight: 'bold'}]}>
                  GET CURRENT POSITION
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
              <TextInput
                value={this.state.addressIn}
                style={styles.inputBox}
                placeholder="Address"
                onChangeText={(address) => this.setState({address})}/>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
              <TextInput
                value={this.state.cityIn}
                style={styles.inputBox}
                placeholder="City"
                onChangeText={(city) => this.setState({city})}/>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.stateIn}
                style={styles.inputBox}
                placeholder="State"
                onChangeText={(state) => this.setState({state})}/>
            </View>
            <View style={{flex: 1, borderLeftColor: '#D1D1D1', borderLeftWidth: 0.5}}>
              <TextInput
                value={this.state.zipcodeIn}
                style={styles.inputBox}
                placeholder="Zipcode"
                onChangeText={(zipcode) => this.setState({zipcode})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>E-MAIL</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
               <ActivityIndicatorIOS
                  animating={this.state.animatingEmail}
                  style={[styles.centering, {height: 20}]}
                  size="small"/>
              <TouchableOpacity
                onPress={this.onGetDataFromFacebook.bind(this)}
                style={{flex: 1}}>
                <Text
                  style={[styles.fieldName, {textAlign: 'right', marginRight: 15, fontWeight: 'bold'}]}>
                  GET EMAIL FROM FB
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.emailIn}
                style={styles.inputBox}
                placeholder="Email"
                onChangeText={(email) => this.setState({email})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>BIO</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
               <ActivityIndicatorIOS
                  animating={this.state.animatingEmail}
                  style={[styles.centering, {height: 20}]}
                  size="small"/>
              <TouchableOpacity
                onPress={this.onGetDataFromFacebook.bind(this, 'bio')}
                style={{flex: 1}}>
                <Text
                  style={[styles.fieldName, {textAlign: 'right', marginRight: 15, fontWeight: 'bold'}]}>
                  GET BIO FROM FB
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.fieldContainer, {height: 150}]}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.bioIn}
                style={[styles.inputBox, {height: 150, paddingTop: 10}]}
                multiline={true}
                placeholder="Give details about yourself and work experience. Tha more the merrier!"
                onChangeText={(bio) => this.setState({bio})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>UPLOAD/CHANGE PICTURE</Text>
            </View>
          </View>

          <View style={[styles.fieldContainer, {height: 500}]}>
            <View style={{height: 500, width: window.width, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column'}}>
              <Image style={styles.picture} source={{uri: this.state.pictureIn}}/>
              <TouchableOpacity
                onPress={this.openModalSelection.bind(this)}
                style={styles.changePicture}>
                <Text style={styles.changePictureText}>Add/Change picture</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={this.handleSavePress.bind(this)}
            style={styles.iconSave}>
            <Text style={styles.textSave}>SAVE CHANGES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handlePublishPress.bind(this)}
            style={styles.iconPublish}>
            <Text style={styles.textPublish}>PUBLISH</Text>
          </TouchableOpacity>
        </View>

        {this.state.modalOpen ?
         <View style={styles.modal}>
          <TouchableOpacity style={styles.modalBackground} onPress={()=>{this.setState({modalOpen: false})}}/>
          <TouchableOpacity
            onPress={this.handleModalSelection.bind(this, 'camera')}
            style={styles.modalButton}>
            <Text style={styles.modelText}>TAKE PICTURE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleModalSelection.bind(this, 'file')}
            style={styles.modalButton}>
            <Text style={styles.modelText}>CHOOSE FROM FILE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{this.setState({modalOpen: false})}}
            style={[styles.modalButton, {backgroundColor: 'grey'}]}>
            <Text style={styles.modelText}>CANCEL</Text>
          </TouchableOpacity>
         </View>
        :null}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#50E3C2',
  },
  modal: {
    top: 185,
    position: 'absolute',
    width: window.width * 0.85,
    height: 210,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBackground: {
    backgroundColor: '#50E3C2',
    width: window.width,
    height: window.height,
    opacity: 0.90,
    position: 'absolute',
    top: -185
  },
  modalButton: {
    flex: 1,
    width: window.width * 0.85,
    marginLeft: 56,
    backgroundColor: '#285DA1',
    borderColor: '#50E3C2',
    borderWidth: 0.5,
    justifyContent: 'center'
  },
  modelText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
  picture: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginTop: 15,
  },
  changePicture: {
    width: window.width/2,
    height: 43,
  },
  changePictureText: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 15,
    paddingTop: 10
  },
  fieldContainer: {
    alignItems: 'center',
    width: window.width,
    height: 43,
    flexDirection: 'row'
  },
  inputBox: {
    height: 43,
    fontFamily: 'Avenir-Book',
    fontWeight: "100",
    fontStyle: 'italic',
    fontSize: 13,
    paddingLeft: 13,
    textAlign: 'left'
  },
  fieldName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 11,
    marginLeft: 13,
    textAlign: 'left'
  },
  titleFieldBar: {
    alignItems: 'center',
    width: window.width,
    height: 43,
    backgroundColor: '#F2F2F2',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row'
  },
  title: {
    height: 85,
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 18
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 43,
    width: window.width,
  },
  iconSave: {
    flex: 1,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#D1D1D1'
  },
  iconPublish: {
    flex: 1,
    height: 43,
    alignItems: 'center',
    backgroundColor: '#285DA1',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#D1D1D1'
  },
  textSave: {
    fontFamily: 'Avenir',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textPublish: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
