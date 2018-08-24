import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { defaultMaxLength } from '../constants/dimens'

class CustomFormInput extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, title, placeholder, onChangeText, maxLength, clearTextOnFocus, secureTextEntry, error, errorMsg } = this.props;
    return(
        <View style={style}>
          <FormLabel
            labelStyle={{color:'black',}}
          >{title}
          </FormLabel>
          <FormInput
            inputStyle={{color:'black',}}
            placeholder={placeholder}
            onChangeText={onChangeText}
            maxLength={maxLength ? maxLength : defaultMaxLength}
            clearTextOnFocus={clearTextOnFocus}
            secureTextEntry={secureTextEntry}
            clearButtonMode='always'
            shake={error}
            autoCorrect={false}
          />
          {error && <FormValidationMessage>{errorMsg}</FormValidationMessage>}
        </View>
      );
  }
}

export default CustomFormInput;