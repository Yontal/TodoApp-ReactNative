import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {Item} from './Item'

export const Content = ({items, onRemove}) => {


    return(
    <View style={styles.content}>
        <FlatList
            keyExtractor={item => item.key}
            data={items}
            renderItem={({item}) => (
                <TouchableOpacity onLongPress={() => onRemove(item.key)}><Item item={item.itemValue} /></TouchableOpacity>
                )}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    content:{
        width: '100%',
        backgroundColor: '#EAEAEA',
        flex: 15
    }
})