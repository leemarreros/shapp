'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ProgressViewIOS
} = React;

export default class UpdateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
  }

  handleSavePress() {

  }

  handlePublishPress() {

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <View style={styles.title}>
          <Text>Share who you are with the</Text>
          <Text>world</Text>
        </View>
        <View style={{height: 20, width: window.width}}>
        <this.props.route.progressBar
          progress={this.props.route.progress}
          widthContainer={this.props.route.widthContainer}/>
        </View>
        <View style={styles.fields}>

        </View>
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
});
