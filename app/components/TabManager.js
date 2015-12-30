'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import Tabbar  from 'react-native-tabbar';
import Home from './tabBarItems/Home';
import Makers from './tabBarItems/Makers';
import Products from './tabBarItems/Products';
import Messages from './tabBarItems/Messages';
import Checkout from './tabBarItems/Checkout';
import SideMenu from 'react-native-side-menu';
import SideMenuLeft from '../utilComponents/SideMenuLeft'

var Item = Tabbar.Item;

var window = Dimensions.get('window');

let {
  TabBarIOS,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} = React;

export default class TabManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notifCount: 0,
      presses: 0,
      selected: 'home',
      openSideMenu: false,
    };
  }

  onTabItemPress (name) {
    this.setState({
      selected: name
    });

  }

  componentWillReceiveProps(nextProps) {
    // console.log('will', nextProps);
  }


  openSideMenuClick(args) {
    this.setState({openSideMenu: args.open})
    console.log('openSideMenuClick');
  }

  componentWillMount() {
    this.props.route.events.addListener('burguerBtnEvent',
      (args) => {
        console.log(args);
        this.setState({openSideMenu: args});
      });
    // this.props.route.events.addListener(this.props.route.events, 'burguerBtnEvent', ()=>{console.log('hello')});
    // console.log(this.props.route.events.addListener(this.props.route.events, 'burguerBtnEvent', this.openSideMenuClick));
  }


  onChangeSideMenu(isOpen) {
    if (!isOpen) {
      this.setState({openSideMenu: false});
    }
    console.log('onChange', isOpen);
  }

  render() {

    console.log('render', this.props.route.openSideMenu);
    return (
      <SideMenu
      style={{backgroundColor: 'green'}}
      menu={<SideMenuLeft/>}
      openMenuOffset={window.width/2}
      disableGestures={true}
      onChange={this.onChangeSideMenu.bind(this)}
      isOpen={this.state.openSideMenu}>
        <Tabbar
          selected={this.state.selected}
          onTabItemPress={this.onTabItemPress.bind(this)}
          style={{backgroundColor: 'green'}}>
          <Item name="home">
            <Item.Content>
              <Home navigator={this.props.navigator}/>
            </Item.Content>
            <Item.Icon>
                <Image
                  style={styles.iconTab}
                  source={this.state.selected ==='home' ?
                    require('../img/home-bbar-icon-high.png') :
                    require('../img/home-bbar-icon.png')}/>
            </Item.Icon>
          </Item>
          <Item name="makers">
            <Item.Content>
            <Makers/>
            </Item.Content>
            <Item.Icon>
              <Image
                  style={styles.iconTab}
                  source={this.state.selected ==='makers' ?
                    require('../img/makers-bbar-icon-high.png') :
                    require('../img/makers-bbar-icon.png')}/>
            </Item.Icon>
          </Item>
          <Item name="products">
            <Item.Content>
              <Products/>
            </Item.Content>
            <Item.Icon>
                <Image
                  style={styles.iconTab}
                  source={this.state.selected ==='products' ?
                    require('../img/products-bbar-icon-high.png') :
                    require('../img/products-bbar-icon.png')}/>
            </Item.Icon>
          </Item>
          <Item name="messages">
            <Item.Content>
              <Messages/>
            </Item.Content>
            <Item.Icon>
                <Image
                  style={styles.iconTab}
                  source={this.state.selected ==='messages' ?
                    require('../img/chat-bbar-icon-high.png') :
                    require('../img/chat-bbar-icon.png')}/>
            </Item.Icon>
          </Item>
          <Item name="checkout">
            <Item.Content>
              <Checkout/>
            </Item.Content>
            <Item.Icon>
                <Image
                  style={styles.iconTab}
                  source={this.state.selected ==='checkout' ?
                    require('../img/checkout-bbar-icon-high.png') :
                    require('../img/checkout-bbar-icon.png')}/>
            </Item.Icon>
          </Item>
        </Tabbar>
      </SideMenu>
    );
  }
}

var styles = StyleSheet.create({
  iconTab: {
    width: 25,
    height: 25,
  },
});
