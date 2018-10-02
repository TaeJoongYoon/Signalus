import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

class CustomHeaderButton extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { onPress, style, source } = this.props;
    
    return(
      <TouchableOpacity
        onPress={onPress}>
        <Image
          style={style}
          source={source}
        />
      </TouchableOpacity>
      );
  }
}

export default CustomHeaderButton;