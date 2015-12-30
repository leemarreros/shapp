'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
const UIManager = require('NativeModules').UIManager;

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ProgressViewIOS
} = React;

export default class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      textHeight: 0,
    };
  }

  handleScroll(e) {
     var y = e.nativeEvent.contentOffset.y/(this.state.textHeight-510);
     this.setState({progress: y})
  }

  componentWillMount() {
    this.article = this.props.route.article;
  }

  componentDidMount() {
    setTimeout(this.measureText.bind(this));
  }

  measureText() {
    const handle = React.findNodeHandle(this.refs.textHeight);
    UIManager.measureLayoutRelativeToParent(
      handle,
      (e) => {console.error(e)},
      (x, y, w, h) => {
        this.setState({textHeight : h})
      });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <ProgressViewIOS
          style={styles.progressView}
          progressTintColor="#50E3C2"
          progressViewStyle={'bar'}
          progress={this.state.progress}/>
        <ScrollView
          onScroll={this.handleScroll.bind(this)}
          scrollEventThrottle={30}>
          <Text style={styles.title}>{this.article.title}</Text>
          <Text ref="textHeight" style={styles.content}>{this.article.content}</Text>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  progressView: {
    // height: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10
  },
  content: {
    fontSize: 20,
    fontFamily: 'Avenir',
  }
});
