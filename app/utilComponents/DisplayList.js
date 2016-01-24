'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ProgressViewIOS,
  TouchableOpacity
} = React;

export default class DisplayList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePublishPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <ScrollView style={styles.articlesWrapper}>
          {this.props.items.map((article, i) => {
            return (
              <TouchableOpacity key={i} style={styles.articleBar}>
                <View style={{flex: 1, justifyContent: 'center'}}><Text style={styles.titleArticle}>{article.title}</Text></View>
              </TouchableOpacity>)
          })}
        </ScrollView>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={this.handlePublishPress.bind(this)}
            style={styles.iconPublish}>
            <Text style={styles.textPublish}>{this.props.butttonText}</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  articlesWrapper: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 30
  },
  articleBar: {
    width: window.width,
    height: 43,
    backgroundColor: '#50E3C2',
    borderWidth: 1,
    borderColor: 'white',
  },
  titleArticle: {
    fontFamily: 'Avenir',
    color: 'white',
    paddingLeft: 15,
    fontWeight: '400',
    fontSize: 14
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 43,
    width: window.width,
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
  textPublish: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
