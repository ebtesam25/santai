import React from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';

let customFonts  = {
    'FuturaH': require('../assets/fonts/futurah.ttf'),
    'FuturaL': require('../assets/fonts/futural.ttf'),
    'Christmas': require('../assets/fonts/christmas.ttf'),
  };

export default class Login extends React.Component  {
  state = {
    fontsLoaded: false,
  };


  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  loginUser(){
    fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/santailogin ', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"email":"user@example.com","password":"123456"}
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
      <ImageBackground source={require('../assets/bg-l.png')} style={{width:'100%', height:'100%'}}>

      <Text style={{position:'relative',fontSize:70,marginTop:'99%', marginLeft:'10%', color:'#FFF', fontFamily:'Christmas'}}>Login</Text>
     
      <TextInput placeholder='Email' style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'5%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      <TextInput placeholder='Password' secureTextEntry={true} style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'5%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      
   
      
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginTop:'15%', borderWidth:2,borderColor:'#FFF', padding:'5%', width:'70%', borderRadius:10, alignSelf:'center',}} onPress={()=>this.props.navigation.navigate('Gift')}>LOGIN</Text>
      <Text style={{position:'relative',fontSize:15,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaL', marginTop:'5%',alignSelf:'center'}} onPress={()=>this.props.navigation.navigate('Reg')}>Don't have an account? Sign up</Text>
    </ImageBackground>
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
    backgroundColor:'#FFF9EB'
    
  },
  header:{
    height:'30%',
    width:'70%',
    marginTop:'20%',
    resizeMode:'contain',
    alignSelf:'center'
  },
  
});