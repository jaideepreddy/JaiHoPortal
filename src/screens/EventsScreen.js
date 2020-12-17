import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  SafeAreaView,
  StatusBar
} from 'react-native';
import colors from './../styles/colors';
import {Input, Icon, ListItem} from 'react-native-elements';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Axios from 'axios';
import Loader from './../components/Loader';

export default class EventsScreen extends Component {

  constructor() {
    super();

    this.state = {
      eventsList : [],
      loadingVisible: true,
      showNoResults: false,
    }
  }

  getEventsCategory(){
    Axios.post("https://elastic.jaiho.com/eventscategory/_search?size=500")
      .then((data) => {
        //console.log("categoriess " + JSON.stringify(data.data.hits.hits));
        var tableData = data.data.hits.hits;
        var categoriess = [];
        var titleList = [];

        for (var i = 0; i < tableData.length; i++) {
          categoriess.push(tableData[i]._source);
        }

        for (var i = 0; i < categoriess.length; i++) {
          titleList.push(categoriess[i].title);
        }
        this.setState({ loadingVisible: false});
        this.setState({ showNoResults : true });
        console.log("categoriess " + JSON.stringify(categoriess));
        //setCategories(categoriess);
        this.setState({ eventsList: categoriess});
      })
      .catch(() => {});
  }

  getEvents(){
    console.log('id '+ id);
    Axios.post("https://elastic.jaiho.com/businessentity/_search?size=500", {
      query: {
        bool: {
          must: [
            {
              match: {
                cityid: 1,
              },
            },
            { match: { recordtype: eventType } },
          ],
        },
      },
    })
      .then((data) => {
       
        console.log("events " + JSON.stringify(data.data.hits.hits));
        var tableData = data.data.hits.hits;
        var categoriesLists = [];
        var eventsData = [];

        for (var i = 0; i < tableData.length; i++) {
          eventsData.push(tableData[i]._source);
        }

        for (var i = 0; i < eventsData.length; i++) {
          if (!categoriesLists.includes(eventsData[i].categoryid)) {
            categoriesLists.push(eventsData[i].categoryid);
          }
        }

        var categoryEvents = [];
        eventsData.map((catEvent) => {
        if (catEvent.category == title) {
          categoryEvents.push(catEvent);
        }
        });
        console.log("categoriesLists " + JSON.stringify(categoriesLists));
        console.log("eventsData " + JSON.stringify(eventsData));
        
        setcategoriesList(categoriesLists);
        setEvents(eventsData);
      })
      .catch(() => {});
  }

  componentDidMount() {
    
    this.getEventsCategory();
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
          <SafeAreaView style={{backgroundColor: colors.violet, marginBottom: 48}}>
          <Card style={{ display:'flex', width:'100%'}}>
            <Card.Title title="Events" style={{backgroundColor:colors.violet,}} titleStyle={{color:colors.white}}/>
          </Card>
          
          <ScrollView style={{display:'flex', height: '100%', backgroundColor: colors.white, }}>
          <Loader modalVisible={this.state.loadingVisible} animationType="fade" />
          { this.state.showNoResults ? 
          this.state.eventsList.length > 1 ? 
          this.state.eventsList
              .sort(function(a, b) {
                if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
            }).map((category) => 
          <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={category.title}
            subtitle={'Bangalore'}
            onPress={() => this.props.navigation.navigate('EventsDescriptionPage',{category:category.title})}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          />
          )
          : 
          
          <Text style={{alignContent: 'center', textAlign:'center', fontSize:18}}>
            Sorry! No Results Found
          </Text> 
            : null
        }
          {/* <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={'Movies'}
            subtitle={'Bangalore'}
            onPress={() => this.props.navigation.navigate('EventsDescriptionPage',{category:'Movies'})}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          />
          <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={'Music'}
            subtitle={'Bangalore'}
            onPress={() => this.props.navigation.navigate('EventsDescriptionPage',{category:'Music'})}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          />
          <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={'Sports'}
            subtitle={'Bangalore'}
            onPress={() => this.props.navigation.navigate('EventsDescriptionPage',{category:'Sports'})}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          />
          <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={'Other'}
            subtitle={'Bangalore'}
            onPress={() => this.props.navigation.navigate('EventsDescriptionPage',{category:'Other'})}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          /> */}
          </ScrollView>
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
  loginHeader: {
    fontSize: Platform.OS == 'ios' ? 28 : 24,
    color: colors.black,
    fontWeight: Platform.OS == 'ios' ? '300' : '100',
    marginBottom: 32,
  },
});
