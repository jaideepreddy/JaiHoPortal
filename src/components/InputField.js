import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from './../styles/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureInput: !(props.inputType === 'text' || props.inputType === 'email'),
      scaleCheckmarkValue: new Animated.Value(0),
      inputValue: props.defaultValue,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  scaleCheckmark(value) {
    Animated.timing(
      this.state.scaleCheckmarkValue,
      {
        toValue: value,
        duration: 400,
        easing: Easing.easeOutBack,
        useNativeDriver: true
      },
    ).start();
  }

  toggleShowPassword() {
    this.setState({ secureInput: !this.state.secureInput });
  }

  onChangeText(text) {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
  }

  render() {
    const {
      labelText,
      labelTextSize,
      labelTextWeight,
      labelColor,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
      inputStyle,
      onChangeText,
      showCheckmark,
      autoFocus,
      autoCapitalize,
      placeholder,
      defaultValue,
    } = this.props;
    const { secureInput, scaleCheckmarkValue, inputValue } = this.state;
    const fontWeight = labelTextWeight || '700';
    const color = labelColor || colors.white;
    const fontSize = labelTextSize || 14;
    const inputColor = textColor || colors.white;
    const borderBottom = borderBottomColor || 'transparent';
    const keyboardType = inputType === 'email' ? 'email-address' : 'default';
    const customInputStyle = inputStyle || {};
    if (!inputStyle || inputStyle && !inputStyle.paddingBottom) {
      customInputStyle.paddingBottom = 5;
    }

    const iconScale = scaleCheckmarkValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.01, 1.6, 1],
    });

    const scaleValue = showCheckmark ? 1 : 0;
    this.scaleCheckmark(scaleValue);

    return (
      <View style={[customStyle, styles.wrapper]}>
        <View style={[customStyle, styles.wrapper]}>
          <Text style={[{fontWeight, color, fontSize}, styles.label]}>{labelText}</Text>
          {inputType === "password" ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={this.toggleShowPassword}
          >
            <Text style={styles.showButtonText}>
              {this.state.secureInput ? "Show" : "Hide"}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Animated.View style={[{ transform: [{ scale: iconScale }] }, styles.checkmarkWrapper]}>
          <Icon
            name="check"
            color={colors.white}
            size={20}
          />
        </Animated.View>
          <TextInput
            autoCorrect={false}
            style={[
              {color: inputColor, borderColor: borderBottom},
              styles.inputFiled,inputStyle
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.light_grey}
            secureTextEntry={secureInput}
          onChangeText={this.onChangeText}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          defaultValue={inputValue}
          value={inputValue}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  label: {
    fontWeight: '700',
    //marginBottom: 10
  },
  inputFiled: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: "200",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft:12
  },
  showButton: {
    position: "absolute",
    right: 0
  },
  showButtonText: {
    color: colors.dark_grey,
    fontWeight: "700",
    marginRight:8
  }
});
export default InputField;
