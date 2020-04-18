import React, { useState, useRef, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

import COLOR from '../constants/colors';

const ProgressBar = props => {
    const [progress, setProgress] = useState(0);
    const ref = useRef();

    let doneCount = props.tasks.filter(item => item.done == 1).length;
    let totalCount = props.tasks.length;
    let perc = parseFloat((doneCount/totalCount).toFixed(2));
    const windowWidth = Math.floor(Dimensions.get('window').width);

    return(
        <View style={styles.progressBar}>
            <Progress.Bar progress={isNaN(perc) ? 0 : perc} width={windowWidth*0.9} color={COLOR.accentColor} height={10} />
        </View>
    );
}

const styles = StyleSheet.create({
    progressBar: {
        flexGrow: 1,
        margin: 5,
        alignItems: 'center',
        alignContent: 'center',
    }
});

export default ProgressBar;