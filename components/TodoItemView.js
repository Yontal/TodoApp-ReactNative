import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, useWindowDimensions, Animated, Easing, Dimensions } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import COLOR from '../constants/colors';
import MainButton from './MainButton';

const MoreDetails = props => {
  const slideAnim = useRef(new Animated.Value(props.initialValue)).current 
  const fadeAnim = useRef(new Animated.Value(0)).current
  
    useEffect(() => {
      Animated.timing(
        slideAnim,
        {
          toValue: props.open ? 150 : 0,
          duration: 300,
        }
      ).start();
      Animated.timing(
        fadeAnim,
        {
          toValue: props.open ? 1 : 0,
          duration: 300,
        }
      ).start();
    }, [props.initialValue])
  return (
    <Animated.View
      style={{height: slideAnim,
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
         // display: props.open ? "flex" : "none",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          padding: 5,
          marginHorizontal: 5,
          borderBottomColor: slideAnim === 0 ? 'rgba(0,0,0,0)' : COLOR.greyColor, 
          borderBottomWidth: 1,
        }}
      >
        <View>
          <Text>
            The description of the item and its delails will be displayes here a
            little bit later...
            The description of the item and its delails will be displayes here a
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <MainButton styles={{ width: useWindowDimensions().width * 0.4 }}>
            Remind me
          </MainButton>
          <MainButton
            styles={{
              width: useWindowDimensions().width * 0.4,
              backgroundColor:
                props.item.important === 1
                  ? COLOR.redColor
                  : COLOR.primaryColor,
            }}
            onPressHandler={() => props.markAsImportant(props.item)}
          >
            {props.item.important === 1 ? "Disperse" : "Prioritize"}
          </MainButton>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const MoreDetailsIcon = (props) => {
  const spinValue = useRef(new Animated.Value(props.initialValue)).current;

  const spinOpen = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: props.open ? 1 : 0,
      duration: 300,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  }, [props.initialValue]);
  return (
    <Animated.View style={{ transform: [{ rotate: spinOpen }] }}>
      <MaterialIcons
        name="expand-more"
        size={30}
        color={COLOR.greyColor}
        style={styles.icon}
      />
    </Animated.View>
  );
};


const TodoItemView = props => {
  const [showDetails, setShowDetails] = useState(false);
  
  const showDetailsHandler = () => {
    setShowDetails(prev => !prev);    
  }

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.itemPressHandler(props.item)}
      >
        <View
          style={{
            ...styles.rowFront,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: useWindowDimensions.width,
            borderBottomColor:
              props.item.important === 1
                ? COLOR.redColor
                : props.item.done === 1
                ? COLOR.greenColor
                : COLOR.greyColor,
            backgroundColor: props.categories ? props.categories.color : COLOR.whiteColor,
          }}
        >
          <View
            style={{
              maxWidth: 50,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => props.markAsDone(props.item)}>
              <MaterialCommunityIcons
                name={
                  props.item.done === 1
                    ? "checkbox-marked-circle"
                    : "checkbox-blank-circle-outline"
                }
                size={23}
                color={
                  props.item.done === 1 ? COLOR.greenColor : COLOR.greyColor
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              maxWidth: "80%",
              flex: 1,
              alignItems: "flex-start",
            }}
          >
            <Text>{props.item.title}</Text>
            <View
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {props.item.categories[0] !== "default" ? (
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <MaterialCommunityIcons name="tag" size={18} color={props.item.important === 1 ? COLOR.redColor : COLOR.blackColor } />
                  <Text>{props.item.categories[0]}</Text>
                </View>
              ) : null}
              {props.item.deadline !== "" ? (
                <View style={{flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: 'flex-end'}}>
                  <MaterialCommunityIcons name="timelapse" size={18} />
                  <Text>
                    {new Date(props.item.deadline).toLocaleDateString()}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={{
              maxWidth: 50,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => showDetailsHandler()}>
              <MoreDetailsIcon
                initialValue={showDetails ? 0 : 1}
                open={showDetails ? true : false}
              />
            </TouchableOpacity>
          </View>
        </View>
        <MoreDetails
          initialValue={showDetails ? 0 : 150}
          open={showDetails ? true : false}
          markAsImportant={props.markAsImportant}
          item={props.item}
        />
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    rowFront: {
        alignItems: 'flex-start',
        marginHorizontal: 5,
        marginVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: COLOR.whiteColor,
        borderBottomColor: COLOR.greyColor,
        borderBottomWidth: 1,
        justifyContent: 'center',
        minHeight: 50,
    },
});

export default TodoItemView;