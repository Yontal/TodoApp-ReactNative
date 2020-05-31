import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, useWindowDimensions, Animated, Easing, Dimensions } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from "moment";
import i18n from 'i18n-js';
import CustomModal from '../components/CustomModal';
import COLOR from '../constants/colors';
import MainButton from './MainButton';

const MoreDetails = props => {
  const slideAnim = useRef(new Animated.Value(props.initialValue)).current 
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [editNote, setEditNote] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
      Animated.timing(
        slideAnim,
        {
          toValue: props.open ? 55 : 0,
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
            slideAnim === 0 ? "rgba(0,0,0,0)" : COLOR.blackColor,
          borderBottomWidth: 1,
        }}
      >
        {/* <View
          style={{
            marginBottom: 5,
            marginRight: 10,
            padding: 5,
            borderColor: COLOR.greyColor,
            borderWidth: 1,
            borderRadius: 5,
            flex: 1,
          }}
        > */}
        {/* {!editNote ? (
            <View>
              <Text style={{ fontFamily: 'open-sans', fontSize: 14, letterSpacing: 0.25 }}>{props.item.note}</Text>
            </View>
          ) : (
            <TextInput style={{backgroundColor: COLOR.whiteColor, borderWidth: 0}} autoCorrect={false} multiline={true} underlineColorAndroid="rgba(0,0,0,0)" underlineColor="rgba(0,0,0,0)" textAlignVertical="top" value={props.item.note} />
          )} */}
        {/* <View style={{ position: "absolute", bottom: 5, right: 5 }}>
            <TouchableOpacity
              onPress={() => {
                setEditNote(!editNote);
              }}
            >
              <MaterialCommunityIcons name="square-edit-outline" size={28} />
            </TouchableOpacity>
          </View> */}
        {/* </View> */}
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <MainButton
            styles={{
              width: useWindowDimensions().width * 0.25,
              borderRadius: 8,
            }}
            onPressHandler={() => setDeleteModal(true)}
          >
            <MaterialIcons name="delete" size={30} color={COLOR.whiteColor} />
          </MainButton>
          <View style={{position: 'absolute'}}>
            <CustomModal 
                  visible={deleteModal}
                  header={i18n.t('confirmDeleteTaskHeader')}
                  buttons={[
                      {
                          text: i18n.t('ok'),
                          action: () => props.onRemove(props.item.id)
                      }, 
                      {
                          text: i18n.t('cancel'),
                          action: () => {setDeleteModal(false)}
                      }
                  ]}
                  onRequestClose={() => {setDeleteModal(false)}
                }
              />
            </View>
          {/* <MainButton
            styles={{
              width: useWindowDimensions().width * 0.25,
              borderRadius: 8,
            }}
          >
            <MaterialIcons
              name="alarm-add"
              size={30}
              color={COLOR.whiteColor}
            />
          </MainButton> */}
          <MainButton
            styles={{
              width: useWindowDimensions().width * 0.25,
              borderRadius: 8,
              backgroundColor:
                props.item.important === 1
                  ? COLOR.redColor
                  : COLOR.primaryColor,
              borderColor:
                props.item.important === 1
                  ? COLOR.redColor
                  : COLOR.primaryColor,
            }}
            onPressHandler={() => props.markAsImportant(props.item)}
          >
            <MaterialIcons
              name="priority-high"
              size={30}
              color={
                props.item.important === 1 ? COLOR.whiteColor : COLOR.whiteColor
              }
            />
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
        name="more-vert"
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
            //width: useWindowDimensions.width,
            borderBottomColor: COLOR.primaryColor,         
          }}
        >
          <View
            style={{
              maxWidth: 50,
              justifyContent: "center", 
            }}
          >
            <TouchableOpacity onPress={() => props.markAsDone(props.item)} style={{height: 70, alignItems: 'center', justifyContent: 'center', padding: 5}} >
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
              justifyContent: 'center',
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontFamily: 'open-sans', fontSize: 16, letterSpacing: 0.5, textDecorationStyle: props.item.done === 1 ? 'solid' : null, textDecorationLine: props.item.done === 1 ? 'line-through' : null, color: props.item.done === 1 ? COLOR.greyColor : COLOR.blackColor }}>{props.item.title}</Text>
            {props.item.note !== '' ? <Text numberOfLines={showDetails ? null : 2} style={{ fontFamily: 'open-sans-italic', fontSize: 14, letterSpacing: 0.25, textDecorationStyle: props.item.done === 1 ? 'solid' : null, textDecorationLine: props.item.done === 1 ? 'line-through' : null, color: props.item.done === 1 ? COLOR.greyColor : COLOR.blackColor }}>{props.item.note}</Text> : null}
            <View
              style={{
                flex: (props.item.important === 1 || props.item.categories[0] !== 'default') ? 1 : 0,
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: (props.item.important === 1 || props.item.categories[0] !== 'default') ? 5 : 0,  
              }}
            >
              
                <View style={{ flexDirection: "row", alignItems: "center", width: '49%' }}>
                  {props.item.important === 1 ? 
                  <MaterialIcons name="priority-high" size={18} color={COLOR.redColor} /> : null
                  }
                  {props.item.categories[0] !== "default" ? (<View style={{flexDirection:'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons name="tag" size={18} color={props.categories ? props.categories.color : COLOR.whiteColor } />
                  <Text numberOfLines={showDetails ? null : 3} style={{ fontFamily: 'open-sans', fontSize: 14, letterSpacing: 0.25, }}>{props.categories ? props.categories.title : null}</Text></View>) : null}
              </View>
              {props.item.deadline !== "" ? (
                <View style={{flexDirection: "row", alignItems: "flex-end", justifyContent: 'flex-end'}}>
                  <MaterialCommunityIcons name="timelapse" size={18} />
                  <Text style={{ fontFamily: 'open-sans', fontSize: 14, letterSpacing: 0.25 }}>
                    {moment(new Date(props.item.deadline)).format('DD MMM YYYY')}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={{
              maxWidth: 50,
              justifyContent: "center",
              height: 70
            }}
          >
            <TouchableOpacity onPress={() => showDetailsHandler()} style={{height: 70, alignItems: 'center', justifyContent: 'center'}} >
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
          onRemove={props.onRemove}
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