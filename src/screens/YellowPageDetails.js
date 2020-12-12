import React, { Component } from 'react';
 
import { Alert, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity, Platform, Image, ImageBackground } from 'react-native';
import Colors from './../styles/colors';
import ChevronOnCondition from './../components/ChevronOnCondition';
import BaseIcon from './../components/BaseIcon';
import Axios from 'axios';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import colors from './../styles/colors';
import {Input, Icon, ListItem} from 'react-native-elements';
import Loader from './../components/Loader';
 
const LeftContent = props => <Avatar.Icon {...props} title={props.title} backgroundColor={colors.violet}/>

class Expandable_ListView extends Component {
 
  constructor() {
 
    super();
 
    this.state = {
 
      layout_Height: 0,
      loadingVisible: true,
      showNoResults: false,
 
    }
  }
  
 
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.expanded) {
      this.setState(() => {
        return {
          layout_Height: null
        }
      });
    }
    else {
      this.setState(() => {
        return {
          layout_Height: 0
        }
      });
    }
  }
 
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layout_Height !== nextState.layout_Height) {
      return true;
    }
    return false;
  }
 
  show_Selected_Category = (item) => {
 
    // Write your code here which you want to execute on sub category selection.
    Alert.alert(item);
 
  }
 
  render() {
    return (
      <View style={styles.Panel_Holder}>
 
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickFunction} style={styles.category_View}>
        <View style={{ display:'flex', flexDirection: 'row'}}>
        {/*     <View style={{display:'flex', justifyContent:'center', }}>
          <BaseIcon
                containerStyle={{ backgroundColor: Colors.violet, }}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
          </View>
              <Text style={styles.category_Text}>{this.props.item.category_Name} </Text>
              </View>
              <View style={{ display:'flex',alignContent:'flex-start' }}>
          
          </View>
          
          <View style={styles.iconStyle}>
           <ChevronOnCondition name={'chevron-right'}/>
          </View>*/}
        

<Card style={{ display:'flex', width:'100%'}}>
    <Card.Title title="Ramesh Hospital" subtitle="Card Subtitle" style={{backgroundColor:'#cccccc', borderRadius:8,}}
    left={(props) => (<Avatar.Icon title={'M'} size={42}
                      rounded backgroundColor={colors.violet}/>)} />
                      </Card>
                      </View>
                      </TouchableOpacity> 
        <View style={{ height: this.state.layout_Height, overflow: 'hidden' }}>
 
          
 
              <Card style={{marginBottom: 8,elevation:4 ,borderWidth:1, borderColor:colors.violet, backgroundColor: colors.gray06,}}>
    
    <Card.Content >
      <Title>Address</Title>
      <Paragraph>Address</Paragraph>
      <Title>Contact</Title>
      <Paragraph>Phone: </Paragraph>
      <Paragraph>Mobile: </Paragraph>
      <Paragraph>Email: </Paragraph>
      <Paragraph>Fax: </Paragraph>
      <Title>Website</Title>
      <Paragraph>website </Paragraph>
    </Card.Content>
    {/* <Card.Cover source={require('./../images/profile_background.jpg')} /> */}
  </Card>
 
          
          
 
        </View>
 
      </View>
 
    );
  }
}
 
export default class YellowPagesScreen extends Component {

  
 
  constructor() {
    super();

    this.state = {
      arrowPressed : false,
      categoryResults : [],
    }
 
    if (Platform.OS === 'android') {
 
      UIManager.setLayoutAnimationEnabledExperimental(true)
 
    }

 
    // const array = [
 
    //   {
    //     expanded: false, category_Name: "Airport Taxi", sub_Category: [{ id: 1, name: 'Mi' }, { id: 2, name: 'RealMe' }, { id: 3, name: 'Samsung' },
    //     { id: 4, name: 'Infinix' }, { id: 5, name: 'Oppo' }, { id: 6, name: 'Apple' }, { id: 7, name: 'Honor' }]
    //   },
 
    //   {
    //     expanded: false, category_Name: "Travel insurance", sub_Category: [{ id: 8, name: 'Dell' }, { id: 9, name: 'MAC' }, { id: 10, name: 'HP' },
    //     { id: 11, name: 'ASUS' }]
    //   },
 
    //   {
    //     expanded: false, category_Name: "Hotels & Resorts", sub_Category: [{ id: 12, name: 'Pendrive' }, { id: 13, name: 'Bag' },
    //     { id: 14, name: 'Mouse' }, { id: 15, name: 'Keyboard' }]
    //   },
 
    //   {
    //     expanded: false, category_Name: "Travel Agents", sub_Category: [{ id: 16, name: 'Home Audio Speakers' },
    //     { id: 17, name: 'Home Theatres' }, { id: 18, name: 'Bluetooth Speakers' }, { id: 19, name: 'DTH Set Top Box' }]
    //   },
 
    //   {
    //     expanded: false, category_Name: "Zoom car", sub_Category: [{ id: 20, name: 'Mi' },
    //     { id: 21, name: 'Thomson' }, { id: 22, name: 'LG' }, { id: 23, name: 'SONY' }]
    //   },
 
    //   {
    //     expanded: false, category_Name: "Make my trip", sub_Category: [{ id: 24, name: 'Microwave Ovens' },
    //     { id: 25, name: 'Oven Toaster Grills (OTG)' }, { id: 26, name: 'Juicer/Mixer/Grinder' }, { id: 27, name: 'Electric Kettle' }]
    //   }
    // ];
 
    // this.state = { AccordionData: [...array] }
  }

