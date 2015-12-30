'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import NavBar from '../../utilComponents/navBar';
import Article from './Article';
import globalVar from '../../utils/globalVariables';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView
} = React;

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingArticles: true,
      articles: null,
    };
  }

  componentWillMount() {
    var url = `${globalVar.restUrl}/api/articles`;
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        articles: responseData.data,
        loadingArticles: false,
      });
    })
    .done();
  }

  onArticlePressed(i) {
    this.props.navigator.push({
      component: Article,
      article:this.state.articles[i],
      navigationBar: (
        <NavigationBar
          title={<Text style={styles.titleSignUp}>ARTICLE</Text>}
          style={styles.navigationBar}
          tintColor={'#285DA1'}
          statusBar={{style: 'light-content', hidden: false}}
          leftButton={
            <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
              <Image
                source={require('../../img/back-icon.png')}
                style={[{ width: 15, height: 15}]}/>
            </TouchableOpacity>
          }/>
      )
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', height: window.height }}>

        {this.state.loadingArticles ? <Text> Loading</Text> :
          <View style={{flex: 1}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}>
              <TouchableHighlight
                style={{height: 335}}
                onPress={this.onArticlePressed.bind(this, 0)}>
                <Image
                  resizeMode='cover'
                  style={styles.imageFirstArt}
                  source={{uri: this.state.articles[0].picture}}>
                  <View style={styles.coverPicture}/>
                  <Text style={styles.titleFirstArt}>{this.state.articles[0].title}</Text>
                  <Image style={styles.shapIcon} source={require('../../img/logo-s.png')}/>
                </Image>
              </TouchableHighlight>

              <View style={styles.restOfArt}>
                  {this.state.articles.map((elem, i)=> {
                    if (i === 0) return;
                    return (
                      <TouchableHighlight
                        key={i}
                        underlayColor={'white'}
                        activeOpacity={0.85}
                        onPress={this.onArticlePressed.bind(this, i)}>
                        <View style={styles.smallArticle}>
                          <Image style={styles.smallPicArtic} source={{uri: elem.picture}}/>
                          <Text style={styles.titleSmallArtic}>{elem.title}</Text>
                        </View>
                      </TouchableHighlight>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  titleSignUp: {
    fontFamily: 'Avenir',
    fontWeight: '100',
    fontSize: 15,
    color: 'white',
    marginBottom: 3
  },
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginBottom: 4,
    paddingBottom: 12,
  },
  titleSmallArtic: {
    flex: 1.2,
    fontSize: 19,
    fontFamily: 'Avenir',
    paddingHorizontal: 3,
    marginTop: 4
  },
  smallPicArtic: {
    flex: 3,
    resizeMode: 'cover'
  },
  smallArticle: {
    width: window.width/2.2,
    height: 190,
    marginTop: 15,
    marginLeft: 10,
  },
  restOfArt: {
    width: window.width,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  shapIcon: {
    width: 98,
    height: 98,
    borderRadius: 5,
    position: 'absolute',
    top: 14,
    marginLeft: 14,
    opacity: 0.75
  },
  coverPicture: {
    position: 'absolute',
    height: 335,
    width: window.width,
    backgroundColor: 'black',
    opacity: 0.25,
    justifyContent: 'flex-end',
  },
  imageFirstArt: {
    flex: 1,
  },
  titleFirstArt: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Avenir',
    fontWeight: '100',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginBottom: 10,
    top: 240
  },
  scrollView: {
    height: window.height,
  }
});
