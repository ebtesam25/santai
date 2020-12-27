import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {Icon} from 'react-native-elements';
import PostList from '../components/postList';

let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
  'Christmas': require('../assets/fonts/christmas.ttf'),
};

export default class Notifications extends React.Component  {
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
  

  
 

   getData() {
    return  [
    {
      
    title:"Google Nest Hub",
  },
 
  
  ]
  }

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
      <Text style={{position:'relative',fontSize:70,marginTop:'15%',textAlign:'center', color:'#FFF', fontFamily:'Christmas', width:'100%'}}>Gifts Received</Text>
      <Text style={{position:'relative',fontSize:30,marginTop:'5%',textAlign:'center', color:'#FFF', fontFamily:'FuturaL', width:'100%'}}>You received the following gifts</Text>

      
     
    <View style={{height:'90%', marginTop:'10%', backgroundColor:'#FFF', borderRadius:20, paddingTop:'5%'}}>
      <ScrollView style={styles.scrollcontainer}>
   
      <PostList itemList={this.getData()}/>
      </ScrollView>
</View>
    
      
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