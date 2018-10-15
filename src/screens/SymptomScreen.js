import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// Elements
import {
  View, ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements'
import CustomSymptomItem from '../components/CustomSymptomItem';
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
import { mainColor } from '../constants/color';
import { symptoms } from '../constants/utils'; 

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

        {/* Symptom List */}
        <ScrollView>
          {_.map(symptoms, symptom => {
            return (
              <CustomSymptomItem
                key={symptom.key}
                style={styles.itemView}
                type={symptom.type}
                typeStyle={symptom.type == "device" ? styles.fromDevice : styles.fromUser}
                titleStyle={styles.titleStyle}
                divider={styles.divider}
                title={symptom.title}
                dateStyle={styles.dateStyle}
                date={symptom.date}
                onPress={() => symptom.type == "device" ? this._goToDetailDevice() : this._goToDetailUser()}
              />
            );
          })}
        </ScrollView>

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