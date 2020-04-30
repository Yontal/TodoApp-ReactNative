import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const AddButton = props => {
    return (
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          bottom: 30,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
      >
        <TouchableOpacity onPress={props.onPress}>
          <MaterialIcons name="add-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>
    );
}

export default AddButton;