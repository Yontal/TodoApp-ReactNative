import React, { useState } from 'react'
import {MaterialIcons } from '@expo/vector-icons';
import {View, StyleSheet, TextInput, Alert, TouchableOpacity, Keyboard, Modal, useWindowDimensions, Text} from 'react-native'
import COLOR from '../constants/colors'
import MainButton from '../components/MainButton';
import i18n from 'i18n-js';

const CustomModal = props => {
    
    return (
        // <View style={styles.modalWrapper}>
       
            <View style={{...styles.centeredView}}> 
              <View style={{...styles.modalView, width: useWindowDimensions().width * 0.85}}> 
              <Text style={styles.modalHeader}> {i18n.t("taskTitleCannotBeEmpty")} </Text>
                {/* <Text style={styles.modalText}>Hello World!</Text> */}
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <MainButton
                  styles={{
                    width: (useWindowDimensions().width * 0.85 ) - (useWindowDimensions().width * 0.15),
                    borderRadius: 8,
                    marginLeft: 10,
                    marginRight: 10,
                    backgroundColor: COLOR.whiteColor,
                  }}
                  textStyle={{
                    fontFamily: "open-sans",
                    fontSize: 14,
                    letterSpacing: 1.25,
                    textTransform: "uppercase",
                    color: COLOR.blackColor,
                  }}
                  onPressHandler={props.close}
                >
                 { i18n.t("ok")}
                </MainButton>
            </View>
              </View>
            </View>
          
    
        // </View>
      );
}

export const InputField = ({onAddItem, placeholder, defaultValue}) => {
    const [visible, setVisible] = useState(false);
    const [itemValue, setItemValue] = useState(typeof defaultValue !== 'undefined' ? defaultValue : '');

    const pressHandler = () => {
        if(itemValue.trim()){
            onAddItem(itemValue)
            setItemValue('')
            Keyboard.dismiss();
        }
        else{
            setVisible(true);
        }
    }

    return (
      // <View style={styles.inputTodoContainer}>
      <View style={styles.inputArea}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          background="black"
          onRequestClose={() => setVisible(false)}
        >
          <CustomModal close={() => setVisible(false)} />
        </Modal>
        <View style={styles.inputText}>
          <TextInput
            placeholder={placeholder}
            value={itemValue}
            onChangeText={(itemValue) => setItemValue(itemValue)}
            defaultValue={defaultValue}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={pressHandler}>
            <MaterialIcons
              name="add-circle"
              size={30}
              color={COLOR.accentColor}
            />
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
        // elevation: 1,
        
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
    },
    modalWrapper: {
        backgroundColor: "black"
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        // margin: 20
        // marginTop: 22
      },
      modalHeader: {
        color: COLOR.whiteColor,
        marginBottom: 24,
        fontFamily: "open-sans",
        fontSize: 16,
        letterSpacing: 0.5,
        textAlign: 'center'
      },
      modalView: {
        // margin: 20,
        // width: useWindowDimensions().width
        backgroundColor: "black",
        borderRadius: 20,
        borderColor: "white",
        borderWidth: 2,
        padding: 35,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "white",
      }
})