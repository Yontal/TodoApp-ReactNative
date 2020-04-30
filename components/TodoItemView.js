import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, useWindowDimensions, Animated, Easing, Dimensions } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import COLOR from '../constants/colors';
import MainButton from './MainButton';
import { TextInput } from 'react-native-paper';
import { Notifications } from 'expo';
import {localNotification, schedulingOptions} from '../services/LocalPushController.js';

const MoreDetails = props => {
  const slideAnim = useRef(new Animated.Value(props.initialValue)).current 
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [editNote, setEditNote] = useState(false)

  const reminderHandler = () => {
    schedulingOptions.time = new Date(props.item.deadline);
    localNotification.title = props.item.title;
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
  }

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
    <Animated.View style={{ height: slideAnim }}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          // display: props.open ? "flex" : "none",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          padding: 5,
          marginHorizontal: 5,
          borderBottomColor:
            slideAnim === 0 ? "rgba(0,0,0,0)" : COLOR.greyColor,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            marginBottom: 5,
            marginRight: 10,
            padding: 5,
            borderColor: COLOR.greyColor,
            borderWidth: 1,
            borderRadius: 5,
            flex: 1,
          }}
        >
          {!editNote ? (
            <View>
              <Text style={{ fontFamily: 'open-sans', fontSize: 14, letterSpacing: 0.25 }}>{props.item.note}</Text>
            </View>
          ) : (
            <TextInput style={{backgroundColor: COLOR.whiteColor, borderWidth: 0}} autoCorrect={false} multiline={true} underlineColorAndroid="rgba(0,0,0,0)" underlineColor="rgba(0,0,0,0)" textAlignVertical="top" value={props.item.note} />
          )}
          <View style={{ position: "absolute", bottom: 5, right: 5 }}>
            <TouchableOpacity
              onPress={() => {
                setEditNote(!editNote);
              }}
            >
              <MaterialCommunityIcons name="square-edit-outline" size={28} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <MainButton styles={{ width: useWindowDimensions().width * 0.4 }} onPressHandler={reminderHandler}>
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
            borderBottomColor: COLOR.primaryColor,            
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
            <Text style={{ fontFamily: 'open-sans', fontSize: 16, letterSpacing: 0.5, textDecorationStyle: props.item.done === 1 ? 'solid' : null, textDecorationLine: props.item.done === 1 ? 'line-through' : null, color: props.item.done === 1 ? COLOR.greyColor : COLOR.blackColor }}>{props.item.title}</Text>
            <View
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  {props.item.important === 1 ? 
                  <MaterialIcons name="priority-high" size={18} color={COLOR.redColor} /> : null
                  }
                  {props.item.categories[0] !== "default" ? (<View style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons name="tag" size={18} color={props.categories ? props.categories.color : COLOR.whiteColor } />
                  <Text style={{ fontFamily: 'open-sans', fontSize: 14, letterSpacing: 0.25, }}>{props.item.categories[0]}</Text></View>) : null}
              </View>
              {props.item.deadline !== "" ? (
                <View style={{flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: 'flex-end'}}>
                  <MaterialCommunityIcons name="timelapse" size={18} />
                  <Text style={{ fontFamily: 'open-sans', fontSize: 14, letterSpacing: 0.25 }}>
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
        minHeight: 80,
    },
});

export default TodoItemView;