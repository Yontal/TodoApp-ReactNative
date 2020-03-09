import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Header } from './components/Header'
import { Content } from './components/Content' 

export default function App() {

  const [items, setItems] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addItem = (item) => {
    setItems(previousState => [...previousState, {key: Math.random().toString(), itemValue: item}])
    setIsAddMode(false)
  }

  const onRemove = (key) =>{
    setItems(previousState => previousState.filter((item) => {return item.key !== key}))
  }

  const onCancelHandler = () => {
    setIsAddMode(false)
  }

  return (
    <View style={styles.container}>
      <Button 
        title="Add new item" 
        onPress={() => setIsAddMode(true)}/>
      <Header onAddItem={addItem} isAddMode={isAddMode} onCancel={onCancelHandler} />
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
