import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, useWindowDimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { filterTodos } from '../store/actions/todo';
import MainButton from '../components/MainButton';

import COLOR from '../constants/colors';

const Category = props => {
    return (
      <TouchableOpacity
        onPress={
            () => {props.onSelectedHandler(props.category.title)}
        }
        style={{
          ...styles.categoryItem,
          height: 50,
          width: 250,
          borderWidth: 0,
          borderBottomWidth: 1,
          flexDirection: "row",
          backgroundColor: COLOR.whiteColor,
        }}
      >
        <View style={{width: 205}}>
          <Text style={{ fontFamily: "open-sans", fontSize: 16, letterSpacing: 0.5 }}>
            {props.category.title}
          </Text>
        </View>
        <View
          style={{
            borderColor: props.category.color,
            borderWidth: 1,
            height: 15,
            width: 25,
            borderRadius: 4,
            backgroundColor: props.category.color,
          }}
        ></View>
      </TouchableOpacity>
    );
}

const Drawer = props => {
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    const clearFilter = () => {
        dispatch(filterTodos());
        console.log('here')
        props.navigation.navigate({routeName:'ItemsList', params: {filter: false}});
    }

    const onSelectedHandler = (title) => {
        dispatch(filterTodos(title));
        props.navigation.navigate({routeName:'ItemsList', params: {filter: true, clearFilter: clearFilter}});
        props.navigation.closeDrawer();
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            color: COLOR.whiteColor,
            padding: 10,
            paddingTop: 35,
            fontFamily: "open-sans-bold",
            fontSize: 20,
            letterSpacing: .15,
          }}
        >
          Categories
        </Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Category
              onSelectedHandler={onSelectedHandler}
              category={item}
            />
          )}
        />
        <MainButton
          styles={{
            width: 250,
            borderRadius: 8,
            margin: 10,
            backgroundColor: COLOR.whiteColor,
          }}
          textStyle={{
            fontFamily: "open-sans",
            fontSize: 16,
            letterSpacing: 1.25,
            textTransform: "uppercase",
            color: COLOR.blackColor,
          }}
          onPressHandler={() => {
            props.navigation.navigate("Categories");
            props.navigation.closeDrawer();
          }}
        >
          Add category
        </MainButton>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    categoryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        borderColor: COLOR.accentColor,
        borderRadius: 8,
        borderWidth: 1,
        padding: 5,
        paddingHorizontal: 10,
    }
});

export default Drawer;