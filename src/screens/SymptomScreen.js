import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Text, Button
} from 'react-native';
import { Icon } from 'react-native-elements'
import CustomFAB from '../components/CustomFAB';
import styles from '../styles/SymptomStyle';
// Actions
import { 
  ON_LOG, ON_DETAIL_DEVICE, ON_DETAIL_USER
 } from '../reducers/nav/actionTypes'
 // Strings
import { 
  HeaderSymptom,
 } from '../constants/string';
 // Colors
 import { mainColor, divider, disable } from '../constants/color';

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
          title='DetailDevice'
          onPress={() => this._goToDetailDevice()}
        />
        <Button
          title='DetailUser'
          onPress={() => this._goToDetailUser()}
        />

        {/* Floating Action Button */}
        <CustomFAB
          buttonColor={mainColor}
          iconTextColor={'white'}
          onClickAction={() => this._goToLog()}
          visible={true}
          iconTextComponent={
            <Icon
              name='add'
              color='white'
            />
          }
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