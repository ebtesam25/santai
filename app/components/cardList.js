import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Card from './card';

const styles = StyleSheet.create({
    container: {
 
    },
});

CardList = ({ itemList}) => (
    <View>
        
        <FlatList
        style={{height:'100%'}}
                numColumns={2}
                data={itemList}
                renderItem={({ item }) => <Card
                    title={item.title}
                    image={item.image}
                    description={item.description} 
                    price = {item.price}
                    
                />}
            />

    </View>
);

export default CardList;