import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Modal,
  PermissionsAndroid,
  FlatList,
  Linking,
  SafeAreaView
} from 'react-native';
import colors from './../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NavBarButton from './../components/NavBarButton';
import Categories from './../components/Categories';
import Listings from './../components/Listings';
import categoriesList from './../data/categories';
import listings from './../data/listings';
import SearchBar from './../components/SearchBar';
import InputField from './../components/InputField';
import OrgangeMicrophone from './../images/microphone_orange.png';
import VioletMicrophone from './../images/microphone_violet.png';
import RedMicrophone from './../images/microphone_red.png';
import BlueMicrophone from './../images/microphone_blue.png';
import Voice from 'react-native-voice';
import SpeechToText from 'react-native-google-speech-to-text';
import {Input, Icon, ListItem} from 'react-native-elements';
import IcoIcon from 'react-native-vector-icons/Ionicons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Axios from 'axios';
import Chevron from './../components/Chevron';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from './../components/Loader';

const requestAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "JaiHo Audio Permission",
        message:
          "JaiHo App needs access to your Audio to search.",
        buttonNegative: "Not Now",
        buttonPositive: "Allow"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //console.log("You can use the camera");
      //this.setState({isVisible: true});
      return true;
    } else {
      //console.log("Camera permission denied");
      return false;
    }
  } catch (err) {
    //console.warn(err);
  }
};

