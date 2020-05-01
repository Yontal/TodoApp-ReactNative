import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker} from 'react-native';

const CatPicker = props => {
    const [selectedValue, setSelectedValue] = useState(props.item.categories[0]);
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: "open-sans" }}>{props.label}</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemPosition) => {
            props.onValueChange(itemValue);
            setSelectedValue(itemValue);
          }}
          prompt="Select category from list below"
        >
          <Picker.Item label="not set" value="default" />
          {props.categories.map((category) => {
            return (
              <Picker.Item
                key={category.id}
                label={category.title}
                value={category.title}
              />
            );
          })}
        </Picker>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '90%',
        marginVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default CatPicker;