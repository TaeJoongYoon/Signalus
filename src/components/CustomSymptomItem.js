import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { LabelSymptomFromPatch, LabelSymptomFromUser } from '../constants/string';

class CustomSymptomItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { style, type, typeStyle, titleStyle, dateStyle, divider, title, date, onPress } = this.props;
    
    return(
        <View>
          <TouchableOpacity onPress={onPress}>
          <View style={style}>
            <View>
              <Text style={typeStyle}>
                  {type == "patch" ? LabelSymptomFromPatch : LabelSymptomFromUser}
              </Text>
              <Text style={titleStyle}>
                {title}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
              <Text></Text>
              <Text style={dateStyle}>
                {date}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
          <Divider style={divider} />
        </View>
      );
  }
}

export default CustomSymptomItem;