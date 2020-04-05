import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, pullTodoById } from '../store/actions/todo';
import DateTimePicker from '../components/DateTimePicker';

import COLOR from '../constants/colors';

const ItemScreen = props => {
    const [taskId, setTaskId] = useState(props.navigation.getParam('id'));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [date, setDate] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(pullTodoById(taskId))
    }, [dispatch])

    const todo = useSelector(state => state.todoItems.filteredTodos);

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
            todo.deadline = date.toString();
            dispatch(updateTodo(todo));
            dispatch(pullTodoById(taskId));
      }

      const setDeadline = () => {
        setShowDatePicker(true);
      }

    return(
        <View>
            <View>
                <View style={styles.row}><Text>Title: </Text><Text>{todo.title}</Text></View>
                <View style={styles.row}><Text>Importance: </Text><Text>{todo.important == 1 ? "high" : "low"}</Text></View>
                <View style={styles.row}><Text>Status: </Text><Text>{todo.done == 1 ? "yes" : "not yet"}</Text></View>
                {(todo.deadline !== '')? (<View style={styles.row}><Text>Deadline: </Text><Text>{todo.deadline}</Text></View>) : null}
            </View>
            {todo.done !== 1 ? (<View style={{backgroundColor: COLOR.accentColor}}>
                <Button color={COLOR.accentColor} onPress={() => setDeadline()} title="Set deadline" />
            </View>) : null }
            {showDatePicker ? 
                (<DateTimePicker value={new Date()} mode="date" onChange={onDateChange} />) : 
                    (showTimePicker ? 
                        (<DateTimePicker value={new Date()} mode="time" onChange={onTimeChange} />) : 
                    null 
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
    }
})

export default ItemScreen;