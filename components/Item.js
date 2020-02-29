import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


export const Item = ({item}) => {
return(
        <View style={styles.item}>
            <Text>{item}</Text>
        </View>
);
}

const styles = StyleSheet.create({
    item:{
        padding: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        margin: 3,
        borderRadius: 2
    }
})