import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar,
  } from 'react-native';
import DBPreference from './../utils/DBPReference';
import RootedSplashScreen from 'react-native-splash-screen';

export default class SplashScrren extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loginStatus: false,
        };
      }

    UNSAFE_componentWillMount() {
        this.getLoginStatus();
        RootedSplashScreen.show();
        setTimeout(() => {
            if(this.state.loginStatus == true){
                RootedSplashScreen.hide();
                this.props.navigation.navigate('Search');
            }else{
                RootedSplashScreen.hide();
                this.props.navigation.navigate('Welcome');
            }
        }, 200);
      }
      
      getLoginStatus(){
        DBPreference.retrieveData(
          DBPreference.LOGIN_STATUS,
          (error, result) => {
            console.warn(result);
            if(result == "true"){
              this.setState({ loginStatus: true});
            }else{
              this.setState({ loginStatus: false});
            }
          }
        );
      }
    

  render() {
    return (
        <ImageBackground
        style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={require('./../images/jaiho_logo.png')} style={{height: 240, width: 240}}/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: '#ffffff',
        marginTop: -120
      },
});
