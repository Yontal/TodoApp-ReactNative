import React, { useState } from 'react';
import { Text, StyleSheet   , View, useWindowDimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Category from '../models/Category';
import COLOR from '../constants/colors';

const BottomTab = props => {
    const [currentScreen, setCurrentScreen] = useState('item');

    const onItemPressHandler = () => {
        props.navigation.navigate('Todos');
        setCurrentScreen('item');
    }

    const onCategoryPressHandler = () => {
        props.navigation.navigate('Categories');
        setCurrentScreen('category');
    }

    const onAddButtonHandler = () => {
        if(currentScreen === 'item'){
            props.navigation.navigate("AddItem");
        }
        if(currentScreen === 'category'){
            props.navigation.navigate({routeName: 'Category', params: {category: new Category((+new Date()).toString(), '', '#C7C7C7'), newCategory: true}});
        }
    }
    
    return (
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 50,
          backgroundColor: COLOR.primaryColor,
        }}
      >
        <TouchableHighlight
          underlayColor="#0a0a0a"
          onPress={onItemPressHandler}
          style={{
            width: useWindowDimensions().width / 2,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name="check-circle"
            size={25}
            color={
              currentScreen === "item" ? COLOR.whiteColor : COLOR.greyColor
            }
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#0a0a0a"
          onPress={onCategoryPressHandler}
          style={{
            width: useWindowDimensions().width / 2,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name="tag"
            size={25}
            color={
              currentScreen === "category" ? COLOR.whiteColor : COLOR.greyColor
            }
          />
        </TouchableHighlight>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            marginLeft: useWindowDimensions().width / 2 - 30,
          }}
        >
          <TouchableOpacity onPress={onAddButtonHandler} activeOpacity={.8}>
            <MaterialIcons
              name="add-circle"
              size={60}
              color={COLOR.whiteColor}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}

export default BottomTab;