import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Divider } from 'react-native-elements';

class CustomDevicesItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, text, divider, title, onPress } = this.props;
    
    return(
        <View style={style}>
          <TouchableOpacity onPress={onPress}>
            <Text style={text}
              pointerEvents='none'>
            {title}
            </Text>
          </TouchableOpacity>
          <Divider style={divider} />
        </View>
      );
  }
}

export default CustomDevicesItem;