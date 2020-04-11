import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useScreens } from 'react-native-screens'
import StackNavigator from './Navigation/TodoNavigation'

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoItemsReducer from './store/reducers/todo';
import categoriesReducer from './store/reducers/category';
import { initTodoTable, initDeadlineColumn } from './helpers/db'

useScreens();
initTodoTable()
  .then(() => {
    console.log('todos.db was initialized')
  })
  .catch(err => {
    console.log('todos.db initialization failed')
    console.log(err)
  });
  initDeadlineColumn()  
  .then(() => {
    console.log('deadline column was added')
  })
  .catch(err => {
    console.log('deadline column is already exist')
    console.log(err)
  });


const rootReducer = combineReducers({
  todoItems: todoItemsReducer,
  categories: categoriesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
