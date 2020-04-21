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
                fontFamily: 'open-sans-bold',
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
            fontFamily: 'open-sans-bold',
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
            flex:1,
            fontFamily: 'open-sans-bold',
        },
    }
})

const categoriesStackNavigator = createStackNavigator(
  {
    CategoriesList: {
      screen: CategoriesListScreen,
      navigationOptions: {
        title: "Categories",
        headerStyle: {
          backgroundColor: COLORS.accentColor,
        },
        headerTintColor: "white",
      },
    },
      Category: {
        screen: CategoryScreen,
        navigationOptions: {
          title: "Category",
          headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontFamily: "open-sans-bold",
          },
          headerTintColor: "white",
        },
      },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.primaryColor,
      },
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontFamily: "open-sans-bold",
      },
    },
  }
);

const BottomTabNavRouteConfig = {
    Todos:{
        screen: todosStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Feather name="check-circle" size={25} color={tabInfo.tintColor} />},
            tabBarColor: COLORS.primaryColor,
            tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>Tasks</Text>)
        }
    },
    Archive: {
        screen: archiveStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {return <Feather name="archive" size={25} color={tabInfo.tintColor}  />},
            tabBarColor: COLORS.accentColor,
            tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>Archive</Text>)
        }
    },
    Categories: {
        screen: categoriesStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {return <Feather name="tag" size={25} color={tabInfo.tintColor}  />},
            tabBarColor: COLORS.accentColor,
            tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>Categories</Text>)
        }
    },  
}

const BottomTabNavigator = createMaterialBottomTabNavigator(BottomTabNavRouteConfig,{
    activeColor: "white",
    shifting: true,
    sceneAnimationEnabled: false,
})

export default createAppContainer(BottomTabNavigator)