'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  Image,
  TextInput,
  CameraRoll,
  StyleSheet,
  ScrollView,
  NativeModules,
  ProgressViewIOS,
  TouchableOpacity,
} = React;

export default class CameraShowRoll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    var fetchParams = {
      first: 25
    };

    CameraRoll.getPhotos(fetchParams, this.storeImages.bind(this), this.logError);
  }

  storeImages (data) {
    var assets = data.edges;
    var images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images
    });
  }

  logError (error) {
    console.warn(error);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>
          {this.state.images.map((image, i) => {
            return (
              <TouchableHighlight
                key={i}
                underlayColor={'grey'}
                style={styles.button}
                onPress={this.handleOverlayOpen.bind(this, image)}>
                <Image
                  style={styles.image}
                  source={{uri: image.uri}} />
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  button: {
    width: 110,
    height: 110,
    margin: 5
  },
  image: {
    width: 110,
    height: 110,
    borderWidth: 5,
    borderColor: '#ffffff'
  }
});
