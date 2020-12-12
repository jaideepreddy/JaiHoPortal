import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import colors from './../styles/colors';
import InputField from './../components/InputField';
import NextArrowButton from './../components/NextArrowButton';
import NavBarButton from './../components/NavBarButton';
import BackIcon from 'react-native-vector-icons/FontAwesome';
import { Constants } from './../constants/Constants';
import Loader from './../components/Loader';
import AlertDialog from './../components/AlertDialog';
import DBPreference from './../utils/DBPReference';

const transparentHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0,
};

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      validEmail: false,
      emailAddress: '',
      password: '',
      validPassword: false,
      loadingVisible: false,
      dialogVisible: false,
      dialogHeaderText: '',
      desciptionText: '',
      firstButtonLabel: '',
      secondButtonlabel: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
  }

  handleNextButton() {
    this.setState({ loadingVisible: true });
    const { emailAddress, password } = this.state;
    console.warn('email'+emailAddress);
    console.warn('password'+password);
    fetch(Constants.JaiHo_URL_Endpoint + 'Login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: Constants.REQUEST_TIMEOUT_VALUE,
      body: JSON.stringify({
        email: emailAddress,
        password: password
      })
    }).then(response => {
        console.warn('response'+response);
        return response.json()
      }).then(responseJson => {
        var loginResponse = JSON.stringify(responseJson);
        console.warn('loginResponse '+loginResponse);
        this.setState({ loadingVisible: false });
        if(responseJson.errorHandler.success == "N"){
          this.setState({ dialogVisible: true,  
            dialogHeaderText: "Login Failed",
            desciptionText:"Invalid credentials", 
            firstButtonLabel: "Ok",
            });
        }else{
          global.USERNAME = responseJson.name;
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
              responseJson.name,
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
                responseJson.email,
                (error, result) => {
                    console.log(error);
                }
            );
            } catch (error) {
              console.error("Error saving data" + error);
            }
          this.props.navigation.navigate('Search', {username: responseJson.name});
        }
      })
      .catch((error) => {
        this.setState({ formValid: false, loadingVisible: false });
        console.warn(error);
        if(error == "TypeError: Network request failed"){
          this.setState({ dialogVisible: true,  
            dialogHeaderText: "There's no network connection",
            desciptionText:"Please check your internet connection and try again.", 
            firstButtonLabel: "Ok",
          });
        }else{
          this.setState({ dialogVisible: true,  dialogHeaderText: "Login Failed",desciptionText:"Invalid credentials", firstButtonLabel: "Ok",});
        }
        console.error(error);
      });
  }

  handleEmailChange(email) {
    // eslint-disable-next-line
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validEmail } = this.state;
    this.setState({ emailAddress: email });

    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({ validEmail: false });
    }
    //console.warn('email'+email);
  }

  handlePasswordChange(password) {
    const { validPassword } = this.state;

    this.setState({ password: password });

    if (!validPassword) {
      if (password.length > 3) {
        // Password has to be at least 4 characters long
        this.setState({ validPassword: true });
      }
    } else if (password < 3) {
      this.setState({ validPassword: false });
    }

    //console.warn('password'+password);
  }

  toggleNextButtonState() {
    const { validEmail, validPassword } = this.state;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  }

  render() {
    const {
      formValid, loadingVisible, validEmail, validPassword,
    } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
        
        <AlertDialog 
          visible={this.state.dialogVisible} 
          headerText={this.state.dialogHeaderText} 
          desciptionText={this.state.desciptionText}
          firstButtonLabel={this.state.firstButtonLabel}
          secondButtonlabel={this.state.secondButtonlabel}
          handleFirstButtonPress={()=>{ this.setState({dialogVisible: false}) }}
          handleSecondButtonPress={()=>{ this.setState({dialogVisible: false}) }}
        />
        <View style={styles.scrollViewWrapper}>
          <ScrollView>
            {/* <Text style={styles.loginHeader}>Login</Text> */}
            <View
              style={{
                //backgroundColor: 'rgba(46, 50, 72, 1)',
                display : 'flex',
                flex: 1,
                justifyContent: 'center', 
                alignContent : 'center',
                
                marginTop: 32,
                alignItems: 'center',
              }}>
            <Text
            style={{
              color: colors.violet,
              fontSize: 26,
              marginBottom : 24,
              fontWeight: '300',
              
            }}>
            Login
          </Text>
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
                  height: 42,
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
                  height: 42,
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
                  
                }}
              />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Forgot')}
              style={[colors.white, styles.forgetPasswordWrapper]}>
              <Text style={[colors.violet, styles.forgetPasswordText]}>
                Forget Password?
              </Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}></View>
          <View style={styles.nextButtonWrapper}>
            <View style={styles.signUpView}>
              <Text style={styles.donthaveAccountText}>
                Dont have an account?{' '}
              </Text>
              <Text style={styles.signUpText} onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>
            </View>
            <NextArrowButton
              // handleButtonPress={() => this.props.navigation.navigate('Search')}
              handleNextButton={this.handleNextButton}
              disabled={this.toggleNextButtonState()}
            />
          </View>
          <Loader
          modalVisible={loadingVisible}
          animationType="fade"
        />
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
    display:'flex',
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
  loginHeader: {
    fontSize: Platform.OS == 'ios' ? 28 : 24,
    color: colors.black,
    fontWeight: Platform.OS == 'ios' ? '300' : '100',
    marginBottom: 32,
  },
  forgetPasswordWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetPasswordText: {
    color: colors.violet,
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
    color: colors.violet,
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
