'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} = React;

export default class SideMenuLeft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.sideMenu}>
        <View style={styles.userInfo}>
          {!!this.props.userInfo ?
            <View style={styles.wrapperTop}>
              <View style={styles.wrapperPic}>
                  <Image style={styles.picProfile} source={{uri: this.props.userInfo.picture}}/>
              </View>
              <View style={styles.wrapperT}>
                <Text style={styles.textTop}>{this.props.userInfo.name}</Text>
                { !!this.props.userInfo.username ?
                  <Text style={styles.textTop}> {this.props.userInfo.username}</Text> :<Text style={styles.textTop}>Create a username</Text>}
              </View>
            </View>
            :
            null
          }
        </View>
        <View style={styles.buttons}>
        </View>
        <View style={styles.logOut}>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  textTop: {
    fontFamily: 'Avenir',
    fontSize: 11
  },
  wrapperTop: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperPic: {
    flex: 2,
    width: 79.5,
  },
  wrapperT: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picProfile: {
    borderRadius: 79.5/2,
    flex: 1,

  },
  userInfo: {
    flex: 3.3,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  buttons: {
    backgroundColor: 'yellow',
    flex: 10,
  },
  logOut: {
    backgroundColor: 'black',
    flex: 1,
  },
  sideMenu: {
    backgroundColor: 'white',
    width: window.width/2,
    height: window.height-64,
    borderRightWidth: 0.5,
    borderRightColor: 'grey'
  }
});