  getEntityResults(id, subCat){
    console.log('id '+ id);
    let elkURl = "https://elastic.jaiho.com/businessentity/_search?size=500";
    return new Promise(async (resolve) => {
      let results = [];
      results = await Axios.post(elkURl,
        {
          "query": {
            "bool": {
              "must": [{
                "match": {
                  "advcities": "Bangalore"
                }
              },
              { "match": { "subcategory": subCat } }]
            }
          }
        }
      );
      setTimeout(() =>{
        var elkData = results.data.hits.hits;
        let objSelectedEntity = elkData.filter(function (elkItem) { 
          console.log('SubId'+ JSON.stringify(elkItem._source));
          return elkItem._source.subcategory === subCat
        });

        this.setState({ categoryResults: objSelectedEntity});
        this.setState({ loadingVisible: false});
        this.setState({ showNoResults : true });
        console.log('Results '+JSON.stringify(objSelectedEntity));
      }, 200);
      
      resolve(results.data.hits.hits);
    })
  }

  componentDidMount() {
    const { subCategoryTitle, subCategoryId } = this.props.route.params;
    this.props.navigation.setOptions({
      title: subCategoryTitle,
    });
    console.log('subCategoryTitle '+subCategoryTitle);
    console.log('subCategoryId '+subCategoryId);
    this.getEntityResults(subCategoryId,subCategoryTitle);
  }
 
  update_Layout = (index) => {
    this.setState({ arrowPressed: true});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
 
    const array = [...this.state.AccordionData];
 
    array[index]['expanded'] = !array[index]['expanded'];
 
    this.setState(() => {
      return {
        AccordionData: array
      }
    });
  }
 
  render() {
    return (
      <View style={styles.MainContainer}>
 
        
          {/* {
            this.state.AccordionData.map((item, key) =>
              (
                <Expandable_ListView key={item.category_Name} onClickFunction={this.update_Layout.bind(this, key)} item={item} />
                

              ))
          } */}
          <ScrollView contentContainerStyle={{ paddingVertical: 5 }}>
          <Loader modalVisible={this.state.loadingVisible} animationType="fade" />

{ this.state.showNoResults ? 
  this.state.categoryResults.length > 1 ? 
            this.state.categoryResults.map((item, key) =>
              (
                
                <View style={{flex: 1, 
                  borderBottomWidth: 0.9, 
                  borderBottomColor: colors.gray05,
                  
                  }}>
          <ListItem
            leftAvatar={{ source: { uri: './' } }}
            title={item._source.businessname}
            subtitle={'Bangalore'}
            onPress={() => this.props.navigation.navigate('YellowPageDescription', {category : item._source})}
            rightIcon={  <Icon
              name="chevron-right"
              type="entypo"
              color={colors.violet}
              containerStyle={{ marginLeft: -15, width: 20 }}
            />}
          />
          </View>
          
          )) : 
          
          <Text style={{alignContent: 'center', textAlign:'center', fontSize:18}}>
            Sorry! No Results Found
          </Text> 
            : null
      //         <ImageBackground
      //   style={styles.container}>
        
      //   <Image source={require('./../images/noresults.png')} />
      // </ImageBackground>
          
          }
       
       </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#FFF',
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
 
  iconStyle: {
 
    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    tintColor: '#fff'
 
  },
 
  sub_Category_Text: {
    fontSize: 18,
    color: '#000',
    padding: 10
  },
 
  category_Text: {
    textAlign: 'left',
    color: '#000',
    fontSize: 21,
    padding: 10
  },
 
  category_View: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
 
  Btn: {
    padding: 10,
    backgroundColor: '#FF6F00'
  }
 
});