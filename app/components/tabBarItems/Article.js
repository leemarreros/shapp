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
    console.log(this.article);
    var newDate = new Date(this.article.createdOn);
    console.log(newDate);
    var day = newDate.getUTCDate() - 1;
    var month = newDate.getUTCMonth() + 1;
    var year = newDate.getUTCFullYear();
    this.date = "" + month + "/" + day + "/" + year;
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
          progressTintColor='#50E3C2'
          progressViewStyle={'bar'}
          progress={this.state.progress}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={this.handleScroll.bind(this)}
          scrollEventThrottle={30}
          style={styles.scrollView}>
          <Text style={styles.title}>{this.article.title}</Text>
          <Text style={styles.titleFoot}>
            By &nbsp;
            <Text style={styles.author}>
              {this.article.createdBy.name}
            </Text>&nbsp;|&nbsp;{this.date}
          </Text>
          <View style={styles.line}/>
          <Text ref="textHeight" style={styles.content}>{this.article.content}</Text>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  line: {
    width: window.width,
    height: 1,
    backgroundColor: 'grey',
    marginBottom: 20
  },
  titleFoot: {
    fontFamily: 'Avenir',
    fontSize: 14,
    marginBottom: 10,
    color: 'grey'
  },
  author: {
    fontWeight: '800'
  },
  scrollView: {
    marginHorizontal: 16
  },
  title: {
    fontSize: 30,
    fontFamily: 'Avenir',
    fontWeight: '900',
    marginTop: 5,
    marginBottom: 10
  },
  content: {
    fontSize: 18,
    fontFamily: 'Avenir',
  }
});
