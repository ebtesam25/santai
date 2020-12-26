import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Svg, Line, Path} from 'react-native-svg'
import { Icon } from 'react-native-elements';



export default function Success({ route}) {
    const navigation = useNavigation();
    const { title,price } = route.params;

    return (
    <View style={styles.container}>
          <Text style={{position:'absolute', zIndex:5, top:40, right:20, elevation:2}} onPress={()=>navigation.navigate('Gift')}><Icon color="#FFF" name="close" size={30} type="ionicon"></Icon></Text>
         <Text style={styles.thanks}>Thank you!</Text>
         <Text style={styles.name}><Text style={{fontFamily:'FuturaL'}}>You just sent a</Text> {title}<Text style={{fontFamily:'FuturaL'}}>. Your gift is on its way to the recipient. </Text></Text>
                 <Image source={require('../assets/driving.png')} style={styles.photo} />

                 <Text style={styles.title}>Invoice</Text>
                 <Text style={styles.description}>x1 {title} ----------------------${price}</Text>
                 <Text style={styles.description}>+Shipping ----------------------------------$20</Text>
                 <Text style={styles.name}>Total ------------------------------${price+20}</Text>


                 <Text onPress={()=>{navigation.navigate('Gift')}} style={{position:'relative',fontSize:15,marginTop:'5%',textAlign:'center', color:'#FFF', alignSelf:'center', fontFamily:'FuturaH', backgroundColor:'#4C541B',padding:'5%', width:'60%',borderRadius:30}}>Send another gift</Text>
                 <Text onPress={()=>navigation.navigate('Charity')} style={{position:'relative',fontSize:15, marginTop:'5%',marginBottom:'20%',textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginLeft:'5%', marginRight:'5%'}}>or <Text style={{textDecorationLine:'underline'}}>donate remaining budget to charity</Text></Text>



             
       

      
   
    </View>
)}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C41230',
        elevation:1,
        alignSelf:'center',
        width:'100%',
        
    },
    title: {
        fontSize: 30,
        color:'#FFF',
        fontFamily:'FuturaH',
        marginTop: '10%',
        marginBottom:'5%',
        textAlignVertical:'center',
        textAlign:'center',

    },
    name: {
        fontSize: 20,
        color:'#FFF',
        fontFamily:'FuturaH',
        marginTop: '1.5%',
        marginLeft:'10%',
        textAlignVertical:'center',

    },
    thanks: {
        fontSize: 50,
        color:'#FFF',
        fontFamily:'FuturaH',
        marginTop: '15%',
        marginLeft:'10%',
        textAlignVertical:'center',

    },
     photo: {
        height: 225,
        width:350,
        justifyContent:'center',
        resizeMode:'contain',
        alignSelf:'center',
        borderRadius:10,
        marginTop:'2.5%',
        
        
    },
   
    goal: {
        fontSize: 18,
        fontFamily:'FuturaH',
        color:'#FFF',
        marginTop:'5%',
        marginBottom:'5%'
    },
    location: {
        fontSize: 18,
        fontFamily:'FuturaL',
        color:'#227F74',
        marginTop:'2.5%',
        marginLeft:'10%'
    },
    description: {
        fontSize: 18,
        fontFamily:'FuturaL',
        color:'#FFF',
        marginTop:'2.5%',
        marginLeft:'10%',
        marginRight:'10%'
    },
    more: {
        fontSize: 18,
        fontFamily:'FuturaH',
        color:'#FFF',
        marginTop:'5%',
    },
   deets:{
       borderRadius:30,
       fontFamily:'FuturaH',
       elevation:2,
       backgroundColor:'#379DA6',
       color:'#FFF',
       fontSize:15,
       padding:'5%',
       textAlign:'center',
       width:'50%',
       left:'22.5%',
       marginTop:'5%',
       marginBottom:'7.5%',
   }
});