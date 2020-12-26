import React from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
  'Christmas': require('../assets/fonts/christmas.ttf'),
};

export default class Splash extends React.Component  {
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

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background.png')} style={{width:'100%', height:'100%'}}>
      <Image source={require('../assets/logo.png')} style={styles.header}></Image>
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginTop:'65%', marginBottom:'5%', padding:'5%', width:'50%', borderWidth:2, borderColor:'#FFF', borderRadius:10, alignSelf:'flex-end', marginRight:'5%',}} onPress={()=>{this.props.navigation.navigate('Login');}}>Get Started</Text>
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
    backgroundColor:'#FFF',
  },
  header:{
    height:'20%',
    width:'50%',
    marginTop:'65%',
    marginLeft:'25%',
    resizeMode:'contain',
  },
  
});