import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert,  TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import { InputField } from '../components/InputField';
import NothingFound from '../components/NothingFound';
import TodoItem from '../models/TodoItem';
import TodoItemView from '../components/TodoItemView'
import { insertTodo, removeTodo, pullTodo, updateTodo } from '../store/actions/todo';
import { pullCategory } from '../store/actions/category';
import { connect } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton, CustomHeaderButtonEmpty, ClearFilterHeaderButton } from '../components/HeaderButton';
import { MaterialIcons } from '@expo/vector-icons';
import ProgressBar from '../components/ProgressBar';
import AddButton from '../components/AddButton';
import COLOR from '../constants/colors';
import i18n from 'i18n-js';
import * as Updates from 'expo-updates'

const ItemsListScreen = props => {
    const dispatch = useDispatch();
    const todoItems = useSelector(state => state.todoItems.filteredTodos.filter(todo => todo.archive !== 1));
    const categories = useSelector(state => state.categories.categories);
    const selectedCategory = useSelector(state => state.todoItems.filterSettings);
    const [countOfDone, setCountOfDone] = useState(todoItems.filter(item => item.done == 1).length);
    const [countOfAllTasks, setCountOfAllTasks] = useState(todoItems.length);

    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        dispatch(pullTodo());
        dispatch(pullCategory());
    }, [dispatch])

    useEffect(() => {
        checkUpdateApplication();
    }, [])

    const runExpoUpdate = async () => {
        await Updates.fetchUpdateAsync();
        Updates.reloadFromCache();
    }
    
    const checkUpdateApplication = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                Alert.alert(
                    i18n.t('updateAvailableHeader'),
                    i18n.t('updateAvailableBody'),
                    [
                    {
                        text: i18n.t('cancel'),  
                        style: "cancel"
                    },
                    { text: i18n.t('ok'), onPress: () => runExpoUpdate() }
                    ]
                );
            }
        } catch (e) {
            Alert.alert(i18n.t('updateAvailableError'))
        }
    }

    // const [indexToAnimate, setIndexToAnimate] = useState(null);
    const addItem = (item) => {
        const newTodo = new TodoItem(Math.random().toString(), item, false, false, selectedCategory !== '' ? [selectedCategory] : undefined, false);
        setIsAddMode(false);
        dispatch(insertTodo(newTodo));
        dispatch(pullTodo());
    }

    const onRemove = (id) =>{
        dispatch(removeTodo(id));
    }

    const onRemoveWithApprove = (id) =>{
        Alert.alert(
            i18n.t('confirmDeleteTaskHeader'),
            i18n.t('confirmDeleteTaskBody'),
            [
              {
                text: i18n.t('cancel'),  
                style: "cancel"
              },
              { text: i18n.t('ok'), onPress: () => dispatch(removeTodo(id)) }
            ]
          );
    }
  
    // const onCancelHandler = () => {
    //   setIsAddMode(false);
    // }

    const markAsImportant = (todo) =>{
        const importantFlag = todo.important === 1 ? 0 : 1;
        //const doneFlag = importantFlag === 1 ? 0 : todo.done;
        todo.important = importantFlag;
        //todo.done = doneFlag;
        dispatch(updateTodo(todo));
    }

    
    const markAsDone = (todo) =>{
        const doneFlag = todo.done === 1 ? 0 : 1;
        //const importantFlag = doneFlag === 1 ? 0 : todo.important;
        todo.done = doneFlag;
        //todo.important = importantFlag;
        dispatch(updateTodo(todo));
    }

    const markAsArchived = (todo) =>{
        const archiveFlag = 1;
        todo.archive = archiveFlag;
        dispatch(updateTodo(todo));
    }
    
    const itemPressHandler = task => {
        props.navigation.navigate({routeName: 'Item', params: {task: task}})
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
//     <View>
//     <TouchableHighlight
//       style={
//         data.item.done === 1
//           ? { ...styles.rowFront, ...styles.rowFrontDone }
//           : data.item.important === 1
//           ? { ...styles.rowFront, ...styles.rowFrontImportant }
//           : styles.rowFront
//       }
//       underlayColor={"#AAA"}
//       onPress={() => itemPressHandler(data.item)}
//     >
//       <View style={styles.rowFrontInner}>
//         <TouchableOpacity
//           onPress={() => {setIndexToAnimate(data.item.id)
//             markAsDone(data.item);
//           }}
//         >
//           {data.item.done === 1 ? (
//             <MaterialCommunityIcons
//               name="checkbox-marked-circle"
//               size={23}
//               color={COLOR.greenColor}
//               style={styles.icon}
//             />
//           ) : (
//             <MaterialCommunityIcons
//               name="checkbox-blank-circle-outline"
//               size={23}
//               color={COLOR.greyColor}
//               style={styles.icon}
//             />
//           )}
//         </TouchableOpacity>
//         <View style={styles.rowFrontInnerInner}>
//           <View style={styles.todoTitle}>
//             <Text style={{ fontFamily: "open-sans" }}>
//               {data.item.title}
//             </Text>
//           </View>
//           <View>
//             <Text style={{ fontFamily: "open-sans" }}>
//               {data.item.deadline !== ""
//                 ? "Deadline: " +
//                   new Date(data.item.deadline).toLocaleDateString()
//                 : null}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableHighlight>
//     <SlideView initialValue={data.item.done === 1 ? 0 : 150} open={data.item.done === 1 ? true : false} />
//   </View>
    const renderItem = (data) => (
      <TodoItemView
        item={data.item}
        markAsDone={markAsDone}
        markAsImportant={markAsImportant}
        markAsArchived={markAsArchived}
        itemPressHandler={itemPressHandler}
        onRemove={onRemoveWithApprove}
        categories={categories.find(
          (cat) => cat.id === data.item.categories[0]
        )}
      />
    );
    
    
    const renderHiddenItem = (data, rowMap) => (
      <View style={styles.rowBack}>
        <Text></Text>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {
            deleteRow(rowMap, data.item.id);
            markAsArchived(data.item);
          }}
        >
          {/* <Text style={{...styles.backTextWhite, fontFamily: 'open-sans', fontSize: 16, letterSpacing: 0.5 }}>Delete</Text> */}
          <MaterialIcons name="delete" size={30} color={COLOR.whiteColor} />
        </TouchableOpacity>
        {/* <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
            closeRow(rowMap, data.item.id);
            markAsImportant(data.item);
            //     props.navigation.navigate({routeName: 'Item', params: {
            //         todo: data.item,
            // }})
        }
    }   
    >
        <Text style={styles.backTextWhite}>Important</Text>
    </TouchableOpacity> */}
      </View>
    );

    return(
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}/>        
                <InputField onAddItem={addItem} placeholder={i18n.t('quickAddTask')} />
                <View style={styles.contentContainer}>
                    {(todoItems.length < 1) ? (<NothingFound message={i18n.t('noTasks')} />) : null}
                    <SwipeListView
                            data={todoItems}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            leftOpenValue={75}
                            rightOpenValue={-80}
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
            {/* <KeyboardAvoidingView style={styles.inputTodoContainer} keyboardVerticalOffset={30} enabled="true"> */}
         
            {/* </KeyboardAvoidingView> */}
            <View style={styles.progress}>
                <ProgressBar tasks={todoItems} />
            </View>
            <AddButton onPress={() => {props.navigation.navigate('AddItem')}} />
        </View>
        );
}

