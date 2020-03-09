import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput, Button, Alert, Modal} from 'react-native'

export const Header = ({onAddItem, isAddMode, onCancel}) => {

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

    const cancelPressHandler = () => {
        onCancel();
    }

    

    return(
        <Modal visible={isAddMode} animationType="slide">
            <View style={styles.header}>
                {/* <View style={styles.logo}>
                    <Text>Logo</Text>
                </View> */}
                <View style={styles.inputArea}>
                    <TextInput 
                        placeholder="Type your todo item"
                        value={itemValue}
                        onChangeText={(itemValue)=>setItemValue(itemValue)}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <View style={styles.button}>
                        <Button 
                            title="Cancel"
                            onPress={cancelPressHandler}
                            color="red"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="Add"
                            onPress={pressHandler}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    buttonGroup:{
        width: '80%',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button:{
        width: '40%'
    },
    category:{

    },
    inputArea:{
        borderWidth: 1,
        width: '80%',
        backgroundColor: 'white',
        padding: 3
    },
    header:{
//        height: 70,
        flex: 1,
        backgroundColor: '#ccc',
        width: '100%',
        padding: 7,
//        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }       
})