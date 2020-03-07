import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'


export const Item = ({item}) => {
return(
        // <View style={styles.item}>
        //     <Text>{item}</Text>
        // </View>
         <View style={styles.container}>
         <View style={styles.standalone}>
             <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
                 <View style={styles.standaloneRowBack}>
                 <View style={styles.standaloneRowBackLeft}>
                     <Text style={styles.backTextWhite}>Delete</Text>
                    </View>
                    <View style={styles.standaloneRowBackRight}>
                     <Text style={styles.backTextWhite}>Modify</Text>
                     </View>
                 </View>
                 <View style={styles.standaloneRowFront}>
                     <Text>{item}</Text>
                 </View>
             </SwipeRow>
         </View>
     </View>
);
}

const styles = StyleSheet.create({
    item:{
        padding: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        margin: 3,
        borderRadius: 2
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    standalone: {
        marginTop: 3,
        marginBottom: 3,
    },
    standaloneRowFront: {
        alignItems: 'flex-start',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        padding: 20,
        height: 50,
    },
    standaloneRowBack: {
        flexDirection: 'row'
    },
    standaloneRowBackLeft: {
        alignItems: 'center',
        backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    standaloneRowBackRight: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: '#FFF',
    },
    spacer: {
        height: 50,
    }
})