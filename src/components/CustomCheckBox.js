import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { checkboxSize } from '../constants/dimens'
import { placeholderText, mainColor } from '../constants/color';

class CustomCheckBox extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { checked, onPress, onTouch, title, underline } = this.props;
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
            <Text
              style={underline ? {textDecorationLine: 'underline', fontSize: 16, color: placeholderText} :
                                  {fontWeight:'bold', fontSize: 16, color: 'black'}}
            >
            {title}
            </Text>
          </TouchableOpacity>
        </View>
      );
  }
}

export default CustomCheckBox;