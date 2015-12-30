'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import NavBar from '../../utilComponents/navBar';

import globalVar from '../../utils/globalVariables';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
    console.log('Home will mount');
    var url = `${globalVar.restUrl}/api/articles`;
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData.data);
      // this.articles = responseData.data;
      this.setState({
        articles: responseData.data,
        loadingArticles: false,
      });
    })
    .done();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', height: window.height }}>
        <NavBar title={'HOME'} sourceLeft={require('../../img/burguer-menu.png')}/>

        {this.state.loadingArticles ? <Text> Loading</Text> :
          <View style={{flex: 1}}>
            <ScrollView
             style={styles.scrollView}>
              <View style={{height: 335}}>
                <Image
                  resizeMode='cover'
                  style={styles.imageFirstArt}
                  source={{uri: this.state.articles[0].picture}}>
                  <View style={styles.coverPicture}/>
                  <Text style={styles.titleFirstArt}>{this.state.articles[0].title}</Text>
                  <Image style={styles.shapIcon} source={require('../../img/logo-s.png')}/>
                </Image>
              </View>
              <View style={styles.restOfArt}>
                  {this.state.articles.map((elem, i)=> {
                    if (i === 0) return;
                    return (
                      <View style={styles.smallArticle} key={i}>
                        <Image style={styles.smallPicArtic} source={{uri: elem.picture}}/>
                        <Text style={styles.titleSmallArtic}>{elem.title}</Text>
                      </View>
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
    height: window.height - 335,
    backgroundColor: 'white',
    flexDirection: 'row',
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
