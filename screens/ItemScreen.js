import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo } from '../store/actions/todo';

import COLOR from '../constants/colors';
import { CATEGORIES } from '../data/dummy-data';

const CategoryScreen = props => {
    const categories = useSelector(state => state.categories.categories);
    const [picked, setPicked] = useState(props.navigation.getParam('todo').categories.toString())

    const dispatch = useDispatch();

    const onSaveHandler = (todo, newCategory) => {
        const updatedTodo = todo;
        updatedTodo.categories = [newCategory];
        dispatch(updateTodo(updatedTodo));
        props.navigation.navigate('ItemsList');
    }

    return(
        <View>
            <Picker
                selectedValue={picked}
                style={{ height: 50, width: "100%" }}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setPicked(itemValue)}>
                    {categories.map(category => {return(<Picker.Item label={category.title} value={category.title} key={category.id} />)})}
            </Picker>
            <Button title="Save" color={COLOR.primaryColor} onPress={() => {onSaveHandler(props.navigation.getParam('todo'), picked)}} />
        </View>
    );
}

const styles = StyleSheet.create({

})

export default CategoryScreen;