import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Post from './post';

const styles = StyleSheet.create({
    container: {
 
    },
});


const PostList = ({ itemList}) => (
    <View>
        
        <FlatList
                numColumns={1}
                data={itemList}
                renderItem={({ item }) => <Post
                    charity={item.title}
                  
                    
                />}
            />

    </View>
);

export default PostList;