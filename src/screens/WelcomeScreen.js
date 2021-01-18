import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import colors from '../styles/colors';
import RoundedButton from './../components/RoundedButton';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.wrapper}>
          <ScrollView>
            <View style={styles.welcomeWrapper}>
              <Image
                style={styles.logo}
                source={require('./../images/jaiho_logo.png')}
              />
              <Text style={styles.welcomeText}>Welcome to JaiHo</Text>
              {/* <RoundedButton
                text="Connect to Google"
                textColor={colors.white}
                backgroundColor={colors.violet}
                icon={
                  <Icon name="google" size={18} style={styles.facebookIcon} />
                }
                onPress={() => null}
              /> */}
              <RoundedButton
                text="Create Account"
                textColor={colors.dark_grey}
                onPress={() => this.props.navigation.navigate('Signup')}
              />
              <RoundedButton
                text="Login"
                textColor={colors.dark_grey}
                onPress={() => this.props.navigation.navigate('Login')}
              />
              <TouchableOpacity
                style={styles.moreOptionsButton}
                onPress={() => this.props.navigation.navigate('Search')}>
                <Text style={styles.moreOptionsButtonText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.termsAndConditions}>
            <Text style={styles.termsText}>
              By tapping Login, Create Account or Maybe Later
            </Text>
            <Text style={styles.termsText}>{'options, '}</Text>
            <Text style={styles.termsText}>{" I agree to JaiHo's "}</Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>Terms of Service</Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>{', and '}</Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>Privacy Policy</Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>.</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    height: '100%',
  },
  welcomeWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    height: '100%',
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 140,
    marginTop: 0,
    marginBottom: 0,
  },
  welcomeText: {
    fontSize: 22,
    color: colors.violet,
    fontWeight: '200',
    marginTop: 8,
    marginBottom: 32,
  },
  facebookIcon: {
    color: colors.white,
    position: 'relative',
    paddingTop: 4,
    left: 20,
    zIndex: 8,
  },
  moreOptionsButton: {
    marginTop: 10,
  },
  moreOptionsButtonText: {
    color: colors.violet,
    fontSize: 16,
  },
  termsAndConditions: {
    justifyContent: 'flex-start',
    width: '94%',
    paddingLeft: 32,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 32,
    flexDirection: 'row',
    marginTop: 72,
  },
  termsText: {
    color: colors.light_grey,
    fontSize: 14,
    fontWeight: '600',
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light_grey,
  },
});
