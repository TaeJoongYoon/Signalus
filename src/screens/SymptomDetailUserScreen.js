import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// Elements
import {
  View, Text
} from 'react-native';
import { Divider } from 'react-native-elements'
import styles from '../styles/SymptomDetailUserStyle';
// Actions

// Strings
import { HeaderSymptomDetailFromUser, } from '../constants/string';
// Colors
import { disable } from '../constants/color';

class SymptomDetailUserScreen extends Component{
  static navigationOptions = {
    title: HeaderSymptomDetailFromUser,
  };

  constructor(props){
    super(props)
  }

  _date = (time) =>{
    const year = time.substring(0,4)
    const month = time.substring(5,7)
    const day = time.substring(8,10)

    return `${year}년 ${month}월 ${day}일`
  }

  _time = (time) => {
    const hour = time.substring(0,2)
    const minute = time.substring(3,5)
    const second = time.substring(6,8)

    return `${hour}시 ${minute}분 ${second}초`
  }

  // Functions

  // LifeCycle
  render(){
    const { navigation } = this.props;
    const time = navigation.getParam('time', '2000.01.01 00:00:00');
    const symptoms = navigation.getParam('symptoms', 'Invalid');

    return(
      <View style={styles.container}>

        {/* HEADER */}
        <Text style={styles.date}>{this._date(time)}</Text>
        <Text style={styles.time}>추가된 시간 : {this._time(time.substring(11))}</Text>

        <Divider style={{backgroundColor: disable, height: 1, marginTop: 10, marginBottom: 10}}/>

        {/* Symptom List */}
        <Text style={styles.symptomListTitle}>느낀 증상 목록</Text>
        {_.map(symptoms, symptom => {
            return (
              <Text key={symptom} style={styles.symptomList}>■ {symptom}</Text>
            );
          })}

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