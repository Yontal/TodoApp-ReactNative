import {createAppContainer, createStackNavigator} from 'react-navigation';
import ItemListsScreen from '../screens/ItemsListScreen';
import AddItemScreen from '../screens/AddItemScreen';

import COLORS from '../constants/colors'

const StackNavigator = createStackNavigator({
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
    AddItem: AddItemScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: COLORS.primaryColor,
        },
    }
})

export default createAppContainer(StackNavigator)