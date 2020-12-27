import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Post({ charity}) {
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
        <View style={styles.fishdeets}>  
       
        <Text style={styles.name} onPress={()=>{navigation.navigate('Donate',{title:charity})}}>{charity}</Text>
       </View>
        
    </View>
)}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:'2%',
        borderRadius: 20,
        backgroundColor: '#FFF',
        elevation:1,
        alignSelf:'center',
        justifyContent:'center',
        width:350,
        
    },
    name: {
        fontSize: 20,
        color:'#4C541B',
        fontFamily:'FuturaH',
        marginTop: '5%',
        marginBottom:'5%',
        textAlignVertical:'center',

    },
     photo: {
        height: 200,
        width: 350,
        alignSelf:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        resizeMode:'contain',
        position:'absolute',
        top:0,
        
        
    },
    fishdeets: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        
    },
    goal: {
        fontSize: 18,
        fontFamily:'FuturaH',
        color:'#227F74',
        marginTop:'5%',
        marginBottom:'5%'
    },
    location: {
        fontSize: 18,
        fontFamily:'FuturaL',
        color:'#227F74',
        marginTop:210,
    },
    description: {
        fontSize: 18,
        fontFamily:'FuturaL',
        color:'#227F74',
        marginTop:'5%',
    },
    more: {
        fontSize: 18,
        fontFamily:'FuturaH',
        color:'#227F74',
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