const items = [
  // this is the parent or 'item'
  // {
  //   name: 'Andhra Pradesh',
  //   id: 4,
  //   // these are the children or 'sub items'
  //   children: [
  //     {
  //       name: 'Chittor',
  //       id: 28,
  //     },
  //     {
  //       name: 'Kadapa',
  //       id: 29,
  //     },
  //     {
  //       name: 'Vijayawada',
  //       id: 30,
  //     },
  //     {
  //       name: 'Vizag',
  //       id: 31,
  //     },
  //   ],
  // },
  {
    name: 'Karnataka',
    id: 3,
    // these are the children or 'sub items'
    children: [
      // {
      //   name: 'Tumkur',
      //   id: 50,
      // },
      {
        name: 'Bangalore',
        id: 51,
      },
      // {
      //   name: 'Bangalore Rural',
      //   id: 52,
      // },
      // {
      //   name: 'Gokarna',
      //   id: 53,
      // },
      // {
      //   name: 'Hasan',
      //   id: 54,
      // },
    ],
  },
  // {
  //   name: 'Telangana',
  //   id: 0,
  //   // these are the children or 'sub items'
  //   children: [
  //     {
  //       name: 'Hyderabad',
  //       id: 10,
  //     },
  //     {
  //       name: 'Khammam',
  //       id: 17,
  //     },
  //     {
  //       name: 'Warangal',
  //       id: 13,
  //     },
  //     {
  //       name: 'Nizamabad',
  //       id: 14,
  //     },
  //     {
  //       name: 'Kama Reddy',
  //       id: 15,
  //     },
  //     {
  //       name: 'Sanga Reddy',
  //       id: 16,
  //     },
  //     {
  //       name: 'Medak',
  //       id: 16,
  //     },
  //     {
  //       name: 'Medchal',
  //       id: 16,
  //     },
  //     {
  //       name: 'Mahabudnagar',
  //       id: 16,
  //     },
  //     {
  //       name: 'Jedcharla',
  //       id: 16,
  //     },
  //     {
  //       name: 'Shadnagar',
  //       id: 16,
  //     },
  //   ],
  // },
  // {
  //   name: 'Maharastra',
  //   id: 1,
  //   // these are the children or 'sub items'
  //   children: [
  //     {
  //       name: 'Mumbai',
  //       id: 17,
  //     },
  //     {
  //       name: 'Shirdi',
  //       id: 18,
  //     },
  //     {
  //       name: 'Nanded',
  //       id: 19,
  //     },
  //     {
  //       name: 'Sagar',
  //       id: 20,
  //     },
  //     {
  //       name: 'Pune',
  //       id: 21,
  //     },
  //   ],
  // },
];

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteListings: [],
      isVisible: false,
      microphoneIcon: OrgangeMicrophone,
      microPhoneMessage: 'Speak now',
      failureText: '',
      inputText: '',
      inputValue: '',
      searchInput: '',
      selectedItems: 'Bangalore',
      searchResults: [],
      loadingVisible: false,
    };
    this.handleAddToFav = this.handleAddToFav.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.onCreateListClose = this.onCreateListClose.bind(this);
    this.handleDisplayModel = this.handleDisplayModel.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);

    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    //destroy the process after switching the screen 
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    // this.setState({
    //   started: '√',
    // });
  };

  speechToTextHandler = async () => {

    let speechToTextData = null;
    try {
      speechToTextData = await SpeechToText.startSpeech('Try saying something', 'en_US');
      console.log('speechToTextData: ', speechToTextData);
      this.setState({searchInput : speechToTextData});
    } catch (error) {
      console.log('error: ', error);
    }
  }

  onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    this.setState({ microphoneIcon: VioletMicrophone });
    this.setState({ microPhoneMessage: 'Listening..' });
    //this.onSpeechResults();
    // this.setState({
    //   end: '√',
    // });
  };

  onSpeechError = e => {
    //Invoked when an error occurs. 
    console.log('onSpeechError: ', e);
    // this.setState({
    //   error: JSON.stringify(e.error),
    // });
    this.setState({ microphoneIcon: BlueMicrophone });
    this.setState({ failureText: 'JaiHo could not hear what you just said' });
    this.setState({ microPhoneMessage: 'Tap to Seaerch' });
  };

  onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.warn('onSpeechResults: ', e);
    var results = JSON.stringify(e);

    if (e != 'undefined') {
      console.warn('results: ', e.value);
      this.setState({ failureText: e.value[0] });
      this.setState({ microPhoneMessage: 'Search results' });
      this.setState({ inputValue: e.value[0] });
    }

    setTimeout(() => {
      this.setState({ isVisible: false });
    }, 200);
    // this.setState({
    //   results: e.value,
    // });
  };

  onSpeechPartialResults = e => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    this.setState({ microphoneIcon: VioletMicrophone });
    this.setState({ microPhoneMessage: 'Listening..' });
    if (e != 'undefined') {
      console.warn('results: ', e.value);
      this.setState({ failureText: e.value });
    }
    // this.setState({
    //   partialResults: e.value,
    // });
  };

  onSpeechVolumeChanged = e => {
    //Invoked when pitch that is recognized changed
    //console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    // this.setState({
    //   pitch: '',
    //   error: '',
    //   started: '',
    //   results: [],
    //   partialResults: [],
    //   end: '',
    // });
    //console.warn('Started Recording');
    try {
      await Voice.start('en-US');
    } catch (e) {
      //eslint-disable-next-line
      //console.error('Error'+e);
    }
  };

  _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    // this.setState({
    //   pitch: '',
    //   error: '',
    //   started: '',
    //   results: [],
    //   partialResults: [],
    //   end: '',
    // });
  };

  handleAddToFav(listing) {
    const { navigate } = this.props.navigation;
    let { favouriteListings } = this.state;

    const index = favouriteListings.indexOf(listing.id);
    if (index > -1) {
      favouriteListings = favouriteListings.filter(
        (item) => item !== listing.id,
      );
      this.setState({ favouriteListings });
    } else {
      navigate('CreateList', {
        listing,
        onCreateListClose: this.onCreateListClose,
      });
    }
  }

  handleDisplayModel() {
    if (Platform.OS == "android") {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO).then((status) => {
        //console.warn("status"+status);
        if (status == true) {
          console.warn("status" + status);
          this.setState({ microPhoneMessage: 'Speak Now.!' });
          this.setState({ microphoneIcon: OrgangeMicrophone });
          this.setState({ isVisible: true });
          setTimeout(() => {
            this._startRecognizing();
          });
        } else {
          requestAudioPermission().then((status) => {
            if (status == true) {

              this.setState({ isVisible: true });
              this._startRecognizing();
            } else {
              //console.warn("status request permission "+status);
            }
          });
        }
      });
    } else {
      this.setState({ microPhoneMessage: 'Speak Now.!' });
      this.setState({ microphoneIcon: OrgangeMicrophone });
      this.setState({ isVisible: true });
      setTimeout(() => {
        this._startRecognizing();
      });
    }
  }

  handleStartRecognition() {

    this.setState({ microphoneIcon: OrgangeMicrophone });
    this.setState({ microPhoneMessage: 'Speak now' });
    this.setState({ failureText: '' });
    setTimeout(() => {
      this._startRecognizing();
    }, 100);
  }

  // handleEmailChange(email) {
  //   // eslint-disable-next-line
  //   const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   const { validEmail } = this.state;
  //   this.setState({ emailAddress: email });

  //   if (!validEmail) {
  //     if (emailCheckRegex.test(email)) {
  //       this.setState({ validEmail: true });
  //     }
  //   } else if (!emailCheckRegex.test(email)) {
  //     this.setState({ validEmail: false });
  //   }
  //   //console.warn('email'+email);
  // }

  onCreateListClose(listingId, listCreated) {
    let { favouriteListings } = this.state;
    if (listCreated) {
      favouriteListings.push(listingId);
    } else {
      favouriteListings = favouriteListings.filter(
        (item) => item !== listingId,
      );
    }
    this.setState({ favouriteListings });
  }

  handleSearchInputChange(input){
    this.setState({searchInput : input});
    this.getSearchResults(input);
  }

  getSearchResults(input){
    console.log('input '+ input);
    console.log('selectedItems '+ this.state.selectedItems);
    
    let elkURl = "https://elastic.jaiho.com/businessentity/_search?size=500";

    if(input.length == 0 || input == null){
      setTimeout(()=>{
        this.setState({ searchResults: []});
      }, 100);
    }else if(input.length > 4){
    return new Promise(async (resolve) => {
      this.setState({loadingVisible: true});
      let results = [];
      results = await Axios.post(elkURl,
        {
          "query": {
            "bool": {
              "must": [{
                "query_string": {
                  "query": input+'*'
                }
              },
              { "match": { "advcities": "Bangalore" } }]
            }
          }
        }
      );
      this.setState({ searchResults: results.data.hits.hits});
      this.setState({loadingVisible: false});
      console.log('Results '+JSON.stringify(results.data.hits.hits));
      resolve(results.data.hits.hits);
    })
  }
  }

  renderListings() {
    return listings.map((listing, index) => (
      <View key={`listing-${index}`} style={{position: 'absolute', bottom:2}}>
        <Listings
          key={`listing-item-${index}`}
          title={listing.title}
          boldTitle={listing.boldTitle}
          listings={listing.listings}
          showAddToFav={listing.showAddToFav}
          handleAddToFav={this.handleAddToFav}
          favouriteListings={this.state.favouriteListings}
        />
      </View>
    ));
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems: selectedItems});
  };

  launchJaiHoinWeb(){
    Linking.openURL('https://JaiHo.com/5100');
  }

  render() {
    const { navigate } = this.props.navigation;
    const renderItem = ({ item }) => (
      <Item title={item._source.entityname} subTitle= {item.subcategoryname}/>
    );

    const Item = ({ title, subTitle }) => (
      // <View style={styles.item}>
      //   <Text style={styles.title}>{title}</Text>
      //   <View style={{display: 'flex', justifyContent:'flex-end', alignContent: 'flex-end', alignItems:'flex-end'}}>
      //   <MaterialIcon
      //           name="mic"
      //           color={colors.violet}
      //           size={24}
      //         />
      //         </View>
      // </View>
      <View style={styles.item}>
      <ListItem
              //leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={title}
              subtitle={subTitle}
            />
            </View>
    );

    return (
      
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
        <SafeAreaView>
          <View style={{display: 'flex', }}>
          <View style={{display: 'flex', flexDirection:'row',}}>
          <View style={{display:'flex', flexDirection:'row' }}>
          <Loader modalVisible={this.state.loadingVisible} animationType="fade" />
          <TouchableOpacity onPress={() => this.launchJaiHoinWeb()} style={{display:'flex', flexDirection:'row', marginTop:8, marginBottom:8, marginRight:4 }}>
           <MaterialCommunityIcon
                    name="web"
                    
                    color={colors.violet}
                    style={{padding: 6, marginLeft: 8}}
                    size={21}
                  />
                
            <Text style={{paddingTop: 6}}>JaiHo.com</Text>
            </TouchableOpacity>
            </View>
             <View style={{position:'absolute', right:0, marginTop:8, marginBottom:8, marginRight:4 }}>
               <View style={{display:'flex', flexDirection:'row',}}>
           <Icon
                    name="map-marker"
                    type="font-awesome"
                    color={colors.violet}
                    style={{padding: 4}}
                    size={21}
                  />
        <SectionedMultiSelect
          iconRenderer={
            <MaterialIcon
              name={'keyboard-arrow-down'}
              size={24}
              color={colors.violet}
            />
          }
          single={true}
          showDropDowns={true}
          expandDropDowns={false}
          animateDropDowns={true}
          showChips={false}
          //hideSelect={true}
          hideConfirm={true}
          confirmText="Close"
          showCancelButton={false}
          searchPlaceholderText="Search City..."
          dropDownToggleIconUpComponent={
            <MaterialIcon
              name={'keyboard-arrow-down'}
              size={24}
              color={colors.violet}
            />
          }
          dropDownToggleIconDownComponent={
            <MaterialIcon
              name={'keyboard-arrow-right'}
              size={24}
              color={colors.violet}
            />
          }
          styles={{
            selectToggle: {
              width: 120,
              paddingLeft: 6,
              marginTop: 2,
              
            },
            searchBar: {
              paddingLeft:8,
              backgroundColor: '#e6e6e6',
            },
          }}
          searchIconComponent={
            <MaterialIcon
              name={'search'}
              size={24}
              color={colors.violet}
            />
          }
          selectToggleIconComponent={
            <MaterialIcon
              name={'keyboard-arrow-down'}
              size={24}
              color={colors.violet}
            />
          }
          //showCancelButton={true}
          modalWithTouchable={true}
          modalWithSafeAreaView={true}
          selectedIconComponent={
            <MaterialIcon
              name={'check'}
              size={16}
              color={colors.violet}
            />
          }
          items={items}
          uniqueKey="id"
          subKey="children"
          noResultsComponent={<Text style={{ textAlign: 'center', marginTop: 16, fontSize: 16 }}>Sorry, No Results</Text>}
          selectText="Bangalore"
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
        />
        </View>
      </View>
      </View>
      <View style={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
              <Image
                style={styles.logo}
                source={require('./../images/jaiho_logo.png')}
              />
              </View>
        {/* <SearchBar onHandleMic={() => this.speechToTextHandler()}
          onChangeText={() => this.handleSearchInput()}
          defaultValue={this.state.inputValue}
          inputValue={this.state.inputValue} /> */}

              <Input
                leftIcon={
                  <IcoIcon
                  name="ios-search"
                    color={colors.violet}
                    size={20}
                  />
                }
                rightIcon={
                  <TouchableOpacity onPress={() => this.speechToTextHandler()}
                  style={{ display: 'flex',
                            width: 48, 
                            height: 48,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                  <MaterialIcon
                name="mic"
                color={colors.violet}
                size={24}
              />
              </TouchableOpacity>
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 12,
                  height: 46,
                  marginTop: 8,
  	              marginLeft: 12,
                  marginRight: 12,
                  marginBottom: 0,
                }}
                leftIconContainerStyle={{
                  marginRight: 8,
                }}
                rightIconContainerStyle={{
                  marginRight: -8,
                }}
                value={this.state.searchInput}
                inputStyle={{fontSize: 16}}
                placeholder="Search JaiHo..."
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                ref={(input) => (this.usernameInput = input)}
                onChangeText={this.handleSearchInputChange}
                onSubmitEditing={() => {
                  //this.email2Input.focus();
                }}
              />
              <FlatList style={{marginBottom: 240}}
        data={this.state.searchResults}
        renderItem={({ item }) => (
          <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={item._source.businessname}
            subtitle={item._source.subcity}
            onPress={() => this.props.navigation.navigate('YellowPageDescription', {category : item._source})}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          />
        )}
        keyExtractor={item => item._id}
      />
          </View>

          
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() =>
            this.setState({ isVisible: !this.state.isVisible })
          }>
          {/*All views of Modal*/}
          <View style={styles.modal}>
            <Text style={styles.microphoneFailureText}>{this.state.failureText}</Text>
            <TouchableOpacity onPress={() => this.handleStartRecognition()}>
              <Image source={this.state.microphoneIcon}></Image>
            </TouchableOpacity>
            <Text style={styles.microphoneText}>{this.state.microPhoneMessage}</Text>
            {/* <Button title="Click To Close Modal" onPress = {() => {  
                  this.setState({ isVisible:!this.state.isVisible})}}/>   */}
          </View>
        </Modal>
        <View style={styles.scrollViewWrapper}>
        {/* {this.renderListings()} */}
          <ScrollView style={styles.scrollView}>
            {/* <Text style={styles.loginHeader}>Search</Text> */}
            
              
            {/* <View style={styles.searchContainer}>
              <TextInput
                autoCorrect={false}
                style={styles.searchInputStyles}
                placeholder="Search..."
                placeholderTextColor={colors.light_grey}
              />
              <MaterialIcon
                name="mic"
                color={colors.green}
                size={24}
                style={{padding: 8}}
              />
            </View> */}
            {/* <Text style={styles.heading}>Explore JaiHo</Text>
            <View style={styles.categories}>
              <Categories categories={categoriesList} />
            </View> */}
            {/* <View style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", alignContent: "flex-end"}}> */}
           
            {/* </View> */}
          </ScrollView>
        </View>
        </SafeAreaView>
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
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '84%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 40,
  },
  microphoneText: {
    color: colors.dark_gray,
    marginTop: 18,
    fontSize: 16,
    //fontFamily: 'sans-serif'
  },
  microphoneFailureText: {
    color: colors.dark_gray,
    marginTop: 18,
    fontSize: 16,
    //fontFamily: 'sans-serif',
    marginTop: -120,
    marginBottom: 120,
  },
  categories: {
    marginBottom: 40
  },
  scrollView: {
    marginTop: 0,
    display: 'flex',
    flex: 1,

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
  searchInputStyles: {
    flex: 1,
    fontSize: 18,
    fontWeight: '200',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    color: colors.dark_grey,
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#000',
    borderColor: colors.green,
  },
  logo: {
    display: 'flex',
    width: 160,
    height: 120,
    marginBottom: 0,
    marginTop: -16,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'center'
  },
  heading: {
    fontSize: 22,
    marginTop: 16,
    fontWeight: '600',
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.gray04,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.gray01,
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});
