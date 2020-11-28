import * as React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import {Input, Icon, ListItem, Avatar} from 'react-native-elements';
import colors from './../styles/colors';
import Axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import ChevronOnCondition from './../components/ChevronOnCondition';
import { Button, Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import Loader from './../components/Loader';

const YellowPages = ({ navigation }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [catagories, setCategories] = React.useState([]);
  const [catagoriesBackUp, setCategoriesBackUp] = React.useState([]);
  const [subCatagories, setSubCategories] = React.useState([]);
  const [loadingVisible, setLoadingVisible] = React.useState(true);

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => {
    console.log('query '+query);
    setSearchQuery(query);
    let data = [];
    let categoriesResults = catagories;
    data = categoriesResults.filter(l => {
      return l._source.title.match( query );
     });

     if(query.length == 0){
      setCategories(catagoriesBackUp);
     }else{
      setCategories(data);
     }
  }

  const handlePress = () => setExpanded(!expanded);

  const getCategories = () => {
    let elkURl = 'https://elastic.jaiho.com/category/_search?size=500';
    return new Promise(async (resolve) => {
      let results = [];
      results = await Axios.get(elkURl);
      setCategories(results.data.hits.hits);
      setCategoriesBackUp(results.data.hits.hits);
      console.log(
        'Results in Promise ' + JSON.stringify(results.data.hits.hits),
      );
    });
  };

  const getSubCategories = () => {
    let elkURl = 'https://elastic.jaiho.com/subcategory/_search?size=500';
    return new Promise(async (resolve) => {
      let results = [];
      results = await Axios.get(elkURl);
      setSubCategories(results.data.hits.hits);
      setLoadingVisible(false);
      console.log(
        'Results in Promise ' + JSON.stringify(results.data.hits.hits),
      );
    });
  };

  React.useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.white,}}>
       {/* <Card style={{ display:'flex', width:'100%'}}>
            <Card.Title title="Yellow Pages" style={{backgroundColor:colors.violet,}} titleStyle={{color:colors.white}}/>
          </Card> */}
          <Searchbar
      placeholder="Search Yellow pages"
      style={{backgroundColor: colors.gray05, marginLeft:8, marginRight: 8, marginTop:8, borderRadius: 50}}
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    <Loader modalVisible={loadingVisible} animationType="fade" />
        <ScrollView style={{display:'flex', height: '100%', backgroundColor: colors.white,  }}>
          {catagories
          .sort(function(a, b) {
           if(a._source.title.toLowerCase() < b._source.title.toLowerCase()) return -1;
           if(a._source.title.toLowerCase() > b._source.title.toLowerCase()) return 1;
           return 0;
          })
          .map((category, index) => (
            <View style={{flex: 1, 
              borderBottomWidth: 0.9, 
              borderBottomColor: colors.gray05,
              
              }}>
            <List.Accordion
              title={category._source.title}
              description={'Bangalore'}
              titleStyle={{fontSize: 16, color: colors.black}}
              
              onPress={handlePress}
              left={(props) => (
                <Avatar
                  size={32}
                  rounded
                  titleStyle={{color :colors.white}}
                  title={category._source.title[0]}
                  containerStyle={{backgroundColor: colors.violet, marginLeft: 12}}
                />
              )}>
              {subCatagories
                .filter((e) => e._source.categoryid === category._source.id)
                .map(function (subcat) {
                  return <List.Item title={subcat._source.title} 
                  left={(props) => (
                    <Avatar
                      size={32}
                      rounded
                      titleStyle={{color :colors.black}}
                      title={subcat._source.title[0]}
                      containerStyle={{backgroundColor: colors.gray05, marginLeft: 36}}
                    />
                  )}
                  onPress={()=> navigation.push('YellowPageDetails', { subCategoryTitle:subcat._source.title, subCategoryId: subcat._source.categoryid })}
                  right={(props) => <ChevronOnCondition name={'chevron-small-right'}/>}/>;
                })}
            </List.Accordion>
            </View>
          ))}
        </ScrollView>
     
    </View>
  );
};

export default YellowPages;