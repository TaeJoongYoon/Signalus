import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class CustomFormInput extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, title, onPress, placeholder,value, error, errorMsg } = this.props;
    customValue = value ? String(value) : ''
    
    return(
        <View style={style}>
          <FormLabel
            labelStyle={{color:'black',}}
          >{title}
          </FormLabel>
          <TouchableOpacity onPress={onPress}>
          <FormInput
            inputStyle={{color:'black',}}
            pointerEvents='none'
            placeholder={placeholder}
            shake={error}
            editable={false}
            autoCorrect={false}
            value={customValue}
          />
        </TouchableOpacity>
          {error && <FormValidationMessage>{errorMsg}</FormValidationMessage>}
        </View>
      );
  }
}

export default CustomFormInput;