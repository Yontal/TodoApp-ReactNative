import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import i18n from 'i18n-js';

import COLOR from '../constants/colors';

const NothingToDisplay = props => {
    const categories = props.categories;
    return(<View>
      {categories.length <= 0 ? 
        <View style={{height: useWindowDimensions().height*0.75, justifyContent: 'center', alignItems: 'center'}}>
          <AntDesign name="frowno" size={50} color="white" />
          <Text style={{color: COLOR.whiteColor, fontFamily: "open-sans", fontSize: 16, letterSpacing: .5}}>{i18n.t("noCategories")}</Text>
        </View> : null}
        </View>
    );
  }

  export default NothingToDisplay;