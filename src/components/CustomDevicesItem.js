import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

class CustomDevicesItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, title, onPress } = this.props;
    
    return(
        <View style={style}>
          <TouchableOpacity onPress={onPress}>
          <Text
            pointerEvents='none'
          >
          {title}
          </Text>
        </TouchableOpacity>
        
        </View>
      );
  }
}

export default CustomDevicesItem;