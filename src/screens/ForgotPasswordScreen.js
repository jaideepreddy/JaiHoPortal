import React, {Component} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
//import { firebase } from '@react-native-firebase/auth';
import colors from './../styles/colors';
import InputField from './../components/InputField';
//import Notification from "../components/Notification";
import NextArrowButton from './../components/NextArrowButton';
import NavBarButton from './../components/NavBarButton';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      loadingVisible: true,
      formValid: true,
    };
  }
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTransparent: true,
    headerTintColor: colors.white,
  });
  submitEmail = () => {
    // firebase
    //   .auth()
    //   .sendPasswordResetEmail(this.state.email)
    //   .then(function () {
    //     this.props.navigation.navigate("Login");
    //   })
    //   .catch(function (error) {
    //     Alert.alert(error.message);
    //   });

    Alert.alert('email sent');
  };

  handleEmailChange = (email) => {
    this.setState({email: email});
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        style={styles.wrapper}>
        <NavBarButton
          handleButtonPress={() => this.props.navigation.goBack()}
          location="left"
          icon={<Icon name="angle-left" color={colors.green} size={38} />}
        />
        <View style={styles.form}>
          <Text style={styles.ForgotPasswordHeading}>
            Forgot your password?
          </Text>
          <Text style={styles.ForgotPasswordSubHeading}>
            Enter your email to find account.
          </Text>
          <InputField
            customStyle={{marginTop: 20}}
            textColor={colors.dark_grey}
            placeholderText="Email"
            labelText="EMAIL ADDRESS"
            labelTextSize={14}
            labelColor={colors.dark_grey}
            borderBottomColor={colors.green}
            inputType="email"
            onChangeText={email => this.handleEmailChange(email)}
          />
        </View>
        <View style={styles.nextButtonWrapper}>
          <NextArrowButton />
        </View>
        {/* <NextArrowButton handelPress={this.submitEmail} disabled={false} /> */}
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
  form: {
    marginTop: 54,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  ForgotPasswordHeading: {
    fontSize: 28,
    color: colors.dark_grey,
    fontWeight: '300',
  },
  ForgotPasswordSubHeading: {
    color: colors.light_grey,
    fontWeight: '600',
    fontSize: 15,
  },
});
