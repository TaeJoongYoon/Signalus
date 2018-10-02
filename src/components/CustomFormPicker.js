import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements'

import { mainColor, placeholderText } from '../constants/color'

class CustomFormPicker extends Component {
  constructor(props){
    super(props)
    this.state= {
      focus: false,
      changed: false,
    }
  }

  _onFocus = () => {
    this.setState({focus: true})
  }

  _onBlur = () => {
    this.setState({focus: false})
  }

  render(){
    const { style, onPress, placeholder,value } = this.props;
    customValue = value ? String(value) : ''
    
    return(
        <View>
          <TouchableOpacity onPress={onPress}>
            <Input
              containerStyle={style}
              onFocus={() => this._onFocus()}
              onBlur={ () => this._onBlur() }
              inputContainerStyle={{borderBottomColor: this.state.focus ? mainColor : placeholderText}}
              inputStyle={{color: placeholderText}}
              pointerEvents='none'
              placeholder={placeholder}
              editable={false}
              autoCorrect={false}
              errorStyle={{ color: 'red' }}
              value={customValue}
            />
          </TouchableOpacity>
        </View>
      );
  }
}

export default CustomFormPicker;