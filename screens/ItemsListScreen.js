import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button,  TouchableOpacity, TouchableHighlight } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../components/Header';
import TodoItem from '../models/TodoItem';
import { insertTodo, removeTodo, pullTodo, updateTodo, filterTodos } from '../store/actions/todo';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import COLOR from '../constants/colors'


const ItemsListScreen = props => {
    const dispatch = useDispatch();
    const todoItems = useSelector(state => {
        if(!props.navigation.getParam('title')){
            return state.todoItems.todoItems
        } else {
            return state.todoItems.filteredTodos;
        }
    });

    const Clear = props => { 
        return (<TouchableOpacity style={styles.clear} onPress={() => {}}><Text>X</Text></TouchableOpacity>)  
    }
    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        dispatch(pullTodo());
    }, [dispatch])


    const addItem = (item) => {
        const newTodo = new TodoItem(Math.random().toString(), item, false, false, item.categories);
        setIsAddMode(false);
        dispatch(insertTodo(newTodo));
    }
    
    const onRemove = (id) =>{
        dispatch(removeTodo(id));
    }
  
    const onCancelHandler = () => {
      setIsAddMode(false);
    }

    const markAsImportant = (todo) =>{
        const importantFlag = (todo.important === 1) ? 0 : 1;
        todo.important = importantFlag;
        dispatch(updateTodo(todo));
    }

    
    const markAsDone = (todo) =>{
        const doneFlag = (todo.done === 1) ? 0 : 1;
        todo.done = doneFlag;
        dispatch(updateTodo(todo));
    }
    
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };
    
    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...todoItems];
        const prevIndex = todoItems.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);
    };
    
    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };
    
    const renderItem = data => (
        <TouchableHighlight
            onPress={() => {
                console.log('You touched me')
//                props.navigation.navigate('AddItem');
            }}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={styles.rowFrontInner}>
                <View style={styles.todoTitle}><Text>{data.item.title}</Text></View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity 
                        onLongPress={() => {markAsImportant(data.item)}}>
                            <Feather 
                                name="flag" 
                                size={23}
                                color={data.item.important === 1 ? COLOR.redColor : COLOR.blackColor} 
                                style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onLongPress={() => {markAsDone(data.item)}}>
                            <Feather 
                                name="check" 
                                size={23}
                                color={data.item.done === 1 ? COLOR.greenColor : COLOR.blackColor}  
                                style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableHighlight>
    );
    
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text></Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => {
                    closeRow(rowMap, data.item.id)
                    props.navigation.navigate({routeName: 'Item', params: {
                        todo: data.item,
                    }})}
                }
            >
                <Text style={styles.backTextWhite}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                    deleteRow(rowMap, data.item.id)
                    onRemove(data.item.id)
                }
            }
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>)

    return(
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Button 
                title="Add new item" 
                onPress={() => setIsAddMode(true)} color={COLOR.accentColor} />
                <Header onAddItem={addItem} isAddMode={isAddMode} onCancel={onCancelHandler} placeholder="Type your todo item" />
            </View>
            <View style={styles.contentContainer}>
                <SwipeListView
                        data={todoItems}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={onRowDidOpen}
                        disableRightSwipe={true}
                        keyExtractor={item => item.id}
                        onRemove={onRemove}
                        contentContainerStyle={styles.list}
                        initialNumToRender={15}
                    />
            </View>
            <Clear />
        </View>
        );
}

const styles = StyleSheet.create({
    clear:{
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: COLOR.whiteColor,
        borderColor: COLOR.accentColor,
        borderRadius: 25,
        borderWidth: 1,
        bottom: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
      },
    contentContainer:{
        width: '100%',
        backgroundColor: '#EAEAEA',
        alignContent:'flex-start',
        flex: 1
    },
    list:{
        flexGrow: 1,
    },
    backTextWhite: {
        color: '#FFF',
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
    rowFrontInner: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconsContainer: {
        flexDirection: 'row',
        minWidth: '15%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    icon: {
        padding: 5,
    },
    todoTitle: {
        maxWidth: '80%',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: COLOR.accentColor,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: COLOR.accentColor,
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    }
})

const mapDispatchToProps = dispatch => {
    return{

    }
};

const mapStateToProps = state => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (ItemsListScreen);