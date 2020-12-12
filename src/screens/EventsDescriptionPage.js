import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  ImageBackground,
  Image
} from 'react-native';
import colors from './../styles/colors';
import StoryItems from './../components/StoryItems';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Axios from 'axios';
import {Input, Icon, ListItem} from 'react-native-elements';
import Loader from './../components/Loader';

export default class EventsDescriptionPage extends Component {

    constructor() {
        super();
    
        this.state = {
          eventsList: [],
          category: '',
          loadingVisible: true,
          showNoResults: false,
        }
        
    }

    getEvents(){
      //console.log('id '+ id);
      Axios.post("https://elastic.jaiho.com/businessentity/_search?size=500", {
        query: {
          bool: {
            must: [
              {
                match: {
                  cityid: 1,
                },
              },
              { match: { recordtype: "Event" } },
            ],
          },
        },
      })
        .then((data) => {
          //console.log("events " + JSON.stringify(data.data.hits.hits));
          var tableData = data.data.hits.hits;
          var categoriesLists = [];
          var eventsData = [];
          
          for (var i = 0; i < tableData.length; i++) {
            eventsData.push(tableData[i]._source);
          }
  
          for (var i = 0; i < eventsData.length; i++) {
            console.log('category event'+eventsData[i].category);
            if (eventsData[i].category == this.state.category) {
              categoriesLists.push(eventsData[i]);
            }else if(this.state.category == "All"){
              categoriesLists.push(eventsData[i]);
            }
          }
          console.log("categoriesLists " + JSON.stringify(categoriesLists));
          //console.log("eventsData " + JSON.stringify(eventsData));
          this.setState({eventsList: categoriesLists});
          this.setState({ loadingVisible: false});
          this.setState({ showNoResults : true });
          // setcategoriesList(categoriesLists);
          // setEvents(eventsData);
        })
        .catch(() => {});
    }

    componentDidMount() {
        const { category } = this.props.route.params;
        console.log('category '+JSON.stringify(category));
        this.props.navigation.setOptions({
          title: category,
        })
        this.setState({category: category});
        this.getEvents();
      }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
          <ScrollView>
          
          <Loader modalVisible={this.state.loadingVisible} animationType="fade" />
          { this.state.showNoResults ? 
          this.state.eventsList.length >= 1 ? 
            this.state.eventsList.map((item, key) =>
              (
                
                <View style={{ 
                  borderBottomWidth: 0.9, 
                  borderBottomColor: colors.gray05,
                  
                  }}>
          <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={item.businessname}
            subtitle={'Bangalore'}
            onPress={() => this.props.navigation.navigate('EventPageDescription', {category : item})}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          />
          </View>
         
          )) : 
      //     <ImageBackground
      //   style={styles.container}>
        
      //   <Image source={require('./../images/noresults.png')} />
      // </ImageBackground>
      //     : 
          
          <Text style={{alignContent: 'center', textAlign:'center', fontSize:18, marginTop: 24}}>
            Sorry! No Results Found
          </Text> 
            : null
        }
          
          {/* {this.state.eventsList.map((events)=>
          
            <View style={{padding :16}}>
          <Card style={{ elevation:4 , borderColor:colors.violet, backgroundColor: colors.gray01,}}>
          <Card.Cover source={require('./../images/profile_background.jpg')} style={{height: 160}}/>
    <Card.Content >
      <Title>{events.businessname}</Title>
      <Paragraph>{events.address}</Paragraph>
      <Paragraph>{new Date(events.eventstarttime).getMonth()+ ' '+new Date(events.eventstarttime).getDate()}</Paragraph>
          <Paragraph>{events.mobile}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Book</Button>
      </Card.Actions>
   
  </Card>
  </View>

          )} */}
           </ScrollView>
  
         
         
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
    marginTop: 32,
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
  marginContainer: {
    marginTop: 16
  },
  storiesContainer: {
    flexDirection: 'row'
  },
  loginHeader: {
    fontSize: Platform.OS == 'ios' ? 28 : 24,
    color: colors.black,
    fontWeight: Platform.OS == 'ios' ? '300' : '100',
    marginBottom: 32,
  },
  container: {
    display:'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: '#ffffff',
    marginTop: 240,
  },
});
