import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
} from 'react-native';
import colors from './../styles/colors';
import {Input, Icon, ListItem} from 'react-native-elements';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default class EventPageDescription extends Component {

    constructor() {
        super();
    
        this.state = {
         
        }
        
    }

    componentDidMount() {
        const { category } = this.props.route.params;
        console.log('category '+JSON.stringify(category));
        this.props.navigation.setOptions({
          title: '',
        })
        //this.getEntityResults(subCategoryId);
      }
  render() {
    const { category } = this.props.route.params;
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
          <ScrollView style={styles.scrollView}>
         
          {/* <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={category.entityname}
            subtitle={'Bangalore'}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          /> */}
          <Card style={{ elevation:4 , borderColor:colors.violet, backgroundColor: colors.gray01,}}>
          <Card.Cover source={require('./../images/profile_background.jpg')} style={{height: 160}}/>
    <Card.Content style={{marginTop: 18}}>
        <Title>{category.businessname}</Title>
        <Paragraph>{category.shortdescription}</Paragraph>
    </Card.Content>
   
  </Card>
  <View style={{marginTop: 24, marginBottom: 48}}>
          <Card.Content >
      <Title>Address</Title>
      <Paragraph>{category.address}</Paragraph>
    </Card.Content>
    <Card.Content >
      <Title>Contact</Title>
        <Paragraph>Phone: {category.phone}</Paragraph>
        <Paragraph>Mobile: {category.mobile}</Paragraph>
      <Paragraph>Email: {category.email}</Paragraph>
      <Paragraph>Fax: {category.fax}</Paragraph>
    </Card.Content>
    <Card.Content >
      <Title>Website</Title>
      <Paragraph>https://jaiho.com</Paragraph>
    </Card.Content>
    </View>
          
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
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 48,
  },

  scrollView:{
    paddingLeft: 24,
    paddingRight: 24,
  },
  avoidView: {
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  loginHeader: {
    fontSize: Platform.OS == 'ios' ? 28 : 24,
    color: colors.black,
    fontWeight: Platform.OS == 'ios' ? '300' : '100',
    marginBottom: 32,
  },
});
