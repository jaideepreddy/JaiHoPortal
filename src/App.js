/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton, HeaderTitle} from '@react-navigation/stack';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignUpScreen from './screens/SignUpScreen';
import SearchScreen from './screens/SearchScreen';
import YellowpagesScreen from './screens/YellowPagesScreen';
import EventsScreen from './screens/EventsScreen';
import ProfileScreen from './screens/ProfilePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from './styles/colors';
import {DrawerContent} from './components/DrawerContent';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsScreen from './screens/NewsScreen';
import {DrawerActions} from '@react-navigation/native';
import YellowPageDetails from './screens/YellowPageDetails';
import YellowPageDescription from './screens/YellowPageDescription';
import EventPageDescription from './screens/EventPageDescription';
import EventsDescriptionPage from './screens/EventsDescriptionPage';
import RootedSplashScreen from 'react-native-splash-screen';
import DBPreference from './utils/DBPReference';
import { color } from 'react-native-reanimated';

import {Icon} from 'react-native-elements';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function SearchScreenDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
      <Drawer.Screen name="Search" component={SearchScreen} />
      
    </Drawer.Navigator>
  );
}

function Search() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
            return (
              <IonIcon
                style={{marginTop: 8}}
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle';
            return (
              <MaterialIcon
                style={{marginTop: 8}}
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'YellowPages') {
            iconName = focused ? 'bookmark-outline' : 'bookmark-outline';
            return (
              <MaterialCommunityIcon
                //style={{marginTop: 8}}
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Events') {
            iconName = focused ? 'event' : 'event';
            return (
              <MaterialIcon
                style={{marginTop: 8}}
                name={iconName}
                size={size}
                color={color}
              />
            );
          }else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
            return (
              <IonIcon
                style={{marginTop: 8}}
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarLabel: ({focused, color, size}) => {
          let labelName;
          if (route.name === 'Search') {
            labelName = 'Search';
          } else if (route.name === 'Profile') {
            labelName = 'Profile';
          } else if (route.name === 'YellowPages') {
            labelName = 'Yellow Pages';
          } else if (route.name === 'Events') {
            labelName = 'Events';
          } else if (route.name === 'News') {
            labelName = 'News';
          }

          return (
            <Text
              style={{
                fontSize: 12,
                marginBottom: 4,
                //marginTop: 4,
                color: color,
              }}
              color={color}>
              {labelName}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.violet,
        inactiveTintColor: colors.dark_grey,
        tabStyle: {height: 50, alignItems: 'center', justifyContent: 'center'},
      }}>
      <Tab.Screen name="Search" component={SearchScreenDrawer} />
      <Tab.Screen name="YellowPages" component={YellowpagesScreen} screenOptions={{
    headerShown: false
  }}/>
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

class NavigationDrawerStructure extends React.Component {

  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.props.navigationProps.dispatch(DrawerActions.toggleDrawer())}>
          {/*Donute Button Image */}
          <MaterialIcon
              name="menu"
              color={colors.violet}
              size={28}
              style={{marginTop: 14, marginLeft: 12}}
            />
        </TouchableOpacity>
      </View>
    );
  }
}

const navigationOptionsWithBackButton = ({navigation}) => ({
  gesturesEnabled: true,
  //title: 'Entertainment',
  //headerTintColor: 'white',
  headerStyle: {
     //backgroundColor: ,
     elevation: 0,
     shadowOpacity: 0, 
  },
  headerLeft:() => (
    <SafeAreaView>
      <TouchableOpacity onPress={() => {
        if(navigation.state!=null && navigation.state!= undefined && navigation.state.params!=null && navigation.state.params!=undefined && navigation.state.params.returnData!=undefined){
          navigation.state.params.returnData(false);
        }
        navigation.goBack();

      }}>
        <View
          style={{flexDirection: 'row', paddingLeft: 16, alignItems: 'center'}}
        >
          <IonIcon
                style={{marginTop: 4}}
                name='arrow-back-outline'
                size= {26}
                color={colors.violet}
              />
          
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  ),
});

