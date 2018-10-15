import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { checkboxSize } from '../constants/dimens'
import { mainColor, divider } from '../constants/color';

class CustomSymptomCheckBox extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { checked, onPress, onTouch, title } = this.props;
    return(
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <CheckBox
            containerStyle={{backgroundColor: 'transparent', borderColor:'transparent'}}
            size={checkboxSize}
            iconRight={true}
            iconType='material'
            checkedIcon='check-box'
            uncheckedIcon='check-box-outline-blank'
            checkedColor={mainColor}
            checked={checked}
            onPress={onPress}
          />
          <TouchableOpacity
            onPress={onTouch}>
            <Text style={{fontSize: 16, color: divider}}>
            {title}
            </Text>
          </TouchableOpacity>
        </View>
      );
  }
}

export default CustomSymptomCheckBox;