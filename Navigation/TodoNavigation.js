import React from 'react';
import { Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {createAppContainer, createStackNavigator} from 'react-navigation';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import ItemListsScreen from '../screens/ItemsListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import ItemScreen from '../screens/ItemScreen';
import CategoriesListScreen from '../screens/CategoriesListScreen';
import CategoryScreen from '../screens/CategoryScreen';

import COLORS from '../constants/colors'

const todosStackNavigator = createStackNavigator({
    ItemsList: {
        screen: ItemListsScreen,
        navigationOptions:{
            title: 'Todo',
            headerStyle: {
                backgroundColor: COLORS.primaryColor,
            },
            headerTintColor: 'white',
        }
    },
    AddItem: AddItemScreen,
    Item: ItemScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: COLORS.primaryColor,
        },
    }
})

const categoriesStackNavigator = createStackNavigator({
    CategoriesList: {
        screen: CategoriesListScreen,
        navigationOptions:{
            title: 'Categories',
            headerStyle: {
                backgroundColor: COLORS.accentColor,
            },
            headerTintColor: 'white',
        }
    },
    Category: CategoryScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: COLORS.primaryColor,
        },
    }
})

const BottomTabNavRouteConfig = {
    Todos:{
        screen: todosStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Feather name="check-square" size={25} color={tabInfo.tintColor} />},
            tabBarColor: COLORS.primaryColor,
            tabBarLabel: (<Text>Todo</Text>)
        }
    },
    Categories: {
        screen: categoriesStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {return <Feather name="folder-plus" size={25} color={tabInfo.tintColor}  />},
            tabBarColor: COLORS.accentColor,
            tabBarLabel: (<Text>Categories</Text>)
        }
    }  
}

const BottomTabNavigator = createMaterialBottomTabNavigator(BottomTabNavRouteConfig,{
    activeColor: "white",
    shifting: true,
})

export default createAppContainer(BottomTabNavigator)