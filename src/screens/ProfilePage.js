import React, { Component } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

import BaseIcon from './../components/BaseIcon';
import Chevron from './../components/Chevron';
import InfoText from './../components/InfoText';
import Colors from './../styles/colors';
import DBPreference from './../utils/DBPReference';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    display:'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginTop: 16,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
})

class SettingsScreen extends Component {
  // static propTypes = {
  //   avatar: '',
  //   name: '',
  //   navigation: '',
  //   emails: [],
  // }

  // state = {
  //   pushNotifications: true,
  // }

  // onPressSetting = () => {
  //   //this.props.navigation.navigate('Options')
  // }

  // onChangePushNotifications = () => {
  //   this.setState(state => ({
  //     pushNotifications: !state.pushNotifications,
  //   }))
  // }

  constructor(props) {
    super(props);
    this.state = {
      userName : '',
      emailAddress: '',
      loginStatus: false,
    };
  }

  handleLogout() {
    DBPreference.setStoredData(
        DBPreference.LOGIN_STATUS,
        "false",
        (error, result) => {
            console.log(error);
        }
    );

    DBPreference.setStoredData(
      DBPreference.USER_NAME,
      "",
      (error, result) => {
          console.log(error);
      }
  );

  DBPreference.setStoredData(
    DBPreference.EMAIL_ADDRESS,
    "",
    (error, result) => {
        console.log(error);
    }
);
    setTimeout(()=>{
        this.props.navigation.navigate('Welcome');
    },200);
    
}

getUsernameAndEmail(){
  DBPreference.retrieveData(
    DBPreference.USER_NAME,
    (error, result) => {
      console.warn(result);
        this.setState({ userName: result});
    }
  );

  DBPreference.retrieveData(
    DBPreference.EMAIL_ADDRESS,
    (error, result) => {
      console.warn(result);
      this.setState({ emailAddress: result});
    }
  );

  DBPreference.retrieveData(
    DBPreference.LOGIN_STATUS,
    (error, result) => {
      console.warn(result);
      if(result == "true"){
        this.setState({ loginStatus: true});
      }else {
        this.setState({ loginStatus: false});
      }
      
    }
  );
  
}

  componentDidMount(){
    this.getUsernameAndEmail();
  }

  render() {
    
    return (
      <ScrollView style={styles.scroll}>
        {this.state.loginStatus == false ? null : 
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={require('./../images/profile_background.jpg')}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{this.state.userName}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {this.state.emailAddress}
            </Text>
          </View>
          
        </View>
        }
        <InfoText text="Account" />
        <View>
        {/* <ListItem
            hideChevron
            title="Edit Profile"
            containerStyle={styles.listItemContainer}
            rightIcon={<Chevron />}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: Colors.violet,
                }}
                icon={{
                  type: 'material',
                  name: 'edit',
                }}
              />
            }
          /> */}
          {/* <ListItem
            hideChevron
            title="Push Notifications"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                onValueChange={this.onChangePushNotifications}
                //value={this.state.pushNotifications}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: Colors.violet,
                }}
                icon={{
                  type: 'material',
                  name: 'notifications',
                }}
              />
            }
          /> */}

          {/* <ListItem
            // chevron
            title="Dark Theme"
            
            rightTitleStyle={{ fontSize: 15 }}
            // onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                onValueChange={this.onChangePushNotifications}
                //value={this.state.pushNotifications}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: Colors.violet, }}
                icon={{
                  type: 'font-awesome',
                  name: 'lightbulb-o',
                }}
              />
            }
            
          /> */}
          <ListItem
            title="Country"
            rightTitle="India"
            rightTitleStyle={{ fontSize: 15 }}
            // onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: Colors.violet, }}
                icon={{
                  type: 'material',
                  name: 'place',
                }}
              />
            }
            //rightIcon={<Chevron />}
          />
          <ListItem
            title="Language"
            rightTitle="English"
            rightTitleStyle={{ fontSize: 15 }}
            // onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: Colors.violet, }}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
            //rightIcon={<Chevron />}
          />
        </View>
        {this.state.loginStatus == false ? null :
        <View>
        <InfoText text="Others" />
        <View>
          <ListItem
            title="Log out"
            onPress={this.handleLogout.bind(this)}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: Colors.violet, }}
                icon={{
                  type: 'materialcommunityicons',
                  name: 'exit-to-app',
                }}
              />
            }
          />
          </View>
          </View>
        }
        <InfoText text="More" />
        <View>
          <ListItem
            title="About US"
            // onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: Colors.violet, }}
                icon={{
                  type: 'ionicon',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Terms and Policies"
            //onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: Colors.violet, }}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Share our App"
            //onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: Colors.violet,
                }}
                icon={{
                  type: 'entypo',
                  name: 'share',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Rate Us"
            //onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: Colors.violet,
                }}
                icon={{
                  type: 'entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          {/* <ListItem
            title="Send FeedBack"
            //onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            badge={{
              value: 999,
              textStyle: { fontSize: 14, color: 'white' },
            }}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: Colors.violet,
                }}
                icon={{
                  type: 'materialicon',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          /> */}
        </View>
      </ScrollView>
    )
  }
}

export default SettingsScreen