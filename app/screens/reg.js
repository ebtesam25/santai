import React from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import CheckBox from '@react-native-community/checkbox';


let customFonts  = {
    'FuturaH': require('../assets/fonts/futurah.ttf'),
    'FuturaL': require('../assets/fonts/futural.ttf'),
    'Christmas': require('../assets/fonts/christmas.ttf'),
  };

export default class Reg extends React.Component  {
  state = {
    fontsLoaded: false,
    socialr1:'',
    socialt1:'',
    socialr2:'',
    socialt2:'',
    reddit1: false,
    twitter1: false,
    reddit2: false,
    twitter2: false
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    
  }

  registerUser(){
    fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/santairegister ', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"email":"user@example.com","password":"123456","name":"user1","reddituser":this.state.socialr1, "twitteruser" : this.state.socialt2, "budget" : 200}
          )
})
    .then((response) => response.json())
    .then((responseJson) => {
console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg-r.png')} style={{width:'100%', height:'100%'}}>
     
      <Text style={{position:'relative',fontSize:70,marginTop:'95%', marginLeft:'10%', color:'#FFF', fontFamily:'Christmas'}}>Sign Up</Text>
<ScrollView>
      <TextInput placeholder='Username' style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'5%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
       <View style={{flexDirection:'row', marginLeft:'10%'}}><CheckBox
        disabled={this.state.twitter1}
        value={this.state.socialr1}
        onValueChange={(newValue) => {this.setState({socialr1:newValue}); this.setState({reddit:!this.state.reddit})}}
      /><Text style={styles.social}>Twitter</Text>
      <CheckBox
        disabled={this.state.reddit1}
        value={this.state.socialt1}
        onValueChange={(newValue) => {this.setState({socialt1:newValue}); this.setState({twitter:!this.state.twitter})}}
      /><Text style={styles.social}>Reddit</Text></View>

<TextInput placeholder='Username' style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'5%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
       <View style={{flexDirection:'row', marginLeft:'10%'}}><CheckBox
        disabled={this.state.twitter2}
        value={this.state.socialr2}
        onValueChange={(newValue) => {this.setState({socialr2:newValue}); this.setState({reddit:!this.state.reddit})}}
      /><Text style={styles.social}>Twitter</Text>
      <CheckBox
        disabled={this.state.reddit2}
        value={this.state.socialt2}
        onValueChange={(newValue) => {this.setState({socialt2:newValue}); this.setState({twitter:!this.state.twitter})}}
      /><Text style={styles.social}>Reddit</Text></View>

      <TextInput placeholder='Email' style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'1%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      <TextInput placeholder='Password' secureTextEntry={true} style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'5%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      
   
      
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginTop:'5%', borderWidth:2, borderColor:'#FFF', padding:'5%', width:'70%', borderRadius:10, alignSelf:'center'}} onPress={()=>{this.registerUser();this.props.navigation.navigate('Login');}}>REGISTER</Text>
      <Text style={{position:'relative',fontSize:15,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaL', marginTop:'5%',alignSelf:'center'}} onPress={()=>this.props.navigation.navigate('Login')}>Already have an account? Login</Text>
    </ScrollView></ImageBackground>
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
    backgroundColor:'#FFF'
    
  },
  header:{
    height:'30%',
    width:'70%',
    marginTop:'20%',
    resizeMode:'contain',
    alignSelf:'center'
  },
  social:{
    fontFamily:'FuturaL',
    fontSize:20,
    color:'#FFF',
    marginRight:'10%'
  }
  
});