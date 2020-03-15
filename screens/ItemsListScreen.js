import React, { useState } from 'react';
import { View, StyleSheet, Text, Button,  TouchableOpacity, TouchableHighlight} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector } from 'react-redux';
import { Header } from '../components/Header';
import TodoItem from '../models/TodoItem';

const ItemsListScreen = props =>{

    const todoItems = useSelector(state => state.todoItems.todoItems);
    const [listData, setListData] = useState(todoItems);
    const [isAddMode, setIsAddMode] = useState(false);
  
    const addItem = (item) => {
        const newTodo = new TodoItem(Math.random().toString(), item);
        setListData(previousState => previousState.concat(newTodo))
      setIsAddMode(false)
    }
  
    const onRemove = (id) =>{
        setListData(previousState => previousState.filter((item) => {return item.id !== id}))
    }
  
    const onCancelHandler = () => {
      setIsAddMode(false)
    }
    
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };
    
    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };
    
    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };
    
    const renderItem = data => (
        <TouchableHighlight
            onPress={() => {
                console.log('You touched me')
                props.navigation.navigate('AddItem');
            }}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>{data.item.title}</Text>
            </View>
        </TouchableHighlight>
    );
    
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text></Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.id)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
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
                onPress={() => setIsAddMode(true)}/>
                <Header onAddItem={addItem} isAddMode={isAddMode} onCancel={onCancelHandler} />
            </View>
            <View style={styles.contentContainer}>
                <SwipeListView
                        data={listData}
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
                    />
            </View>
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
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
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
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    }
})

export default ItemsListScreen;