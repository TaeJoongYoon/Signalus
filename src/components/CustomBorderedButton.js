import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { mainColor } from '../constants/color';

class CustomBorderedButton extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, title, onPress } = this.props;
    
    return(
      <View style={style}>
        <TouchableOpacity
          onPress={onPress}>
          <Text
            style={{fontWeight: 'bold', color: mainColor, fontSize: 20}}
            pointerEvents='none'>
          {title}
          </Text>
        </TouchableOpacity>
      </View>
      );
  }
}

export default CustomBorderedButton;