import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons'

const CustomHeaderButton = props => {
    return(
        <HeaderButton
            {...props}
            IconComponent={MaterialIcons}
            iconSize={23}
            color="white" />
    );
}

export default CustomHeaderButton;