import React, { useState } from 'react'
import {MaterialIcons } from '@expo/vector-icons';
import {View, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Modal, Text, TouchableOpacity, TouchableHighlight} from 'react-native'
import COLOR from '../constants/colors'

export const InputField = ({onAddItem, placeholder}) => {

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
        // <View style={styles.inputTodoContainer}> 
                <View style={styles.inputArea}>
                    <View style={styles.inputText}>
                        <TextInput 
                            placeholder={placeholder}
                            value={itemValue}
                            onChangeText={(itemValue)=>setItemValue(itemValue)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={pressHandler}>
                            <MaterialIcons name="add-circle" size={30} color={COLOR.accentColor} />

                        </TouchableOpacity>
                        {/* <Button 
                            title="Add"
                            
                        /> */}

                    </View>
                </View>
                    
        // </View>
    
    );
}

const styles = StyleSheet.create({
    inputArea: {
        flexDirection: "row",
        // borderColor: COLOR.accentColor,
        // // borderRadius: 8,
        // borderBottomWidth: 1,
        // flex: 1,/
        // maxHeight: auto,
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        elevation: 2,
        
        // marginLeft: 10,
        // marginRight: 10,
        // marginBottom: 10,
        // flex: 1,
        // alignItems: 'flex-end'

        borderColor: COLOR.accentColor,
        borderRadius: 8,
        borderWidth: 1,
        padding: 10
    },
    inputText: {
        // borderColor: COLOR.greyColor,
        // // borderRadius: 8,
        // borderBottomWidth: 1,
        width: '90%'
    }
})