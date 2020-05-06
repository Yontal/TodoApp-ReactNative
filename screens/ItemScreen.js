import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, TextInput, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity, useWindowDimensions, Modal, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, pullTodoById, pullTodo } from '../store/actions/todo';
import { pullCategory } from '../store/actions/category';
import DateTimePicker from '../components/DateTimePicker';
import MainButton from '../components/MainButton';
import Picker from '../components/Picker';
import CategorySelector from '../components/CategorySelector';
import {InputField} from '../components/InputField';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
//import { Transition, Transitioning } from "react-native-reanimated";
import { Notifications } from 'expo';
import {localNotification, schedulingOptions} from '../services/LocalPushController.js';
import moment from 'moment';
import i18n from 'i18n-js';


import COLOR from '../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';

const ItemScreen = props => {
    const { navigation } = props;
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [todo, setTodo] = useState(navigation.getParam('task'));
    const [date, setDate] = useState();
    const [isChanging, setIsChanging] = useState(false);
    const [isCategorySelector, setIsCategorySelector] = useState(false);
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        dispatch(pullCategory());
    }, [dispatch])

    const setPushNotification = () => {
      schedulingOptions.time = new Date(todo.deadline);
      if (todo.categories[0] !== 'default') {
        localNotification.title = categories.find (cat => cat.id === todo.categories[0]).title;
        localNotification.body = todo.title;
      } else {
        localNotification.title = todo.title;
      }
      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    }  

      const onDateChange = (event, selectedDate) => {
        const currentDate = new Date(selectedDate);
        setShowDatePicker(false);     
        if(event.type === 'set'){
            setDate(currentDate);
            setShowTimePicker(true);
        }
      }

      const onTimeChange = (event, selectedDate) => {
        const currentDate = new Date(selectedDate);
        setShowDatePicker(false); 
        if(event.type === 'set'){
            const selectedTime = date;
            selectedTime.setHours(currentDate.getHours());
            selectedTime.setMinutes(currentDate.getMinutes());
            setShowDatePicker(false);
            setShowTimePicker(false);
            setDate(selectedTime);
            setTodo(prevTodo => ({...prevTodo, deadline: date.toString()}))
        }
            setShowTimePicker(false);
      }

      const setDeadline = () => {
        setShowDatePicker(true);
      }

      const setImportance = () => {
        const importantFlag = todo.important === 1 ? 0 : 1;
        const doneFlag = importantFlag === 1 ? 0 : todo.done;
        setTodo(prevTodo => ({...prevTodo, done: doneFlag, important: importantFlag}))
      }

      const setStatus = () => {
        const doneFlag = todo.done === 1 ? 0 : 1;
        const importantFlag = doneFlag === 1 ? 0 : todo.important;
        setTodo(prevTodo => ({...prevTodo, done: doneFlag, important: importantFlag}))
      }
      
      const saveChanges = () => {
        if(todo.title.trim() === ''){
            Alert.alert(i18n.t('taskTitleCannotBeEmpty'))
            return;
        } else if (new Date() > new Date(todo.deadline)) {
            Alert.alert(i18n.t('selectedDateInPast'));
            return;
        }
        // console.log(todo.deadline);
        // console.log(new Date(todo.deadline));
 //       setPushNotification();
        dispatch(updateTodo(todo));
        navigation.navigate({routeName: 'ItemsList'});
  //      dispatch(pullTodoById(todo.id.toString()));
      }

      const discardChanges = () => {
          setTodo(prevTodo => ({...navigation.getParam('task'), deadline: prevTodo.deadline}));
          setIsChanging(false);
      }
      const edit = () => {
        setIsChanging(true);
      }

      const setCategory = (category) => {
        setTodo(prevTodo => ({...prevTodo, categories: [category]}))
      }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={70}>
          <View
            style={{
              ...styles.inputArea,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 5,
              marginTop: 20,
            }}
          >
            <View
              style={{
                position: "absolute",
                top: -10,
                left: 15,
                backgroundColor: COLOR.whiteColor,
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ fontFamily: "open-sans" }}>{i18n.t('task')}</Text>
            </View>
            <TextInput
              value={todo.title}
              onChangeText={(todoNewTitle) =>
                setTodo((prevTodo) => ({ ...prevTodo, title: todoNewTitle }))
              }
              defaultValue={todo.title}
              style={{
                width: useWindowDimensions().width - 120,
                fontFamily: "open-sans",
                fontSize: 16,
                letterSpacing: 0.5
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{
                  ...styles.inputArea,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor:
                    todo.important === 1 ? COLOR.redColor : COLOR.accentColor,
                  borderWidth: 0,
                  padding: 0,
                  margin: 0,
                }}
                onPress={() => setImportance()}
              >
                {todo.done === 0 ? (
                  <MaterialIcons
                    name="priority-high"
                    size={30}
                    color={
                      todo.important === 1 ? COLOR.redColor : COLOR.greyColor
                    }
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.inputArea,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor:
                    todo.done === 1 ? COLOR.greenColor : COLOR.accentColor,
                  borderWidth: 0,
                  padding: 0,
                  margin: 0,
                }}
                onPress={() => setStatus()}
              >
                <MaterialCommunityIcons
                  name="checkbox-marked-circle"
                  size={30}
                  color={todo.done === 1 ? COLOR.greenColor : COLOR.greyColor}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={isCategorySelector}
              onRequestClose={() => {
                setIsCategorySelector(false);
              }}
            >
              <CategorySelector
                onSelected={() => setIsCategorySelector(false)}
                categories={categories}
                todo={todo}
                onSelectedHandler={setCategory}
                navigation={props.navigation}
              />
            </Modal>
            <TouchableOpacity
              onPress={() => setIsCategorySelector(true)}
              style={{
                ...styles.inputArea,
                height: 50,
                width: useWindowDimensions().width - 20,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -10,
                  left: 15,
                  backgroundColor: COLOR.whiteColor,
                  paddingHorizontal: 5,
                }}
              >
                <Text style={{ fontFamily: "open-sans" }}>{i18n.t('category')}</Text>
              </View>
              <View>
                <Text style={{ fontFamily: "open-sans", fontSize: 16, letterSpacing: 0.5 }}>
                  {todo.categories[0] === "default"
                    ? "-- choose a category --"
                    : categories.find((cat) => cat.id === todo.categories[0])
                        .title}
                </Text>
              </View>
              <View
                style={{
                  borderColor:
                    todo.categories[0] === "default"
                      ? COLOR.accentColor
                      : categories.find(
                          (cat) => cat.id === todo.categories[0]
                        ).color,
                  borderWidth: 1,
                  height: 15,
                  width: 25,
                  borderRadius: 4,
                  backgroundColor:
                    todo.categories[0] === "default"
                      ? COLOR.accentColor
                      : categories.find(
                          (cat) => cat.id === todo.categories[0]
                        ).color,
                }}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setDeadline}>
              <View
                style={{
                  ...styles.inputArea,
                  flexDirection: "row",
                  height: 50,
                  alignItems: "center",
                  width: useWindowDimensions().width - 20,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: -10,
                    left: 15,
                    backgroundColor: COLOR.whiteColor,
                    paddingHorizontal: 5,
                  }}
                >
                  <Text style={{ fontFamily: "open-sans" }}>{i18n.t('reminder')}</Text>
                </View>
                <Text style={{ fontFamily: "open-sans", fontSize: 16, letterSpacing: 0.5 }}>
                  {todo.deadline === ""
                    ? "No active reminder"
                    : moment(new Date(todo.deadline)).format('DD MMM YYYY, HH:mm')}
                </Text>

                <MaterialIcons
                  name="alarm-add"
                  size={30}
                  color={COLOR.accentColor}
                />
              </View>
            </TouchableOpacity>
              <View>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 28,
                    backgroundColor: COLOR.whiteColor,
                    zIndex: 100,
                    paddingHorizontal: 5,
                  }}
                >
                  <Text style={{ fontFamily: "open-sans" }}>{i18n.t('note')}</Text>
                </View>
                <TextInput
                  style={{
                    ...styles.inputArea,
                    width: useWindowDimensions().width - 20,
                    fontFamily: "open-sans",
                    fontSize: 16, 
                    letterSpacing: 0.5
                  }}
                  autoCorrect={false}
                  multiline={true}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  underlineColor="rgba(0,0,0,0)"
                  textAlignVertical="top"
                  value={todo.note}
                  onChangeText={(todoNewNote) =>
                    setTodo((prevTodo) => ({ ...prevTodo, note: todoNewNote }))
                  }
                  defaultValue={todo.note}
                />
              </View>
            
          </View>
          <View style={{ alignItems: "center" }}>
            <MainButton
              styles={{
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
              onPressHandler={saveChanges}
            >
              {i18n.t('save')}
            </MainButton>
          </View>

          {showDatePicker ? (
            <DateTimePicker
              value={new Date()}
              mode="date"
              onChange={onDateChange}
            />
          ) : showTimePicker ? (
            <DateTimePicker
              value={new Date()}
              mode="time"
              onChange={onTimeChange}
            />
          ) : null}
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
}

ItemScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: navigationData.navigation.getParam('task').title,
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
    },
    filterContainer:{
        flexDirection: 'row',
        width: '90%',
        marginVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
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
})

export default ItemScreen;