import React from 'react-native';

var {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} = React;

class NavBarButton extends React.Component {

  render() {
    return (
      <TouchableOpacity>
        <Icon name={require('../img/' + this.props.iconName + '.png')} size={this.props.size} color={this.props.color} style={styles.icon}/>
      </TouchableOpacity>
    );
  }
}

module.exports = NavBarButton;

let styles = StyleSheet.create({
  icon: {
    width: 37,
    height: 37,
    right: 10,
    top: 21
  },
});
