import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Text
} from 'react-native';
import styles from '../styles/SymptomDetailDeviceStyle';
// Actions

// Strings
import { HeaderSymptomDetailFromDevice, } from '../constants/string';

class SymptomDetailDeviceScreen extends Component{
  static navigationOptions = {
    title: HeaderSymptomDetailFromDevice,
  };
  
  constructor(props){
    super(props)
  }

  // Functions

  // LifeCycle
  render(){
    return(
      <View style={styles.container}>
        <Text>This is Detail</Text>  
      </View>
    );
  }
}

export default connect(
  (state) => ({
    
  }),
  (dispatch) => ({
    
  })
)(SymptomDetailDeviceScreen);