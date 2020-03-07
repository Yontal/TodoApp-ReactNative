import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native'

export const Header = ({onAddItem}) => {

    const [itemValue, setItemValue] = useState('');

    const pressHandler = () => {
        if(itemValue.trim()){
            onAddItem(itemValue)
            setItemValue('')
        }
        else{
            Alert.alert('Type something')
        }
    }

    

    return(
        <View style={styles.header}>
            <View style={styles.logo}>
                <Text>Logo</Text>
            </View>
            <View style={styles.inputArea}>
                <TextInput 
                    placeholder="Type your todo item"
                    value={itemValue}
                    onChangeText={(itemValue)=>setItemValue(itemValue)}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="Add"
                    onPress={pressHandler}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{

    },
    category:{

    },
    inputArea:{
        borderBottomWidth: 1,
        width: 200,
        backgroundColor: 'white'
    },
    header:{
//        height: 70,
        flex: 1,
        backgroundColor: '#ccc',
        width: '100%',
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }       
})