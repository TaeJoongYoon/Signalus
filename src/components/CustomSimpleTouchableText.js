import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

class CustomSimpleTouchableText extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, text, title, onPress } = this.props;
    
    return(
        <View style={style}>
          <TouchableOpacity onPress={onPress}>
            <Text style={text}
              pointerEvents='none'>
            {title}
            </Text>
          </TouchableOpacity>
        </View>
      );
  }
}

export default CustomSimpleTouchableText;