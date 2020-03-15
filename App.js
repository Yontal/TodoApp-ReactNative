import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useScreens } from 'react-native-screens'
import StackNavigator from './Navigation/TodoNavigation'

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import todoItemsReducer from './store/reducers/todo'

useScreens();

const rootReducer = combineReducers({
  todoItems: todoItemsReducer,
})

const store = createStore(rootReducer);

export default function App() {


  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
