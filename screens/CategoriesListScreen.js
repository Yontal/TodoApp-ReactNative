import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, FlatList, Text, TouchableNativeFeedback, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { InputField } from '../components/InputField';
import NothingFound from '../components/NothingFound';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {CustomHeaderButton, CustomHeaderButtonEmpty} from '../components/HeaderButton';
import COLOR from '../constants/colors';
import { insertCategory, pullCategory, removeCategory } from '../store/actions/category';
import { updateTodo } from '../store/actions/todo';
import Category from '../models/Category';
import AddButton from '../components/AddButton';
// import Category from '../models/Category';
const CategoriesListScreen = props => {
    const categories = useSelector(state => state.categories.categories);
    const todos = useSelector(state => state.todoItems.todoItems);
    const dispatch = useDispatch();

    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        dispatch(pullCategory());
    }, [dispatch])

    const onCancelHandler = () => {
        setIsAddMode(false);
    }

    const addItem = (item) => {
        const newCategory = new Category(Math.random().toString(), item);
        if(categories.some(cat => cat.title === item)){
            Alert.alert("The category with such name is already exists");
            return;
        }
        setIsAddMode(false);
        dispatch(insertCategory(newCategory));
        dispatch(pullCategory());
    }

    const selectCategoryHandler = (category) => {
        // dispatch(filterTodos(title));
        
        props.navigation.navigate({routeName: 'Category', params: {category: category}});
    }

    const onRowDidOpen = rowKey => {
        
    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };
    const onRemove = (id) =>{
        dispatch(removeCategory(id));
        todos.forEach(element => {
          if(element.categories[0] === id){
            element.categories[0] = 'default';
            dispatch(updateTodo(element));
          }
        });
    }

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...categories];
        const prevIndex = categories.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
    };
      
      const renderItem = data => (
        <TouchableHighlight
            onPress={() => {selectCategoryHandler(data.item)}}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}> 
            <Text style={{ fontFamily: "open-sans", fontSize: 16, letterSpacing: 0.5 }}>
                {data.item.title}
            </Text>
          {/* </View> */}
            <View
            style={{
              borderColor: data.item.color,
              borderWidth: 1,
              height: 15,
              width: 25,
              borderRadius: 4,
              backgroundColor: data.item.color,
              paddingRight: 2
            }}
            ></View>
          </View>
        </TouchableHighlight>
    );

      const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
          <Text></Text>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => {
              deleteRow(rowMap, data.item.id);
              onRemove(data.item.id);
            }}
          >
            <Text style={styles.backTextWhite}>Delete</Text>
          </TouchableOpacity>
        </View>
      );

    return(
        <View style={styles.mainContainer}>
            {/* <View style={styles.headerContainer}>
                <InputField onAddItem={addItem} isAddMode={isAddMode} onCancel={onCancelHandler} placeholder="Type category name" />
            </View> */}
            {/* <FlatList 
            data={categories}
            renderItem={data => (
                <TouchableNativeFeedback onPress={() => {selectCategoryHandler(data.item)}}>
                    <View style={styles.rowFront}>
                        <Text>{data.item.title}</Text>
                    </View>
                </TouchableNativeFeedback>
                )
            } 
            keyExtractor={item => item.id} /> */}
            <View style={styles.contentContainer}>
                    {(categories.length < 1) ? (<NothingFound message="There is no categories yet" />) : null}
                    <SwipeListView
                            data={categories}
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
                <AddButton onPress={() => {props.navigation.navigate({routeName: 'Category', params: {category: new Category((+new Date()).toString(), '', '#C7C7C7'), newCategory: true}})}} />
                
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer:{
        width: '100%',
        backgroundColor: COLOR.whiteColor,
        alignContent:'flex-start',
        flex: 1,
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
      // rowFront: {
      //   alignItems: 'flex-start',
      //   paddingHorizontal: 15,
      //   backgroundColor: COLOR.whiteColor,
      //   borderBottomColor: COLOR.accentColor,
      //   borderBottomWidth: 1,
      //   justifyContent: 'center',
      //   minHeight: 50,
      // },
      rowFront: {
        alignItems: 'flex-start',
        marginHorizontal: 5,
        marginVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: COLOR.whiteColor,
        borderBottomColor: COLOR.greyColor,
        borderBottomWidth: 1,
        justifyContent: 'center',
        minHeight: 50,
    },
    backTextWhite: {
        color: '#FFF',
        fontFamily: 'open-sans',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        maxHeight: 50,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        height: 45,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: COLOR.accentColor,
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

CategoriesListScreen.navigationOptions = (navData) => {
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
        <HeaderButtons HeaderButtonComponent={CustomHeaderButtonEmpty}>
          <Item
            onPress={() => null}
            iconName="menu"
            title="Menu"
          />
        </HeaderButtons>
      ),
    };
  }

export default CategoriesListScreen;