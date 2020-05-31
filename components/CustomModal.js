import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native";
import COLOR from '../constants/colors';
import MainButton from './MainButton';

const CustomModal = (props) => {

  return (
    <View style={styles.modalWrapper}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        background="black"
        onRequestClose={props.onRequestClose}
      >
        <View style={{...styles.centeredView}}> 
          <View style={{...styles.modalView, width: useWindowDimensions().width * 0.85}}> 
          <Text style={styles.modalHeader}> {props.header} </Text>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {props.buttons.map((button, index) => {
            return (
              <MainButton
              key={index}
              styles={{
                width: (useWindowDimensions().width * 0.85 / props.buttons.length) - (useWindowDimensions().width * 0.15)/props.buttons.length,
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
              onPressHandler={() => {
                button.action();
              }}
            >
              {button.text}
            </MainButton>
            )
          })}
        </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomModal;