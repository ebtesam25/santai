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
    this._getWishlist();


  }
  

_getWishlist(){
  fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/santaigetwishlist', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"userid":"-1"})
})
    .then((response) => {response.json()})
    .then((responseJson) => {
console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
}
  
 

   getData() {
    return [
         {
            "id":"1",
            "name":"Bose bluetooth speakers",
            "description":"Bose Soundlink II Bluetooth Speakers",
            "purchaselink":"https://www.bose.com/en_us/products/speakers/portable_speakers/soundlink-color-bluetooth-speaker-ii.html?mc=25_PS_SP_PL_00_GO_&gclid=Cj0KCQiA_qD_BRDiARIsANjZ2LC3c5xhF0xrvGpgW3a_5kRNYUzsZteY-GEP8R4FpjVmVT_OgQYQCO4aAgHAEALw_wcB&gclsrc=aw.ds#v=soundlink_color_ii_red",
            "image":"https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_color_ii/product_silo_images/soundlink_color_ii_red_EC.psd/jcr:content/renditions/cq5dam.web.600.600.png",
            "price":99.95
         },
         {
            "id":"2",
            "name":"Temperature Control Smart Mug",
            "description":"Ember Temperature COntrol Smart Mug 14 oz",
            "purchaselink":"https://www.bestbuy.com/site/ember-temperature-control-smart-mug-14-oz-black/6367431.p?skuId=6367431&ref=212&loc=1&extStoreId=512&ref=212&loc=1&gclid=Cj0KCQiA_qD_BRDiARIsANjZ2LBYtLBtEqvFLHa0aoECdbKlHzCX6ZIQhNyJT22nHyqUSfhR7QbWjZ0aAnHLEALw_wcB&gclsrc=aw.ds",
            "image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6367/6367431_rd.jpg;maxHeight=640;maxWidth=550",
            "price":129.99
         },
         {
            "id":"3",
            "name":"Apple Airpods",
            "description":"Apple AIrpods with Charging Case",
            "purchaselink":"https://www.target.com/p/apple-airpods-with-charging-case/-/A-54191097?ref=tgt_adv_XS000000&AFID=google_pla_df&fndsrc=tgtao&DFA=71700000012807845&CPNG=PLA_Electronics%2BShopping_Local&adgroup=SC_Electronics&LID=700000001170770pgs&LNM=PRODUCT_GROUP&network=g&device=c&location=9011817&targetid=pla-778202935625&ds_rl=1246978&ds_rl=1248099&gclid=Cj0KCQiA_qD_BRDiARIsANjZ2LA1E2hHWcBSXKTglBxSknfpS0mMmEw3L0J-tJA9kyQ1fojq0NIKSAIaAlBMEALw_wcB&gclsrc=aw.ds",
            "image":"https://target.scene7.com/is/image/Target/GUEST_da2035e3-ba06-430c-bae4-c3108d02e48f?fmt=webp&wid=1400&qlt=80",
            "price":124.99
         }
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
           
            <Text onPress={()=>{this._getWishlist(); this.setState({gift:'hey'})}} style={{position:'relative',fontSize:15,marginTop:'5%',textAlign:'center', color:'#FFF', alignSelf:'center', fontFamily:'FuturaH', backgroundColor:'#4C541B',padding:'5%', width:'60%',borderRadius:30}}>Auto-generate list</Text>
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