import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {Icon} from 'react-native-elements';
import CardList from "../components/cardList";
import PostList from '../components/postList';

let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
  'Christmas': require('../assets/fonts/christmas.ttf'),
};

export default class Home extends React.Component  {
  state = {
    fontsLoaded: false,
    playing: false,
    gift: null,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();


  }
  

_getCauses(){
  fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/bethechangegetcauses', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"category": "all"})
})
    .then((response) => response.json())
    .then((responseJson) => {
console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
}
  
 

   getData() {
    return  [
    {
      
    title:"Google Nest Hub",
    image:"https://icdn2.digitaltrends.com/image/digitaltrends/google-home-hub-review-1-2.jpg", 
    description:"Google Nest Hub provides help at a glance in any room at home.",
    price: 129,
  },
  {
      
    title:"Google Nest Hub",
    image:"https://icdn2.digitaltrends.com/image/digitaltrends/google-home-hub-review-1-2.jpg", 
    description:"Google Nest Hub provides help at a glance in any room at home.",
    price: 129,
  },
  {
      
    title:"Google Nest Hub",
    image:"https://icdn2.digitaltrends.com/image/digitaltrends/google-home-hub-review-1-2.jpg", 
    description:"Google Nest Hub provides help at a glance in any room at home.",
    price: 129,
  },
  {
      
    title:"Google Nest Hub",
    image:"https://icdn2.digitaltrends.com/image/digitaltrends/google-home-hub-review-1-2.jpg", 
    description:"Google Nest Hub provides help at a glance in any room at home.",
    price: 129,
  },
  
  ]
  }

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
      <Text style={{position:'relative',fontSize:70,marginTop:'15%',textAlign:'center', color:'#FFF', fontFamily:'Christmas', width:'100%'}}>Wishlist</Text>

      
      {this.state.gift == null &&  <View style={styles.playing}>
      
      <View>
      <Image source={require('../assets/gift.png')} style={{width:'80%', height:'80%', resizeMode:'contain', alignSelf:'center', marginTop:'10%'}}></Image>
           
            <Text onPress={()=>{this.setState({gift:'hey'})}} style={{position:'relative',fontSize:15,marginTop:'5%',textAlign:'center', color:'#FFF', alignSelf:'center', fontFamily:'FuturaH', backgroundColor:'#4C541B',padding:'5%', width:'60%',borderRadius:30}}>Auto-generate list</Text>
          <Text onPress={()=>this.props.navigation.navigate('Add')} style={{position:'relative',fontSize:15, marginTop:'5%',marginBottom:'20%',textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginLeft:'5%', marginRight:'5%'}}>or build your own</Text>
            </View>
      </View>}
      

      {this.state.gift != null &&
    <View style={{height:'90%', marginTop:'10%', backgroundColor:'#FFF', borderRadius:20, paddingTop:'5%'}}>
      <Text onPress={()=>this.props.navigation.navigate('Add')} style={{fontFamily:'FuturaH', fontSize:20, marginRight:'5%', textAlign:'right', color:'#4C541B'}}>Add item <Icon name="edit" type="font-awesome" size={15}></Icon></Text>
      <ScrollView style={styles.scrollcontainer}>
   
      <CardList itemList={this.getData()}/>
      </ScrollView>
</View>
    }
      
    </View>
    );
    }
    else {
    return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    position:'relative',
    backgroundColor:'#C41230'
  },
  left:{
    height:'7%',
    width:'7%',
    top:'2.5%',
    resizeMode:'contain',
    left:'5%',
    position:'absolute',
  },
  right:{
    height:'7%',
    width:'7%',
    top:'2.5%',
    resizeMode:'contain',
    right:'5%',
    position:'absolute'
  },
  middle:{
    height:'60%',
    width:'60%',
    marginTop:'5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
  },
  album:{
    height:'40%',
    width:'50%',
    marginTop:'7.5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
    borderRadius:10,
  },
 
  playing:{
      width:'70%',
      height:'30%',      
      alignSelf:'center',
      marginTop:'5%',
      borderRadius:20
  }
  
});