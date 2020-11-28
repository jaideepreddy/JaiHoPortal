import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from './../styles/colors';

export default class RoundedButton extends Component {
  onPress = () => {
    this.props.onPress();
  };
  render() {
    const {text, icon} = this.props;
    const backgroundColor = this.props.backgroundColor || 'transparent';
    const color = this.props.textColor || colors.black;
    return (
      <TouchableOpacity
        onPress={() => this.onPress()}
        style={[{backgroundColor}, styles.wrapper]}>
        <View style={styles.buttonTextWrapper}>
          {icon}
          <Text style={[{color}, styles.buttonText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

RoundedButton.propTypes = {
  text: propTypes.string.isRequired,
  textColor: propTypes.string,
  backgroundColor: propTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    width: '96%',
    padding: 4,
    display: 'flex',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.violet,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});