import React from 'react';
import { Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {createAppContainer, createStackNavigator, createDrawerNavigator} from 'react-navigation';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import ItemListsScreen from '../screens/ItemsListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import ItemScreen from '../screens/ItemScreen';
import CategoriesListScreen from '../screens/CategoriesListScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import Drawer from '../components/Drawer';
import i18n from 'i18n-js';

import COLORS from '../constants/colors';

const todosStackNavigator = createStackNavigator({
    ItemsList: {
        screen: ItemListsScreen,
        navigationOptions:{
            title: 'Task Runner',
            // headerTitleStyle: { justifyContent: 'center' },
            // headerTitleStyle: { 
            //     textAlign: 'left', 
            // },
            headerStyle: {
                backgroundColor: COLORS.primaryColor
            },
        }
    },
    AddItem: {
        screen: AddItemScreen,
        navigationOptions: () => ({
            title: i18n.t('addTask'),
            headerTitleStyle: { 
                textAlign: "left",
                flex:1,
                fontFamily: 'open-sans-bold',
            },
        })
    },
    Item: {
        screen: ItemScreen,
        navigationOptions:{
            title: i18n.t('taskDetails'),
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
            fontSize: 20,
            letterSpacing: .15,
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
      navigationOptions: () => ({
        title: i18n.t('categories'),
        headerStyle: {
          backgroundColor: COLORS.accentColor,
        },
        headerTintColor: "white",
      }),
    },
      Category: {
        screen: CategoryScreen,
        navigationOptions: () => ( {
          title: i18n.t('Category'),
          headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontFamily: "open-sans-bold",
          },
          headerTintColor: "white",
        }),
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
        navigationOptions: () => ({
            tabBarIcon: (tabInfo) => { return <Feather name="check-circle" size={25} color={tabInfo.tintColor} />},
            tabBarColor: COLORS.primaryColor,
            tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>{i18n.t('tasks')}</Text>)
        })
    },
    // Archive: {
    //     screen: archiveStackNavigator,
    //     navigationOptions: {
    //         tabBarIcon: (tabInfo) => {return <Feather name="archive" size={25} color={tabInfo.tintColor}  />},
    //         tabBarColor: COLORS.accentColor,
    //         tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>Archive</Text>)
    //     }
    // },
    Categories: {
        screen: categoriesStackNavigator,
        navigationOptions: () => ({
            tabBarIcon: (tabInfo) => {return <Feather name="tag" size={25} color={tabInfo.tintColor}  />},
            tabBarColor: COLORS.accentColor,
            tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>{i18n.t('categories')}</Text>)
        })
    },  
}

const BottomTabNavigator = createMaterialBottomTabNavigator(BottomTabNavRouteConfig,{
    activeColor: "white",
    shifting: true,
    sceneAnimationEnabled: false,
})

const DrawerNavigator = createDrawerNavigator(
  {
    MealFavs: {
      screen: BottomTabNavigator,
      navigationOptions: { drawerLabel: "All tasks" },
    },
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: "rgba(0,0,0,1)",
    overlayColor: "rgba(255,255,255,.0)",
    contentOptions: {
      activeTintColor: COLORS.whiteColor,
      activeBackgroundColor: COLORS.primaryColor,
      useNativeAnimations: false,
      labelStyle: {
        fontFamily: "open-sans",
      },
    },
    contentComponent: props => <Drawer {...props} />,
    drawerType: 'front',
    hideStatusBar: false,
  }
);

export default DrawerNavigator