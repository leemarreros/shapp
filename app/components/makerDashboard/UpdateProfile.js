'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

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
            <View style={{flex: 1}}>
              <Text
                style={[styles.fieldName, {textAlign: 'right', marginRight: 10, fontWeight: 'bold'}]}>
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
                style={[styles.inputBox, {height: 150}]}
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

          <View style={[styles.fieldContainer, {height: 150}]}>
            <View style={{flex: 1}}>
              <Image source={{uri: this.state.pictureIn}}/>
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
      </View>
    );
  }
}

var styles = StyleSheet.create({
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
    height: 118,
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
