/**
 * Airbnb Clone App
 * @author: Andy
 * @Url: https://www.cubui.com
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from './../styles/colors';
//import { TextInput } from 'react-native-paper';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.defaultValue,
    };
  
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
  }

  render() {
    const { onHandleMic  } = this.props;
  	return (
    <View style={styles.wrapper}>
      <View style={styles.searchContainer}>
        <Icon
          name="ios-search"
          size={20}
          color={colors.violet}
          style={styles.searchIcon}
        />
       
        <TextInput
            autoCorrect={false}
            style= {{marginLeft : 36, fontSize:16,marginTop:0}}
            placeholder="Search JaiHo"
            placeholderTextColor={colors.light_grey}
            autoCorrect={false}
            onChangeText={this.onChangeText}
            underlineColorAndroid="transparent"
            defaultValue={this.state.inputValue}
            value={this.state.inputValue}
          />

          <TouchableOpacity style={styles.micIcon} onPress= {onHandleMic}>
        <MaterialIcon
                name="mic"
                color={colors.violet}
                size={24}
                
                
              />
              </TouchableOpacity>
      </View>
    </View>
  	);
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    //backgroundColor: 'rgba(255,255,255,0.9)',
    width: '100%',
    height: 84,
    zIndex: 99,
  },
  searchContainer: {
  	display: 'flex',
  	borderWidth: 1,
  	borderColor: colors.gray03,
  	backgroundColor: colors.white,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  	marginTop: 172,
  	marginLeft: 21,
    marginRight: 21,
    marginBottom: 16,
  },
  searchIcon: {
  	position: 'absolute',
  	left: 9,
  	top: 12,
  },
  textInput: {
    marginLeft: 36,
    textAlign: 'left',
    fontSize: 18,
    color: colors.black,
  },
  micIcon:{
    height: 30,
    position: 'absolute',
  	right: 6,
  	top: 12,
  }
});
