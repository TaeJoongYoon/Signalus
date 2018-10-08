import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Text
} from 'react-native';
import styles from '../styles/SymptomDetailUserStyle';
// Actions

// Strings
import { HeaderSymptomDetailFromUser, } from '../constants/string';

class SymptomDetailUserScreen extends Component{
  static navigationOptions = {
    title: HeaderSymptomDetailFromUser,
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
)(SymptomDetailUserScreen);