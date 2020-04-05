import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';


const DTPicker = props => {
    return(
        <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={props.value}
                    mode={props.mode}
                    is24Hour={true}
                    display="default"
                    onChange={props.onChange}
                />
    );
}

export default DTPicker;