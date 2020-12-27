import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {Icon} from 'react-native-elements';
import CardList from "../components/cardList";
import PostList from '../components/postList';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
  'Christmas': require('../assets/fonts/christmas.ttf'),
};

export default class Gift extends React.Component  {
  state = {
    fontsLoaded: false,
    playing: false,
    budget: 0,
    temp: 0,
    autopick: false,
    edit: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();


  }
  

_setBudget(){
  fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/santaisetbudget', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"userid": "123", "budget":this.state.budget})
})
    .then((response) => response.json())
    .then((responseJson) => {
console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
}
  
_autoPick() {
        return  [
        {
          
        title:"Google Nest Hub",
        image:"https://icdn2.digitaltrends.com/image/digitaltrends/google-home-hub-review-1-2.jpg", 
        description:"Google Nest Hub provides help at a glance in any room at home.",
        price: 129,
      },]
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
     <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Notification')}}><Image source={{uri:'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/gift-icon.png'}} style={{height:30, width:30, marginTop:'10%', marginLeft:'5%'}}></Image></TouchableOpacity>   
      <Text style={{position:'relative',fontSize:70,marginTop:'1.5%',textAlign:'center', color:'#FFF', fontFamily:'Christmas', width:'100%'}}>Secret Santa</Text>
      

      
      {this.state.budget == 0 &&  <View style={styles.playing}>
      
      <View>
      <Text style={{position:'relative',fontSize:30,marginTop:'5%',textAlign:'center', color:'#FFF', fontFamily:'FuturaL', width:'100%'}}>Set your budget</Text>
      <Image source={require('../assets/budget.png')} style={{width:400, height:200, resizeMode:'contain', alignSelf:'center', marginTop:'5%'}}></Image>
          {!this.state.edit && <Text style={{position:'absolute', top:70, left:230}} onPress={()=>this.setState({edit:!this.state.edit})}><Icon name="edit" type="font-awesome"></Icon></Text>}
          {this.state.edit && <TextInput onChangeText={(val)=>{this.setState({temp:val})}} placeholder="$0+" style={{position:'absolute', borderWidth:1, borderColor:'#C41230', top:120, left:50, fontSize:20, fontFamily:'FuturaH', borderRadius:4, padding:'1%'}}></TextInput>}
          {!this.state.edit && <Text style={{position:'absolute',  top:120, left:50, fontSize:20, fontFamily:'FuturaH',  padding:'1%'}}>${this.state.budget}</Text>}
 
          {this.state.edit &&  <Text onPress={()=>{this.setState({budget:this.state.temp}); this._setBudget();}} style={{position:'relative',fontSize:15,marginTop:'5%',textAlign:'center', color:'#FFF', alignSelf:'center', fontFamily:'FuturaH', backgroundColor:'#4C541B',padding:'5%', width:'60%',borderRadius:30}}>Save</Text>}
          <Text onPress={()=>this.props.navigation.navigate('Home')} style={{position:'relative',fontSize:15, marginTop:'5%',marginBottom:'20%',textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginLeft:'5%', marginRight:'5%'}}>or <Text style={{textDecorationLine:'underline'}}>set your wishlist</Text></Text>
            </View>
      </View>}
      

      {this.state.budget != 0 && 
    <View style={{height:'90%', marginTop:'10%', backgroundColor:'#FFF', borderRadius:20, paddingTop:'5%'}}>
        <View style={{flexDirection:'row'}}>
        <Text onPress={()=>this.setState({autopick:!this.state.autopick})} style={{fontFamily:'FuturaH', fontSize:20, marginLeft:'5%', marginRight:'30%', textAlign:'left', color:'#4C541B'}}>Auto-pick <Icon name="select1" type="ant-design" size={15}></Icon></Text>
        <Text onPress={()=>this.setState({budget:0})} style={{fontFamily:'FuturaH', fontSize:20, marginRight:'5%', textAlign:'right', color:'#4C541B'}}>Update budget <Icon name="edit" type="font-awesome" size={15}></Icon></Text>
        </View>
            <Text style={{position:'relative',fontSize:20,marginTop:'5%',textAlign:'center', color:'#000', fontFamily:'FuturaL', width:'100%'}}>Send a gift within your budget</Text>
        {!this.state.autopick &&
      <ScrollView>
   
      <CardList itemList={this.getData()}/>
      </ScrollView>}
      {this.state.autopick &&
      <ScrollView style={styles.scrollcontainer}>
   
      <CardList itemList={this._autoPick()}/>
      </ScrollView>}
</View>
    }

{!this.state.budget != 0 && <View style={{position:'absolute', bottom:0, flexDirection:'row', backgroundColor:'rgba(255,255,255,0.75)', height:60, width:'100%'}}> 

<Image source={require('../assets/citi.png')} style={{height:50, width:50, resizeMode:'contain', marginLeft:'20%', borderRadius:2}}></Image>
<View style={{marginTop:'2.5%', marginLeft:'2.5%'}}>
    <Text style={{fontWeight:'bold'}}>Citibank Personal Checking</Text>
<Text>•••• 5583</Text>
</View>
</View>}
      
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
  scrollcontainer: {
      height:'120%',
      paddingBottom:'20%',
      marginTop:'10%',
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