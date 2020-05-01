import React from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons'
import COLOR from '../constants/colors';

export const CustomHeaderButton = props => {
    return(
        <HeaderButton
            {...props}
            IconComponent={MaterialIcons}
            iconSize={23}
            color={COLOR.whiteColor} />
    );
}

export const CustomHeaderButtonEmpty = props => {
    return(
        <HeaderButton
            {...props}
            IconComponent={MaterialIcons}
            iconSize={23}
            color={COLOR.primaryColor} />
    );
}

export const ClearFilterHeaderButton = props => {
    return(
        <HeaderButton
            {...props}
            IconComponent={MaterialCommunityIcons}
            iconSize={23}
            color={COLOR.whiteColor} />
    );
}