const navigationOptions = ({navigation}) => ({
  gesturesEnabled: true,
  // title: '',
  headerLeft: null,
  headerTintColor: 'white',
  headerStyle: {
     backgroundColor: 'white',
     elevation: 0,
     shadowOpacity: 0, 
  },
  
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: 'Bangalore',
      loginStatus: false,
      loadScreen: false,
    };
   
  }

  componentDidMount(){
    //RootedSplashScreen.show();
    DBPreference.retrieveData(
      DBPreference.LOGIN_STATUS,
      (error, result) => {
        console.warn(result);
        if(result == "true"){
          this.setState({ loadScreen: true});
          this.setState({ loginStatus: true});
          RootedSplashScreen.hide();
        }else{
          this.setState({ loadScreen: true});
          this.setState({ loginStatus: false});
          RootedSplashScreen.hide();
        }
      }
    );
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems: selectedItems});
  };

  render() {
   
    return (
      this.state.loadScreen == true ?
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={this.state.loginStatus == true ? "Search": "Welcome"}
          headerMode="screen"
          screenOptions={{headerShown: true}}>
          <Stack.Screen name="Splash" component={SplashScreen} options={navigationOptions}/>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={navigationOptions}/>
          <Stack.Screen name="Login" component={LoginScreen} options={navigationOptionsWithBackButton}/>
          <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={navigationOptionsWithBackButton}/>
          <Stack.Screen name="Signup" component={SignUpScreen} options={navigationOptionsWithBackButton}/>
          <Stack.Screen name="YellowPageDetails" component={YellowPageDetails} options={navigationOptionsWithBackButton}/>
          <Stack.Screen name="YellowPageDescription" component={YellowPageDescription} options={navigationOptionsWithBackButton}/>
          <Stack.Screen name="EventsDescriptionPage" component={EventsDescriptionPage} options={navigationOptionsWithBackButton}/>
          <Stack.Screen name="EventPageDescription" component={EventPageDescription} options={navigationOptionsWithBackButton}/>
          <Stack.Screen name="Search" component={Search} 
          options={({navigation}) => ({
          header:() => null
          // headerLeft: () => (
          //   <NavigationDrawerStructure navigationProps={navigation} />
          // ),
      //     headerRight: () => {
      //   return(
      //   <View style={{display:'flex', flexDirection:'row'}}>
      //     <Icon
      //               name="map-marker"
      //               type="font-awesome"
      //               color={colors.violet}
      //               style={{padding: 6}}
      //               size={21}
      //             />
      //   <SectionedMultiSelect
      //     //iconRenderer={this.icon}
      //     single={true}
      //     showDropDowns={true}
      //     expandDropDowns={false}
      //     animateDropDowns={true}
      //     showChips={false}
      //     //hideSelect={true}
      //     hideConfirm={true}
      //     confirmText="Close"
      //     showCancelButton={false}
      //     searchPlaceholderText="Search City..."
      //     dropDownToggleIconUpComponent={
      //       <MaterialIcon
      //         name={'keyboard-arrow-down'}
      //         size={24}
      //         color={colors.violet}
      //       />
      //     }
      //     dropDownToggleIconDownComponent={
      //       <MaterialIcon
      //         name={'keyboard-arrow-right'}
      //         size={24}
      //         color={colors.violet}
      //       />
      //     }
      //     styles={{
      //       selectToggle: {
      //         width: 120,
      //         paddingLeft: 6,
      //         marginTop: 4,
              
      //       },
      //       searchBar: {
      //         paddingLeft:8,
      //         backgroundColor: '#e6e6e6',
      //       },
      //     }}
      //     searchIconComponent={
      //       <MaterialIcon
      //         name={'search'}
      //         size={24}
      //         color={colors.violet}
      //       />
      //     }
      //     selectToggleIconComponent={
      //       <MaterialIcon
      //         name={'keyboard-arrow-down'}
      //         size={24}
      //         color={colors.violet}
      //       />
      //     }
      //     //showCancelButton={true}
      //     modalWithTouchable={true}
      //     modalWithSafeAreaView={true}
      //     selectedIconComponent={
      //       <MaterialIcon
      //         name={'check'}
      //         size={16}
      //         color={colors.violet}
      //       />
      //     }
      //     items={items}
      //     uniqueKey="id"
      //     subKey="children"
      //     noResultsComponent={<Text style={{ textAlign: 'center', marginTop: 16, fontSize: 16 }}>Sorry, No Workspaces</Text>}
      //     selectText="Bangalore"
      //     readOnlyHeadings={true}
      //     onSelectedItemsChange={this.onSelectedItemsChange}
      //     selectedItems={this.state.selectedItems}
      //   />
      // </View>)
      //     },
      //     headerTintColor: 'white',
      //     headerStyle: {
      //       backgroundColor: 'white',
      //       elevation: 0,
      //       shadowOpacity: 0, 
      //     },
          
          
          
          
        })}/>
        </Stack.Navigator>
      </NavigationContainer>
      : <ImageBackground
          style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Image source={require('./images/jaiho_logo.png')} style={{height: 240, width: 240}}/>
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

const Stack = createStackNavigator();
