import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import colors from './../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class NextArrowButton extends Component {
  render() {
    const { disabled, handleNextButton } = this.props;
  	const opacityStyle = disabled ? 0.3 : 0.9;
    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
            style={[ styles.button]}
            onPress={handleNextButton}
            disabled={disabled}>
          <Icon
            name="angle-right"
            color={colors.white}
            size={32}
            style={styles.icon}
            
          />
        </TouchableOpacity>
      </View>
    );
  }
}

NextArrowButton.propTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.func,
};


const styles = StyleSheet.create({
    buttonWrapper: {
      alignItems: "flex-end",
      right: 20,
      bottom: 16,
      paddingTop: 0
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      width: 54,
      height: 54,
      backgroundColor: colors.violet
    },
    icon: {
      marginRight: -2,
      marginTop: -2
    }
  });
