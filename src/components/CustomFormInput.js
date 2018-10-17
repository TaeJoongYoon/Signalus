import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Input } from 'react-native-elements'

import { defaultMaxLength } from '../constants/dimens'
import { mainColor, placeholderText } from '../constants/color'

class CustomFormInput extends Component {
  constructor(props){
    super(props)
    this.state= {
      focus: false,
      changed: false,
    }
  }

  _focus = () => {

  }

  _onFocus = () => {
    this.setState({focus: true})
  }

  _onBlur = () => {
    this.setState({focus: false})
  }

  _onChange = () => {
    this.setState({changed: true})
  }

  render(){
    const { childRef, onSubmitEditing, blurOnSubmit, style, iconStyle, placeholder, isIcon, type, onChangeText, maxLength, returnKeyType, clearButtonMode, secureTextEntry, error, errorMsg } = this.props;
    let iconSRC

    if(isIcon){
      switch(type){
        case "ID": iconSRC = require("../../assets/loginID.png")
        break
        case "PW": iconSRC = require("../../assets/loginPW.png")
        break
        default :
        break
      }
    } 

    return(
        <View>
          <Input
            ref={childRef}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            containerStyle={style}
            selectionColor={mainColor}
            onFocus={() => this._onFocus()}
            onBlur={ () => this._onBlur() }
            inputContainerStyle={{borderBottomColor: this.state.focus ? mainColor : placeholderText}}
            inputStyle={{color: placeholderText}}
            placeholder={placeholder}
            onChangeText={onChangeText}
            maxLength={maxLength ? maxLength : defaultMaxLength}
            secureTextEntry={secureTextEntry}
            returnKeyType={returnKeyType}
            clearButtonMode={clearButtonMode}
            shake={error}
            autoCorrect={false}
            errorStyle={{ color: 'red' }}
            errorMessage={error ? errorMsg : " "}
            onChange={() => this._onChange()}
            rightIcon={
              isIcon &&
              this.state.changed && 
              <Image
                style={iconStyle}
                source={iconSRC}
                resizeMode='contain'
              />
            }
          />
        </View>
      );
  }
}

export default CustomFormInput;