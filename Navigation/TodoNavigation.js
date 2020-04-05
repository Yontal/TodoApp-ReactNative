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
import ArchiveScreen from '../screens/ArchiveScreen';

import COLORS from '../constants/colors'

const todosStackNavigator = createStackNavigator({
    ItemsList: {
        screen: ItemListsScreen,
        navigationOptions:{
            title: 'Task manager',
            // headerTitleStyle: { justifyContent: 'center' },
            // headerTitleStyle: { 
            //     textAlign:"center", 
            //     flex:1 
            // },
            headerStyle: {
                backgroundColor: COLORS.primaryColor
            },
        }
    },
    AddItem: AddItemScreen,
    Item: {
        screen: ItemScreen,
        navigationOptions:{
            title: 'Task details',
            headerTitleStyle: { 
                textAlign: "left",
                flex:1,
            },
        },
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: COLORS.primaryColor,
        },
        headerTitleStyle: { 
            textAlign:"center",
            flex:1,
        },
        headerTintColor: 'white',
    }
})

const archiveStackNavigator = createStackNavigator({
    CategoriesList: {
        screen: ArchiveScreen,
        navigationOptions:{
            title: 'Archive',
            headerStyle: {
                backgroundColor: COLORS.accentColor,
            },
            headerTintColor: 'white',
        }
    },
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: COLORS.primaryColor,
        },
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        },
    }
})

const BottomTabNavRouteConfig = {
    Todos:{
        screen: todosStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Feather name="check-circle" size={25} color={tabInfo.tintColor} />},
            tabBarColor: COLORS.primaryColor,
            tabBarLabel: (<Text>Todo</Text>)
        }
    },
    Categories: {
        screen: archiveStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {return <Feather name="archive" size={25} color={tabInfo.tintColor}  />},
            tabBarColor: COLORS.accentColor,
            tabBarLabel: (<Text>Archive</Text>)
        }
    }  
}

const BottomTabNavigator = createMaterialBottomTabNavigator(BottomTabNavRouteConfig,{
    activeColor: "white",
    shifting: true,
    sceneAnimationEnabled: false,
})

export default createAppContainer(BottomTabNavigator)