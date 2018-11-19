import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
// Elements
import {
  View, Text, AsyncStorage
} from 'react-native';
import { Divider } from 'react-native-elements'
import styles from '../styles/SymptomDetailPatchStyle';
import { stringToSignal, getTimeForNowPath } from '../constants/utils';
import CustomChart from '../components/CustomChart';
// Actions
import * as symptomActions from '../reducers/symptom/actions';
// Strings
import { HeaderSymptomDetailFromDevice, } from '../constants/string';
// Colors
import { disable } from '../constants/color';

class SymptomDetailDeviceScreen extends Component{
  static navigationOptions = {
    title: HeaderSymptomDetailFromDevice,
  };
  
  constructor(props){
    super(props)
    this.state= {
      data: [0],
    }
  }

  // Functions
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

  _getsignal = async (id, time, token) => {
    const { SymptomActions } = this.props;
    
    return await SymptomActions.getSignal(id, time, token);
  }

  // LifeCycle
  componentDidMount(){
    const { navigation } = this.props;
    const time = navigation.getParam('time', '2000.01.01 00:00:00');

    AsyncStorage.multiGet(['id', 'token']).then((value) => {    // Get Data From LocalStorage
      id = value[0][1];
      token = value[1][1];

      this._getsignal(id, getTimeForNowPath(time), token)
      .catch((e) =>{})
    })
  }

  componentWillReceiveProps(nextProps){
    const { signal } = nextProps;

    this.setState({data: stringToSignal(signal)});
  }

  render(){
    const { navigation } = this.props;
    const time = navigation.getParam('time', '2000.01.01 00:00:00');

    return(
      <View style={styles.container}>
        
        {/* HEADER */}
        <Text style={styles.date}>{this._date(time)}</Text>
        <Text style={styles.time}>추가된 시간 : {this._time(time.substring(11))}</Text>

        <Divider style={{backgroundColor: disable, height: 1, marginTop: 10, marginBottom: 10}}/>

        {/* ECG Graph */}
        <Text style={styles.ChartTitle}>수신된 신호</Text>        
        <View style={styles.chart}>
          <CustomChart
            data={this.state.data}
          />
        </View>

      </View>
    );
  }
}

export default connect(
  (state) => ({
    signal: state.symptom.signal,
  }),
  (dispatch) => ({
    SymptomActions: bindActionCreators(symptomActions, dispatch),
  })
)(SymptomDetailDeviceScreen);