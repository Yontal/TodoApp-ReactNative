import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, Dimensions, useWindowDimensions, TextInput, Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory, insertCategory, pullCategory } from '../store/actions/category';
import { toHsv, fromHsv } from 'react-native-color-picker'

import MainButton from '../components/MainButton';
import COLOR from '../constants/colors';


import { ColorPicker } from 'react-native-color-picker'
import { addCategory } from '../helpers/db';

const CategoryScreen = props => {
    const [category, setCategory] = useState(props.navigation.getParam('category'));
    const [newCategory, setNewCategory] = useState(props.navigation.getParam('newCategory'));
    const [redirectToItem, setRedirectToItem] = useState(props.navigation.getParam('redirectToItem'));
    
    // const [color, setSelectedValue] = useState(category.color);
    
    const dispatch = useDispatch();
    // console.log(newCategory);
    const saveChanges = () => {
      if (category.title === '') {
        Alert.alert('Type category name!');
        return;
      }
      // console.log(category);

      if (!newCategory) {
         dispatch(updateCategory(category));
      } else {
         dispatch(insertCategory(category));
      }
      if(redirectToItem){
        props.navigation.navigate({routeName: 'CategoriesList'});
        props.navigation.navigate({routeName: 'Todos', params: {newCat: true}})
      } else {
        props.navigation.navigate({routeName: 'CategoriesList'});
      }
      dispatch(pullCategory())
      }

    return (
      <View style={styles.container}>
        <View style={styles.inputArea}>
        <View
              style={{
                position: "absolute",
                top: -10,
                left: 15,
                backgroundColor: COLOR.whiteColor,
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ fontFamily: "open-sans" }}>Category</Text>
            </View>
        <TextInput
              placeholder={category.title === '' ? "Type category name" : ''}
              value={category.title}
              onChangeText={(categoryName) =>
                setCategory((prevCat) => ({ ...prevCat, title: categoryName }))
              }
              defaultValue={category.title}
              style={{
                
                width: useWindowDimensions().width - 120,
                fontFamily: "open-sans",
                fontSize: 16,
                letterSpacing: 0.5
              }}
            />
          </View>
        <ColorPicker
          
          onColorSelected={color => {setCategory((prev) => ({ ...prev, color: fromHsv({ h: color.h, s: color.s, v: color.v })}))}}
          style={{flex: 1}}
          hideSliders={true}
          //  defaultColor={category.color}
          onColorChange={color => {
          setCategory((prev) => ({ ...prev, color: fromHsv({ h: color.h, s: color.s, v: color.v })}));
          // setSelectedValue(color);
          }}
        />
        <MainButton styles={{
                width: Dimensions.get("window").width - 20,
                borderRadius: 8,
                margin: 10,
              }}
              textStyle={{
                fontFamily: 'open-sans',
                fontSize: 16,
                letterSpacing: 1.25,
                textTransform: 'uppercase'
              }} 
              onPressHandler={saveChanges}>Save</MainButton>
      </View>
    );
}

CategoryScreen.navigationOptions = (navigationData) => {
  let newCategory = navigationData.navigation.getParam('newCategory');
  return {
      headerTitle: newCategory ? 'Add category' : navigationData.navigation.getParam('category').title,
  }
}

const styles = StyleSheet.create({
    container:{
        // marginHorizontal: 5,
        // marginVertical: 5,
        flex: 1,
        // flexDirection: '',
        // alignItems: 'center',
        // width: '100%',
        
        // justifyContent: 'space-between',
        // alignItems: 'flex-start',
    },
    inputArea: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 10,
      borderColor: COLOR.accentColor,
      borderRadius: 8,
      borderWidth: 1,
      padding: 10,
  },
});

export default CategoryScreen;