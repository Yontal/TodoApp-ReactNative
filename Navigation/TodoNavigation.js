import {createAppContainer, createStackNavigator} from 'react-navigation';
import ItemListsScreen from '../screens/ItemsListScreen';
import AddItemScreen from '../screens/AddItemScreen';

const StackNavigator = createStackNavigator({
    ItemsList: ItemListsScreen,
    AddItem: AddItemScreen

})

export default createAppContainer(StackNavigator)