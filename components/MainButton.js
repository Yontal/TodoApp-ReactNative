import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';

import COLOR from '../constants/colors';

const MainButton = props => {
    return(
        <TouchableOpacity onPress={props.onPressHandler} activeOpacity={0.8} >
            <View style={{...styles.btn, ...props.styles}}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        borderColor: COLOR.accentColor,
        borderWidth: 1,
        width: Math.floor(Dimensions.get('window').width * 0.3),
        height: 40,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: COLOR.primaryColor,
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        color: COLOR.whiteColor,
        fontSize: 16
    }
})

export default MainButton;