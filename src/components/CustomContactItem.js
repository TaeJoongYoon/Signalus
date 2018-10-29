import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { normalize } from '../constants/utils';


class CustomContactItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, name, phoneNumber, onPress } = this.props;
    
    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:10}}>
          <View style={{flex:3, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'gray', fontSize:normalize(13)}}>{name}</Text>
            <Text style={{color:'gray', fontSize:normalize(13)}}>{phoneNumber}</Text>
          </View>
          <TouchableOpacity style={{flex:1, alignItems:'flex-end'}} onPress={onPress}>
            <Icon
              name='clear'
              color='gray'
            />
          </TouchableOpacity>
        </View>
      );
  }
}

export default CustomContactItem;