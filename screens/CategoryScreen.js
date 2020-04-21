import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory } from '../store/actions/category';

import MainButton from '../components/MainButton';
import COLOR from '../constants/colors';

const CategoryScreen = props => {
    const [category, setCategory] = useState(props.navigation.getParam('category'));
    const [selectedValue, setSelectedValue] = useState(category.color);
    
    const dispatch = useDispatch();

    const saveChanges = () => {
        dispatch(updateCategory(category));
        props.navigation.navigate({routeName: 'CategoriesList'});
      }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={{ fontFamily: "open-sans" }}>Category: </Text>
          <Text style={{ fontFamily: "open-sans" }}>{category.title}</Text>
        </View>
        <Text style={{ fontFamily: "open-sans" }}>Color:</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemPosition) => {
            setCategory((prev) => ({ ...prev, color: itemValue }));
            setSelectedValue(itemValue);
          }}
          prompt="Select color from list below"
        >
          {COLOR.categotyColors.map((color) => {
            return (
              <Picker.Item
                key={color.label}
                label={color.label}
                value={color.value}
              />
            );
          })}
        </Picker>
        <MainButton onPressHandler={saveChanges}>Save</MainButton>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: '5%',
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        marginVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
});

export default CategoryScreen;