'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import AllProducts from './AllProducts';

import globalVar from '../../utils/globalVariables';
import helpers from '../../utils/dbHelper';

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

export default class UploadWork extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      category: '',
      description: '',
      savingData: false
    };
  }

  handlePublishPress() {
    this.setState({savingData: true});
    var url = `${globalVar.restUrl}/api/makerproductcreate`;

    if (this.state.title === '') {
      this.alertIOS('A tiitle or name is missing', 'Write a descriptive title!')
      return;
    }
    if (this.state.price === '') {
      this.alertIOS('A price is missing', 'Write a descriptive price!')
      return;
    }

    if (this.state.category === '') {
      this.alertIOS('A category is missing', 'Write a category for the product!')
      return;
    }

    if (this.state.description === '') {
      this.alertIOS('A description is missing', 'Write a description for the product!')
      return;
    }

    var body = {};

    body.title = this.state.title;
    body.price = this.state.price;
    body.category = this.state.category;
    body.description = this.state.description;

    if (this.props.userInfo.fbId) {
      body.fbId = this.props.userInfo.fbId;
    } else {
      body._id = this.props.userInfo._id;
    }

    fetch(helpers.requestHelper(url, body, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({savingData: false});
        console.log(responseData);
        if (responseData.condition === 'done') {

          this.props.navigator.push({
            component: AllProducts,
            navigationBar: (
              <NavigationBar
                title={<Text style={styles.titleSignUp}>ARTICLES</Text>}
                style={styles.navigationBar}
                tintColor={'#285DA1'}
                statusBar={{style: 'light-content', hidden: false}}
                leftButton={
                  <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
                    <Image
                      source={require('../../img/back-icon.png')}
                      style={[{ width: 15, height: 15}]}/>
                  </TouchableOpacity>}
                rightButton={
                  <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
                    <Text style={styles.rightButton}>Publish</Text>
                  </TouchableOpacity>}/>
            )
          });

          this.setState({
            title: '',
            price: '',
            category: '',
            description: '',
          })

        } else {
          this.alertIOS('An error occurred', 'Try again!');
        }
      })
      .done();

  }

  alertIOS(title, message) {
    AlertIOS.alert(title, message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >

        <View style={styles.title}>
          <Text style={styles.titleText}>Share who you work with the</Text>
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
                placeholder="Golden birds at the pier"
                onChangeText={(title) => this.setState({title})}/>
            </View>
          </View>

           <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>PRICE(USS)</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>CATEGORY</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.price}
                style={styles.inputBox}
                placeholder="375.00"
                onChangeText={(price) => this.setState({price})}/>
            </View>
            <View style={{flex: 1, borderLeftWidth: 0.5, borderLeftColor: '#D1D1D1'}}>
              <TextInput
                value={this.state.category}
                style={styles.inputBox}
                placeholder="Sculpture"
                onChangeText={(category) => this.setState({category})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>DESCRIPTION</Text>
            </View>
          </View>

          <View style={[styles.fieldContainer, {height: 150}]}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.description}
                style={[styles.inputBox, {height: 150, paddingTop: 10}]}
                multiline={true}
                placeholder="This piece has been developed using silver and ..."
                onChangeText={(description) => this.setState({description})}/>
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
  titleSignUp: {
    fontFamily: 'Avenir',
    fontWeight: '500',
    fontSize: 15,
    color: 'white',
  },
  navigationBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    paddingBottom: 12,
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
  },
  fieldName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 11,
    marginLeft: 13,
    textAlign: 'left'
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
});
