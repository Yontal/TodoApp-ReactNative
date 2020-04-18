import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, pullTodo, updateTodo } from '../store/actions/todo';
import { Feather } from '@expo/vector-icons';
import NothingFound from '../components/NothingFound';
import COLOR from '../constants/colors';

const ArchiveScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pullTodo());
    }, [dispatch])

    const todoItems = useSelector(state => state.todoItems.todoItems.filter(todo => todo.archive == 1));

    const onRemove = (id) =>{
        dispatch(removeTodo(id));
    }

    const restore = (todo) =>{
        const archiveFlag = 0;
        todo.archive = archiveFlag;
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
        // console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            style={data.item.done === 1 ? {...styles.rowFront, ...styles.rowFrontDone} : (data.item.important === 1 ? {...styles.rowFront, ...styles.rowFrontImportant} : styles.rowFront) }
            underlayColor={'#AAA'}
        >
            <View style={styles.rowFrontInner}>
                {/* <TouchableOpacity
                        onPress={() => {markAsDone(data.item)}}>
                            <Feather 
                                name="check-circle" 
                                size={23}
                                color={data.item.done === 1 ? COLOR.greenColor : COLOR.greyColor}  
                                style={styles.icon} />
                    </TouchableOpacity> */}
                <View style={styles.todoTitle}><Text style={{fontFamily: 'open-sans'}}>{data.item.title}</Text></View>
                <View style={styles.iconsContainer}>
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
                    closeRow(rowMap, data.item.id);
                    deleteRow(rowMap, data.item.id)
                    restore(data.item);                    
                    }
                }
            >
                <Text style={styles.backTextWhite}>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                    closeRow(rowMap, data.item.id);
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
            </View>
            <View style={styles.contentContainer}>
            {(todoItems.length < 1) ? (<NothingFound message="There is no archived task yet" />) : null}
                <SwipeListView
                        data={todoItems}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-155}
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
        backgroundColor: COLOR.whiteColor,
        alignContent:'flex-start',
        flex: 1
    },
    list:{
        flexGrow: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontFamily: 'open-sans',
    },
    rowFront: {
        alignItems: 'flex-start',
        marginHorizontal: 5,
        marginVertical: 2,
        paddingHorizontal: 15,
        backgroundColor: COLOR.whiteColor,
        borderBottomColor: COLOR.greyColor,
        borderBottomWidth: 1,
        justifyContent: 'center',
        minHeight: 50,
    },
    rowFrontImportant: {
        borderBottomColor: COLOR.redColor,
        borderColor: COLOR.redColor,
        borderWidth: 1,
        backgroundColor: COLOR.redHighlightColor,
        borderRadius: 10,
    },
    rowFrontDone: {
        borderBottomColor: COLOR.greenColor,
        borderColor: COLOR.greenColor,
        borderWidth: 1,
        backgroundColor: COLOR.greenHighlight,
        borderRadius: 10,
    },
    rowFrontInner: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 3,
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
        backgroundColor: COLOR.greenColor,
        right: 75,
        borderRadius: 15,
        marginRight: 5,
    },
    backRightBtnRight: {
        backgroundColor: COLOR.redColor,
        right: 0,
        borderRadius: 15,
    }
})

export default ArchiveScreen;