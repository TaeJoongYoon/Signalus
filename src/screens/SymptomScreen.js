import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Text, Button, Image
} from 'react-native';
import styles from '../styles/SymptomStyle';
// Actions
import { 
  ON_LOG, ON_DETAIL_DEVICE, ON_DETAIL_USER
 } from '../reducers/nav/actionTypes'
 // Strings
import { 
  HeaderSymptom,
 } from '../constants/string';

class SymptomScreen extends Component{
  static navigationOptions = {
    title: HeaderSymptom,
    headerBackTitle: null,
  };

  constructor(props){
    super(props)
  }

  // Functions
  _goToLog = () => {
    this.props.goToLog();
  }

  _goToDetailDevice = () => {
    this.props.goToDetailDevice();
  }

  _goToDetailUser = () => {
    this.props.goToDetailUser();
  }


  // LifeCyle
  render(){
    return(
      <View style={styles.container}>
        <Text>This is Symptom</Text>
        <Button
          title='Log'
          onPress={() => this._goToLog()}
        />
        <Button
          title='DetailDevice'
          onPress={() => this._goToDetailDevice()}
        />
        <Button
          title='DetailUser'
          onPress={() => this._goToDetailUser()}
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    
  }),
  (dispatch) => ({
    goToLog: () => dispatch({ type: ON_LOG}),
    goToDetailDevice: () => dispatch({ type: ON_DETAIL_DEVICE}),
    goToDetailUser: () => dispatch({ type: ON_DETAIL_USER}),
  })
)(SymptomScreen);