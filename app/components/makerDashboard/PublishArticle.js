'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

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

export default class PublishArticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
    };
  }

  handleSavePress() {

  }

  handlePublishPress() {

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <View style={styles.title}>
          <Text style={styles.titleText}>Share your knowledge with the</Text>
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
              <Text style={styles.fieldName}>TITLE</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
              <View style={{flex: 1}}>
                <TextInput
                  value={this.state.title}
                  style={styles.inputBox}
                  placeholder="Title (e.g. New frontiers in web development)"
                  onChangeText={(title) => this.setState({title})}/>
              </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>CONTENT</Text>
            </View>
          </View>

          <View style={[styles.fieldContainer, {height: 150}]}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.content}
                style={[styles.inputBox, {height: 150, paddingTop: 10}]}
                multiline={true}
                placeholder="(e.g. The breakthrough technology developer by FB...)"
                onChangeText={(content) => this.setState({content})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>TAGS</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.emailIn}
                style={styles.inputBox}
                placeholder="(e.g. finance, tv, economy, art, wood, glod, etc)"
                onChangeText={(tags) => this.setState({tags})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>MEDIA: ADD VIDEO OR PICTURE</Text>
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
  fieldName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 11,
    marginLeft: 13,
    textAlign: 'left'
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
  },
});
