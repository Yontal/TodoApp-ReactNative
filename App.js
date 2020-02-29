import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from './components/Header'
import { Content } from './components/Content' 

export default function App() {

  const [items, setItems] = useState([])

  const addItem = (item) => {
    setItems(previousState => [...previousState, {key: Math.random().toString(), itemValue: item}]
    )
  }

  const onRemove = (key) =>{
    setItems(previousState => previousState.filter((item) => {return item.key !== key}))
  }

  return (
    <View style={styles.container}>
      <Header onAddItem={addItem} />
      <Content onRemove={onRemove} items={items}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 28,
    alignItems: 'stretch'
  },
});
