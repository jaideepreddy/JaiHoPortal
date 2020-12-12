import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  Linking,
  SafeAreaView
} from 'react-native';
import colors from './../styles/colors';
import StoryItems from './../components/StoryItems';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Axios from 'axios';
import Loader from './../components/Loader';

export default class NewsScreen extends Component {

  constructor() {
    super();
    this.state = {
      newsList: [],
      loadingVisible: true,
    }
  }

  getNewsList(){
    Axios.post("https://elastic.jaiho.com/news/_search?size=500", 
    {
      "query": {
        "match": {
          "countryid": 1
        }
      }
    }).then((data) => {
      this.setState({loadingVisible: false });
        console.log('news data'+JSON.stringify(data.data.hits.hits));
        this.setState({ newsList: data.data.hits.hits });
    }).catch(() => {});
  }

  componentDidMount() {
    console.log('news');
    this.getNewsList();
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
           <SafeAreaView style={{backgroundColor: colors.violet, marginBottom: 48}}>
          <Card style={{ display:'flex', width:'100%'}}>
            <Card.Title title="News" style={{backgroundColor:colors.violet,}} titleStyle={{color:colors.white}}/>
          </Card>
          <Loader modalVisible={this.state.loadingVisible} animationType="fade" />
          <ScrollView style={styles.scrollView}>
          {this.state.newsList.map((news,key)=>
          <View style={{padding :8}}>
          <Card style={{ elevation:32 , borderColor:colors.violet, backgroundColor: colors.gray01,}}
          onPress={() => Linking.openURL(news._source.url)}>
          {/* <Card.Cover source={news.imagename} style={{height: 96}}/>  */}
    <Card.Content >
          <Title>{news._source.title}</Title>
      <Paragraph>{news._source.statename == null ? "India" : news._source.statename}</Paragraph>
    </Card.Content>
   
  </Card>
  </View>
  )}
  
  
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
});
