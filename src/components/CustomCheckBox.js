import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { checkboxSize } from '../constants/dimens'

class CustomCheckBox extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { checked, onPress, title } = this.props;
    return(
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <CheckBox
            containerStyle={{backgroundColor: 'transparent', borderColor:'transparent'}}
            size={checkboxSize}
            iconRight={true}
            iconType='material'
            checkedIcon='check-box'
            uncheckedIcon='check-box-outline-blank'
            checkedColor='green'
            checked={checked}
            onPress={onPress}
          />
          <Text>{title}</Text>
        </View>
      );
  }
}

export default CustomCheckBox;