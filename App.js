import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useScreens, enableScreens } from 'react-native-screens'
import StackNavigator from './Navigation/TodoNavigation'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoItemsReducer from './store/reducers/todo';
import categoriesReducer from './store/reducers/category';
import { initTodoTable, initDeadlineColumn, initNoteColumn, initCategoriesTable } from './helpers/db'

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
  initNoteColumn()  
  .then(() => {
    console.log('note column was added')
  })
  .catch(err => {
    console.log('note column is already exist')
    console.log(err)
  });
  initCategoriesTable()
  .then(() => {
    console.log('categories table was initialized')
  })
  .catch(err => {
    console.log('categories table initialization failed')
    console.log(err)
  });


const rootReducer = combineReducers({
  todoItems: todoItemsReducer,
  categories: categoriesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
  });
};

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  if(!appLoaded){
    return (<AppLoading startAsync={fetchFonts} onFinish={() => setAppLoaded(true)} />);
  }

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
