import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import colors from './../styles/colors';
import NextArrowButton from './../components/NextArrowButton';
import {Constants} from './../constants/Constants';
import Loader from './../components/Loader';
import AlertDialog from './../components/AlertDialog';
import DBPreference from './../utils/DBPReference';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      validEmail: false,
      emailAddress: '',
      password: '',
      confirmPassword: '',
      name: '',
      phoneNumber: '',
      city: '',
      state: '',
      country: '',
      validPassword: false,
      loadingVisible: false,
      dialogVisible: false,
      dialogHeaderText: '',
      desciptionText: '',
      firstButtonLabel: '',
      secondButtonlabel: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this,
    );
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
  }

  handleNextButton() {
    this.setState({loadingVisible: true});
    const {
      name,
      emailAddress,
      phoneNumber,
      city,
      state,
      country,
      password,
      confirmPassword,
    } = this.state;

    console.warn('email' + emailAddress);
    console.warn('country' + country);
    console.warn('phoneNumber' + phoneNumber);
    console.warn('city' + city);
    console.warn('name' + name);

    fetch(Constants.JaiHo_URL_Endpoint + 'Register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: emailAddress,
        phone: phoneNumber,
        city: city,
        state: state,
        country: country,
        password: password,
        confirmPassword: confirmPassword
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var loginResponse = JSON.stringify(responseJson);
        console.warn('loginResponse' + loginResponse);
        
        this.setState({formValid: true, loadingVisible: false});
        if (responseJson.isSuccessStatusCode == true) {
          global.USERNAME = this.state.name;
          this.props.navigation.navigate('Search', {username: this.state.name});
          try {
            DBPreference.setStoredData(
                DBPreference.LOGIN_STATUS,
                "true",
                (error, result) => {
                    console.log(error);
                }
            );
            } catch (error) {
              console.error("Error saving data" + error);
            }

            try {
              DBPreference.setStoredData(
                  DBPreference.USER_NAME,
                  name,
                  (error, result) => {
                      console.log(error);
                  }
              );
              } catch (error) {
                console.error("Error saving data" + error);
              }

              try {
                DBPreference.setStoredData(
                    DBPreference.EMAIL_ADDRESS,
                    emailAddress,
                    (error, result) => {
                        console.log(error);
                    }
                );
                } catch (error) {
                  console.error("Error saving data" + error);
                }
        }else{
          this.setState({ dialogVisible: true,  
            dialogHeaderText: "Account Creation Failed!",
            desciptionText:"Please try again", 
            firstButtonLabel: "Ok",
            emailAddress: '',
            password: '',
            confirmPassword: '',
            name: '',
            phoneNumber: '',
            city: '',
            state: '',
            country: '',
          });
        }
      })
      .catch((error) => {
        this.setState({formValid: false, loadingVisible: false});
        console.log('error' + error);
        if(error == "TypeError: Network request failed"){
          this.setState({ dialogVisible: true,  
            dialogHeaderText: "There's no network connection",
            desciptionText:"Please check your internet connection and try again.", 
            firstButtonLabel: "Ok",
            emailAddress: '',
            password: '',
            confirmPassword: '',
            name: '',
            phoneNumber: '',
            city: '',
            state: '',
            country: '',
          });
        }else{
          this.setState({ dialogVisible: true,  
            dialogHeaderText: "Account Creation Unsuccessfull",
            desciptionText:"Please try again", 
            firstButtonLabel: "Ok", 
            emailAddress: '',
            password: '',
            confirmPassword: '',
            name: '',
            phoneNumber: '',
            city: '',
            state: '',
            country: '',});
        }
      });
  }

  handleEmailChange(email) {
    // eslint-disable-next-line
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|("+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {validEmail} = this.state;
    this.setState({emailAddress: email});

    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({validEmail: true});
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({validEmail: false});
    }
    //console.warn('email'+email);
  }

  handleNameChange(name) {
    this.setState({name});
  }

  handlePhoneNumberChange(phone) {
    this.setState({phoneNumber: phone});
  }

  handleCityChange(city) {
    this.setState({city: city});
  }

  handleStateChange(state) {
    this.setState({state: state});
  }

  handleCountryChange(country) {
    this.setState({country: country});
  }

  handlePasswordChange(password) {
    const {validPassword} = this.state;

    this.setState({password});

    if (!validPassword) {
      if (password.length > 3) {
        // Password has to be at least 4 characters long
        this.setState({validPassword: true});
      }
    } else if (password < 3) {
      this.setState({validPassword: false});
    }

    //console.warn('password'+password);
  }

  handleConfirmPasswordChange(password) {
    const {validPassword} = this.state;

    this.setState({confirmPassword: password});

    if (!validPassword) {
      if (password.length > 3) {
        // Password has to be at least 4 characters long
        this.setState({validPassword: true});
      }
    } else if (password < 3) {
      this.setState({validPassword: false});
    }

    //console.warn('password'+password);
  }

  toggleNextButtonState() {
    const {password, confirmPassword} = this.state;
    if (password == confirmPassword) {
      return false;
    }
    
    return false;
  }

  render() {
    const {loadingVisible} = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
        <View style={styles.scrollViewWrapper}>
        <AlertDialog 
          visible={this.state.dialogVisible} 
          headerText={this.state.dialogHeaderText} 
          desciptionText={this.state.desciptionText}
          firstButtonLabel={this.state.firstButtonLabel}
          secondButtonlabel={this.state.secondButtonlabel}
          handleFirstButtonPress={()=>{ this.setState({dialogVisible: false}) }}
          handleSecondButtonPress={()=>{ this.setState({dialogVisible: false}) }}
        />
          <ScrollView>
            <View
              style={{
                //backgroundColor: 'rgba(46, 50, 72, 1)',
                marginTop: 0,
                alignItems: 'center',
              }}>
                <Text
            style={{
              color: colors.violet,
              fontSize: 26,
              marginBottom : 24,
              fontWeight: '300',
            }}>
            Create Account
          </Text>
              <Input
                leftIcon={
                  <Icon
                    name="user"
                    type="simple-line-icon"
                    color={colors.violet}
                    size={21}
                  />
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 24,
                  height: 44,
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                inputStyle={{fontSize: 16}}
                placeholder="Username"
                placeholderTextColor="#cccccc" 
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                ref={(input) => (this.usernameInput = input)}
                onChangeText={this.handleNameChange}
                onSubmitEditing={() => {
                  this.email2Input.focus();
                }}
              />
              <Input
                leftIcon={
                  <Icon
                    name="email-outline"
                    type="material-community"
                    color={colors.violet}
                    size={21}
                  />
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 24,
                  height: 44,
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                inputStyle={{fontSize: 16}}
                placeholder="Email"
                placeholderTextColor="#cccccc" 
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={this.handleEmailChange}
                returnKeyType="next"
                ref={(input) => (this.email2Input = input)}
                onSubmitEditing={() => {
                  this.password2Input.focus();
                }}
              />
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="simple-line-icon"
                    color={colors.violet}
                    size={21}
                  />
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 24,
                  height: 44,
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                inputStyle={{fontSize: 16}}
                placeholder="Password"
                placeholderTextColor="#cccccc" 
                autoCapitalize="none"
                secureTextEntry={true}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                onChangeText={this.handlePasswordChange}
                ref={(input) => (this.password2Input = input)}
                onSubmitEditing={() => {
                  this.confirmPassword2Input.focus();
                }}
              />
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="simple-line-icon"
                    color={colors.violet}
                    size={21}
                  />
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 24,
                  height: 44,
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                inputStyle={{fontSize: 16}}
                placeholder="Confirm Password"
                placeholderTextColor="#cccccc" 
                autoCapitalize="none"
                keyboardAppearance="light"
                onChangeText={this.handleConfirmPasswordChange}
                secureTextEntry={true}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                ref={(input) => (this.confirmPassword2Input = input)}
                onSubmitEditing={() => {
                  this.cityInput.focus();
                }}
              />
              <Input
                leftIcon={
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    color={colors.violet}
                    style={{padding: 6}}
                    size={21}
                  />
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 24,
                  height: 44,
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                inputStyle={{fontSize: 16}}
                placeholder="City"
                placeholderTextColor="#cccccc" 
                autoCapitalize="none"
                keyboardAppearance="light"
                autoCorrect={false}
                keyboardType="default"
                blurOnSubmit
                onChangeText={this.handleCityChange}
                returnKeyType="done"
                ref={(input) => (this.cityInput = input)}
                onSubmitEditing={() => {
                  this.stateInput.focus();
                }}
              />
              <Input
                leftIcon={
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    color={colors.violet}
                    style={{padding: 6}}
                    size={21}
                  />
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 24,
                  height: 44,
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                inputStyle={{fontSize: 16}}
                placeholder="State"
                placeholderTextColor="#cccccc" 
                autoCapitalize="none"
                keyboardAppearance="light"
                autoCorrect={false}
                keyboardType="default"
                blurOnSubmit
                onChangeText={this.handleStateChange}
                returnKeyType="done"
                ref={(input) => (this.stateInput = input)}
                onSubmitEditing={() => {
                  this.countryInput.focus();
                }}
              />
              <Input
                leftIcon={
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    color={colors.violet}
                    style={{padding: 6}}
                    size={21}
                  />
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 24,
                  height: 44,
                  marginBottom: 48,
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                inputStyle={{fontSize: 16}}
                placeholder="Country"
                placeholderTextColor="#cccccc" 
                autoCapitalize="none"
                keyboardAppearance="light"
                autoCorrect={false}
                keyboardType="default"
                blurOnSubmit
                onChangeText={this.handleCountryChange}
                returnKeyType="done"
                ref={(input) => (this.countryInput = input)}
              />
            </View>
          </ScrollView>
          <Loader modalVisible={loadingVisible} animationType="fade" />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}></View>
          <View style={styles.nextButtonWrapper}>
            <NextArrowButton
              //handleButtonPress={() => this.props.navigation.navigate('Search')}
              handleNextButton={this.handleNextButton}
              disabled={this.toggleNextButtonState()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewWrapper: {
    marginTop: 0,
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
  },
  avoidView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
  },
  forgetPasswordWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetPasswordText: {
    color: colors.green,
    fontSize: Platform.OS == 'ios' ? 16 : 16,
    textAlign: 'center',
    justifyContent: 'center',
  },
  signUpView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 60,
  },
  donthaveAccountText: {
    fontSize: Platform.OS == 'ios' ? 16 : 16,
    color: colors.dark_grey,
    fontWeight: Platform.OS == 'ios' ? '100' : '100',
    marginBottom: 32,
    textAlign: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: Platform.OS == 'ios' ? 16 : 16,
    color: colors.green,
    fontWeight: Platform.OS == 'ios' ? '100' : '100',
    marginBottom: 32,
    textAlign: 'center',
    justifyContent: 'center',
  },
  nextButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: -20,
    bottom: 0,
  },
});
