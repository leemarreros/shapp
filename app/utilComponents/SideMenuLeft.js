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

export default class SideMenuLeft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  onLogOutPress() {
    AlertIOS.alert('Loggin out!', 'Are you sure?',
      [
        {text: 'Yes please!', onPress: () => this.props.onLogOutPress()},
        {text: 'Just kidding!', onPress: () => {}}
      ],
      'secure-text'
    )
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
        <TouchableOpacity
          style={styles.logOutWrap}
          onPress={this.onLogOutPress.bind(this)}>
          <Image style={styles.logOutButton} source={require('../img/log-out-icon.png')}/>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  logOutText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5
  },
  logOutButton: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  logOutWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
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
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
  },
  buttons: {
    backgroundColor: 'yellow',
    flex: 10,
  },
  sideMenu: {
    backgroundColor: 'white',
    width: window.width/2,
    height: window.height-64,
    borderRightWidth: 0.5,
    borderRightColor: 'grey'
  }
});
