import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import MainButton from '../components/MainButton';
import COLOR from '../constants/colors';

const Category = props => {
    return (
      <TouchableOpacity
        onPress={
            () => {props.onSelectedHandler(props.category.title)
            props.onSelected()}
        }
        style={{
          ...styles.inputArea,
          height: 50,
          width: useWindowDimensions().width - 20,
          //  borderWidth: 0,
          //  borderBottomWidth: 1,
          flexDirection: "row",
          backgroundColor: COLOR.whiteColor,
        }}
      >
        <View>
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

const CategorySelector = props => {
    return (
      <View style={styles.container}>
        <FlatList
          data={props.categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Category
              onSelectedHandler={props.onSelectedHandler}
              category={item}
              onSelected={props.onSelected}
            />
          )}
        />
        <MainButton
          styles={{
            width: useWindowDimensions().width - 20,
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
            props.onSelected();
          }}
        >
          Add category
        </MainButton>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.blackColor,
        paddingVertical: 10,
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
 //       width: '90%'
    },
});

export default CategorySelector;