const styles = StyleSheet.create({
    progress:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
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
        paddingHorizontal: 5,
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
    rowFrontInnerInner: {
        flex: 1,
        flexDirection: 'row',
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
        maxWidth: '60%',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        maxHeight: 80,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        height: 60,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: COLOR.accentColor,
        right: 75,
        borderRadius: 15,
        marginRight: 5,
    },
    backRightBtnRight: {
        backgroundColor: COLOR.primaryColor,
        right: 0,
        borderRadius: 8,
        marginHorizontal: 2,
    }
})

ItemsListScreen.navigationOptions = (navData) => {
    let showFilter = navData.navigation.getParam('filter');
    let clearFilter = navData.navigation.getParam('clearFilter');
    return {
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            onPress={() => navData.navigation.toggleDrawer()}
            iconName="menu"
            title="Menu"
          />
        </HeaderButtons>
      ),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={(showFilter)  ? ClearFilterHeaderButton : CustomHeaderButtonEmpty}>
          <Item
            onPress={clearFilter}
            iconName={(showFilter)  ? "filter-remove" : "menu"}
            title="Clear"
          />
        </HeaderButtons>
      ),
    };
}

const mapDispatchToProps = dispatch => {
    return{

    }
};

const mapStateToProps = state => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (ItemsListScreen);