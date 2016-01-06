'use strict';

import React from 'react-native';
import Camera from 'react-native-camera'
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  NativeModules,
  ProgressViewIOS,
  TouchableOpacity,
  TouchableHighlight,
} = React;

export default class CameraLive extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cameraType: Camera.constants.Type.back
    };
  }

  _switchCamera() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  }

  _takePicture() {
    this.refs.cam.capture(function(err, data) {
      console.log(err, data);
    });
  }

   _onBarCodeRead(e) {
    console.log(e);
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref="cam"
          style={styles.cameraStyle}
          onBarCodeRead={this._onBarCodeRead}
          type={this.state.cameraType}>
          <TouchableHighlight style={styles.cameraButton} onPress={this._switchCamera.bind(this)}>
            <Text>The old switcheroo</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cameraButton} onPress={this._takePicture.bind(this)}>
            <Text>Take Picture</Text>
          </TouchableHighlight>
        </Camera>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
  cameraButton: {
    height: 36,
    width: 100,
    backgroundColor: 'white'
  },
  cameraStyle: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: window.width,
    height: window.height,
    backgroundColor: 'yellow'
  }
});
