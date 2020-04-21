import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, FlatList, Text, TouchableNativeFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { InputField } from '../components/InputField';

import COLOR from '../constants/colors';
import { insertCategory, pullCategory } from '../store/actions/category';
import Category from '../models/Category';
import { filterTodos } from '../store/actions/todo';

const CategoriesListScreen = props => {
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        dispatch(pullCategory());
    }, [dispatch])

    const onCancelHandler = () => {
        setIsAddMode(false);
    }

    const addItem = (item) => {
        const newCategory = new Category(Math.random().toString(), item);
        setIsAddMode(false);
        dispatch(insertCategory(newCategory));
    }

    const selectCategoryHandler = (category) => {
        // dispatch(filterTodos(title));
        
        props.navigation.navigate({routeName: 'Category', params: {category: category}});
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Button 
                title="Add new category" 
                onPress={() => setIsAddMode(true)} color={COLOR.primaryColor} />
                <InputField onAddItem={addItem} isAddMode={isAddMode} onCancel={onCancelHandler} placeholder="Type category name" />
            </View>
            <FlatList 
            data={categories}
            renderItem={data => (
                <TouchableNativeFeedback onPress={() => {selectCategoryHandler(data.item)}}>
                    <View style={styles.rowFront}>
                        <Text>{data.item.title}</Text>
                    </View>
                </TouchableNativeFeedback>
                )
            } 
            keyExtractor={item => item.id} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
      },
      rowFront: {
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        backgroundColor: COLOR.whiteColor,
        borderBottomColor: COLOR.accentColor,
        borderBottomWidth: 1,
        justifyContent: 'center',
        minHeight: 50,
      },
})

export default CategoriesListScreen;