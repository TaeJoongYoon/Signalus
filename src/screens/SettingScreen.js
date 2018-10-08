import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Text
} from 'react-native';
import styles from '../styles/SettingStyle';
// Actions

// Strings
import { HeaderSetting } from '../constants/string';

class Settingscreen extends Component{
  static navigationOptions = {
    title: HeaderSetting,
  };

  constructor(props){
    super(props)
  }
  
  // Functions

  // LifeCycle
  render(){
    return(
      <View style={styles.container}>
        <Text>This is Setting</Text>  
      </View>
    );
  }
}

export default connect(
  (state) => ({
    
  }),
  (dispatch) => ({
    
  })
)(Settingscreen);