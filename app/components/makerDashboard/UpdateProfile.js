'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import CameraShowRoll from '../camera/CameraShowRoll';
import CameraLive from '../camera/CameraLive';
import NavigationBar from 'react-native-navbar';

var window = Dimensions.get('window');

let {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  ProgressViewIOS,
  TouchableOpacity,
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
      zipcodeIn: this.props.userInfo.address.zipcode || '',
      cityIn: this.props.userInfo.address.city || '',
      stateIn: this.props.userInfo.address.state || '',
      name: null,
      username: null,
      email: null,
      picture: null,
      bio: null,
      address: null,
      zipcode: null,
      city: null,
      state: null,
      modalOpen: false,
    };
  }

  componentWillMount() {
    console.log('will', this.state.nameIn);
  }

  componentDidMount() {
    console.log('Did', this.state.name);
  }

  handleSavePress() {

  }

  handlePublishPress() {

  }

  openModalSelection() {
    this.setState({modalOpen: true});
    console.log('clicked open modal');
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

  render() {
    console.log(this.state.modalOpen);
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
            <View style={{flex: 1}}>
              <Text
                style={[styles.fieldName, {textAlign: 'right', marginRight: 15, fontWeight: 'bold'}]}>
                GET CURRENT POSITION
              </Text>
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
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.emailIn}
                style={styles.inputBox}
                placeholder="Email"
                keyboardType={'numeric'}
                onChangeText={(email) => this.setState({email})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>BIO</Text>
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
