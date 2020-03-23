import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Header } from '../components/Header';

import COLOR from '../constants/colors';

const CategoriesListScreen = props => {
    const [isAddMode, setIsAddMode] = useState(false);

    const onCancelHandler = () => {
        setIsAddMode(false);
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Button 
                title="Add new category" 
                onPress={() => setIsAddMode(true)} color={COLOR.primaryColor} />
                <Header onAddItem={() => {}} isAddMode={isAddMode} onCancel={onCancelHandler} placeholder="Type category name" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
      },
})

export default CategoriesListScreen;