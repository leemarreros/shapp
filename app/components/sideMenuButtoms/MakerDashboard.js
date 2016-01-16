'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import PublishArticle from '../makerDashboard/PublishArticle';
import UpdateProfile from '../makerDashboard/UpdateProfile';
import UploadWork from '../makerDashboard/UploadWork';
import RightButton from '../../utilComponents/RightButton'
import globalVar from '../../utils/globalVariables';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  AlertIOS,
  ProgressViewIOS,
  TouchableOpacity,
  Image
} = React;

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <View style={styles.wrapperProgressView}>
        <View style={[styles.textProgressContainer, {width: this.props.widthContainer}]}>
          <Text style={styles.profileCompletionText}>Profile completed {this.props.progress*100}%</Text>
        </View>
        <ProgressViewIOS
          style={{backgroundColor: '#F2F2F2'}}
          progressTintColor='#50E3C2'
          progressViewStyle={'bar'}
          progress={this.props.progress}/>
      </View>
    );
  }
}

export default class MakerDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      widthContainer: 105,
      articles: null,
      work: null
    };
  }

  componentWillMount() {
    this.calculateProgress();
    this.gettingUserArticles();
    this.gettingUserWork();
  }

  calculateProgress() {
    var count = 0;
    var total = 10;
    var keys = ['name', 'username', 'fbId','email', 'picture', 'bio' ,'address']
    for (var key=0;  key < keys.length; key++) {
      if (keys[key] === 'address') {
        var addressLength = Object.keys(this.props.userInfo.address).length - 2;
        count += Math.max(addressLength, 0);
      } else {
        if (this.props.userInfo[keys[key]] != undefined) {
          count++
        }
      }
    }
    var per = count/total;
    this.setState({progress: per})
    this.setState({widthContainer: Math.max(per*window.width, 105)})
  }

  gettingUserArticles() {
    var url = `${globalVar.restUrl}/api/articles/${this.props.userInfo.fbId}`;
     fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({articles: responseData.data});
      })
      .done();
  }

  gettingUserWork() {
     var url = `${globalVar.restUrl}/api/work/${this.props.userInfo.fbId}`;
     fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({work: responseData.data});
      })
      .done();
  }

  handleRightButton(title) {
    console.log('right button pressed');
  }

  handlePressIconsD(component, title) {
    var rightButton =
            <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
            </TouchableOpacity>;

    this.props.navigator.push({
      component,
      progressBar: ProgressBar,
      progress: this.state.progress,
      widthContainer: this.state.widthContainer,
      profile: this.props.userInfo,
      work: this.state.work,
      articles: this.state.articles,
      navigationBar: (
        <NavigationBar
          title={<Text style={styles.titleSignUp}>{title}</Text>}
          style={styles.navigationBar}
          tintColor={'#285DA1'}
          statusBar={{style: 'light-content', hidden: false}}
          leftButton={
            <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
              <Image
                source={require('../../img/back-icon.png')}
                style={[{ width: 15, height: 15}]}/>
            </TouchableOpacity>}
          rightButton={<RightButton title={title} onPress={this.handleRightButton.bind(this, title)} />}

          />
      )
    })
  }

  render() {
    return (
      <View style={styles.makerDashboard}>
        <View style={styles.topSide}>
          <View style={styles.welcome}>
            <Text style={styles.welcomeText}>Welcome Maker!</Text>
          </View>
          <View style={styles.picture}>
            <Image resizeMode='cover' style={{width: 146, height: 146 ,borderRadius: 146/2}} source={{uri: this.props.userInfo.picture}}/>
          </View>
          <View style={styles.names}>
            <Text style={styles.namesText}>{this.props.userInfo.name}</Text>
            {this.props.userInfo.username ?
              <Text style={styles.namesText}>{this.props.userInfo.username}</Text>
              :
              <Text style={styles.namesText}>Create a user name</Text>}
          </View>
        </View>

        <ProgressBar
          progress={this.state.progress}
          widthContainer={this.state.widthContainer}/>

        <View style={styles.downSide}>
          <TouchableOpacity
            onPress={this.handlePressIconsD.bind(this, UpdateProfile, 'PROFILE')}
            style={styles.buttonDashboard}>
            <Image style={styles.iconButton} source={require('../../img/profile-maker-icon.png')}/>
            <Text style={styles.textIcon}>Update profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handlePressIconsD.bind(this, PublishArticle, 'PUBLISH')}
            style={styles.buttonDashboard}>
            <Image style={styles.iconButton} source={require('../../img/article-icon.png')}/>
            <Text style={styles.textIcon}>Publish an article</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handlePressIconsD.bind(this, UploadWork, 'WORK')}
            style={styles.buttonDashboard}>
            <Image style={styles.iconButton} source={require('../../img/work-maker-icon.png')}/>
            <Text style={styles.textIcon}>Upload work</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleSignUp: {
    fontFamily: 'Avenir',
    fontWeight: '500',
    fontSize: 15,
    color: 'white',
  },
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    paddingBottom: 12,
  },
  wrapperProgressView: {
    justifyContent: 'flex-end'
  },
  textProgressContainer: {
    justifyContent: 'flex-end',
  },
  profileCompletionText: {
    fontFamily: 'Avenir',
    fontWeight: '100',
    fontSize: 10,
    color: '#285DA1',
    textAlign: 'right'
  },
  welcome: {
    flex:1.25 ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 19,
    fontFamily: 'Avenir'
  },
  picture: {
    flex:3 ,
    width: 146,
    alignItems: 'center',
    justifyContent: 'center',
  },
  names: {
    flex:1.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namesText: {
    fontSize: 13,
    fontFamily: 'Avenir',
  },
  buttonDashboard: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#285DA1',
    height: 75,
    width: window.width*7.5/10,
    margin: 10,
    borderRadius: 5
  },
  textIcon: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15
  },
  iconButton: {
    width: 15,
    height: 20,
  },
  downSide: {
    flex:1.25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topSide: {
    flex:1 ,
    alignItems: 'center',
  },
  makerDashboard: {
    flex:1 ,
    backgroundColor: 'white'
  }
});
