import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, pullTodoById } from '../store/actions/todo';
import DateTimePicker from '../components/DateTimePicker';
import MainButton from '../components/MainButton';
import {InputField} from '../components/InputField';

import COLOR from '../constants/colors';

const SwitchButton = props => {
    return(
        <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>{props.label}</Text>
            <Switch value={props.value} onValueChange={props.onToggle} trackColor={{true: COLOR.primaryColor}} thumbColor={COLOR.primaryColor} />
        </View>
    );
}

const ItemScreen = props => {
    const { navigation } = props;
    // const [taskId, setTaskId] = useState(props.navigation.getParam('id'));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [todo, setTodo] = useState(navigation.getParam('task'));
    const [date, setDate] = useState();
    const [isChanging, setIsChanging] = useState(false);

    const dispatch = useDispatch();

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
        }
            setShowTimePicker(false);
            setTodo(prevTodo => ({...prevTodo, deadline: date.toString()}))
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
        if(!isChanging){
            return;
        }
        if(todo.title === ''){
            Alert.alert('Type something')
            return;
        }
        dispatch(updateTodo(todo));
        navigation.navigate({routeName: 'ItemsList'});
      }

      const discardChanges = () => {
          setTodo(prevTodo => ({...navigation.getParam('task'), deadline: prevTodo.deadline}));
          setIsChanging(false);
      }

    return(
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View>
            {isChanging === false ? (
            <View>
                <View style={styles.row}><Text>Task: </Text><Text>{todo.title}</Text></View>
                <View style={styles.row}><Text>Importance: </Text><Text>{todo.important == 1 ? "high" : "low"}</Text></View>
                <View style={styles.row}><Text>Status: </Text><Text>{todo.done == 1 ? "done" : "not yet done"}</Text></View>
                <View style={styles.row}><Text>Deadline: </Text><Text>{todo.deadline !== '' ? ((new Date(todo.deadline)).toLocaleDateString() + ' ' + (new Date(todo.deadline)).toLocaleTimeString()) : "not yet set"}</Text></View>
            </View>
        ) : (
            <View style={{alignItems: 'center'}}>
                <View style={styles.inputArea}>
                    <TextInput 
                            value={todo.title}
                            onChangeText={(todoNewTitle)=>setTodo(prevTodo => ({...prevTodo, title: todoNewTitle.trim()}))}
                            defaultValue={todo.title}
                            style={{width: '100%'}}
                        />
                </View>
                <SwitchButton value={todo.important == 1 ? true : false} label="Importance:" onToggle={() => setImportance()} />
                {/* <SwitchButton value={todo.done == 1 ? true : false} label="Status:" onToggle={() => setStatus()} /> */}
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <MainButton styles={{width: Dimensions.get('window').width*0.9, paddingHorizontal: 5}} onPressHandler={setDeadline}>{todo.deadline === '' ? 'Set deadline' : 'Deadline: ' + ((new Date(todo.deadline)).toLocaleDateString() + ' ' + (new Date(todo.deadline)).toLocaleTimeString())}</MainButton>
                </View>
            </View>)
            }
            
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <MainButton styles={{width: Dimensions.get('window').width*0.4, paddingHorizontal: 5, margin: Dimensions.get('window').width * 0.05, backgroundColor: isChanging ? COLOR.redColor : COLOR.primaryColor}} onPressHandler={() => {isChanging ? discardChanges() : setIsChanging(true)}}>{isChanging ? 'Discard changes' : 'Edit'}</MainButton>
                    <MainButton styles={{width: Dimensions.get('window').width*0.4, paddingHorizontal: 5, margin: Dimensions.get('window').width * 0.05, backgroundColor: isChanging ? COLOR.greenColor : COLOR.greyColor}} onPressHandler={saveChanges}>Save</MainButton>
            </View>
            {showDatePicker ? 
                (<DateTimePicker value={new Date()} mode="date" onChange={onDateChange} />) : 
                    (showTimePicker ? 
                        (<DateTimePicker value={new Date()} mode="time" onChange={onTimeChange} />) : 
                    null 
            )}
        </View>
        </TouchableWithoutFeedback>
    );
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
        width: '90%'
    },
})

export default ItemScreen;