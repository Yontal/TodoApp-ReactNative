import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useScreens, enableScreens } from 'react-native-screens'
import StackNavigator from './Navigation/TodoNavigation'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {createAppContainer} from 'react-navigation';
import MainNavigator from './Navigation/TodoNavigation';
import ruDate from './constants/locale/datetime';
import moment from 'moment';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoItemsReducer from './store/reducers/todo';
import categoriesReducer from './store/reducers/category';
import { initTodoTable, initDeadlineColumn, initNoteColumn, initNotificationIdColumn, initCategoriesTable } from './helpers/db'
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import ru from './constants/locale/ru';
import en from './constants/locale/en';

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
  initNotificationIdColumn()  
  .then(() => {
    console.log('notificationId column was added')
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

const AppContainer = createAppContainer(MainNavigator);


export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  i18n.translations = {
    en: en,
    ru: ru,
  };
  // Set the locale once at the beginning of your app.
  i18n.locale = Localization.locale;
  // When a value is missing from a language it'll fallback to another language with the key present.
  i18n.fallbacks = true;
  moment.updateLocale('ru', ruDate);
  moment.locale(Localization.locale);
  if(!appLoaded){
    return (<AppLoading startAsync={fetchFonts} onFinish={() => setAppLoaded(true)} />);
  }

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
