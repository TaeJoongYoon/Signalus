import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

class CustomFilledButton extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, title, disabled, onPress } = this.props;
    
    return(
      <View style={style}>
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}>
          <Text
            style={{fontWeight: 'bold', color: 'white', fontSize: 20}}
            pointerEvents='none'>
          {title}
          </Text>
        </TouchableOpacity>
      </View>
      );
  }
}

export default CustomFilledButton;