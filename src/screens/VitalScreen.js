import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import _ from 'lodash';
import { bindActionCreators } from "redux";
// Elements
import {
  View, Text, Image, TouchableOpacity, PushNotificationIOS, AsyncStorage
} from 'react-native';
import { Card, Divider, Icon  } from 'react-native-elements';
import  RNFS from 'react-native-fs';
import CustomChart from '../components/CustomChart';
import CustomHealthStatusBar from '../components/CustomHealthStatusBar';
import styles from '../styles/VitalStyle';
import { getDecValue, notification, normalize, signalToString, getTimeForNow, getTimeForNowPath, stringToSignal } from '../constants/utils';
// Actions
import * as symptomActions from '../reducers/symptom/actions';
import { ON_CALENDAR, NOT_CONNECTED } from '../reducers/nav/actionTypes';
import { DISCONNECT_SUCCESS } from '../reducers/bluetooth/actionTypes';
// String
import { 
  HeaderVital,
  ecgRawUUID, ppgHeartRate, ppgSpO2,
  LabelNowBPM, LabelBPMHighLow, LabelSpO2, LabelStress,
 } from '../constants/string';
 // Colors
import { disable, mainColor, divider } from '../constants/color';

class VitalScreen extends Component{
  static navigationOptions = ({ navigation }) => {
    return{
    title: HeaderVital,
    headerBackTitle: null,
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('clickCalendar')}>
        <Image
          style={{width:30, margin:20}}
          source={require('../../assets/calendar.png')}
          resizeMode='contain'
        />
      </TouchableOpacity>
    ),
  }};

  constructor(props){
    super(props)
    this.state = {
      data: [],
      time:'',
      bpm:80,
      bpmHigh:120,
      bpmLow:80,
      SpO2:100,
      stress:100,
      connected: false,
      error: false,
      errorMsg: '',
    };

    PushNotificationIOS.requestPermissions();
  }

  // Functions
  _goToCalendar = () => {
    this.props.goToCalendar();
  };

  _connectToDevice = (device) => {
    const { disconnect, goToBluetooth } = this.props;

    device
      .connect()
      .then((device) => {
        this.setState({connected: true});
        this._device = device;
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        return device.services();
      })
      .then((services) => {
        for (const service of services) {
          console.log("Service UUID : " + service.uuid); // Services List
          service.characteristics().then((characteristics) => {
            this._characteristics = characteristics;
            this._readAndNotify(service);
          });
        }
      });

    this._subscription = device.onDisconnected((error, device) => {
      disconnect();
      goToBluetooth();
    })
  }

  _readAndNotify = (service) => {
    for (const characteristic of this._characteristics) {
      console.log(`
      Service UUID : ${service.uuid}
      Characteristic UUID : ${characteristic.uuid}
                 Read : ${characteristic.isReadable}
                 Notify : ${characteristic.isNotifiable}
                 Indicatable : ${characteristic.isIndicatable}`); // Characteristic Info
      if(characteristic.isReadable) this._readCharacteristic(characteristic);
      if(characteristic.isNotifiable) this._notifyCharacteristc(characteristic);
    }
  }
 
  _readCharacteristic = (characteristic) => {
    characteristic
      .read()
      .then((c) => {
        const value = getDecValue(c)
        console.log(`---------------------------------------------------
        Characteristic UUID : ${characteristic.uuid}
        Read Value : ${value}`); // Read Value
      });
  }

  _notifyCharacteristc = (characteristic) => {
    const { BluetoothActions } = this.props;

    switch(characteristic.uuid){
      case ecgRawUUID:
      this._ppgRawSubcription = characteristic.monitor((error, c) => {
        if(error) this.setState({error: true, errorMsg: error.message})
        if(c){
          const value = getDecValue(c)
          console.log(`---------------------------------------------------
          Characteristic UUID : ${characteristic.uuid}
          Notify Value : ${value}`);

          if(this.state.data.length > 100){
            this.setState({
              data: update(
                        this.state.data, 
                        {
                          $push: [value],
                          $splice: [[0, 1]]
                        }
              )});
          }
          else{
            this.setState({
              data: update(
                        this.state.data, 
                        {
                            $push: [value]
                        }
              )});
          }

          try{
            BluetoothActions.signal(this.state.data)
          }catch(e){console.log(e)}
        }
      });
      break
      case ppgHeartRate:
      this._ppgHeartRateSubcription = characteristic.monitor((error, c) => {
        if(error) this.setState({error: true, errorMsg: error.message})
        if(c){
          const value = getDecValue(c)
          console.log(`---------------------------------------------------
          Characteristic UUID : ${characteristic.uuid}
          Notify Value : ${value}`);
          this.setState({bpm: value})

        }
      });
      break
      case ppgSpO2:
      this._ppgSpO2Subcription = characteristic.monitor((error, c) => {
        if(error) this.setState({error: true, errorMsg: error.message})
        if(c){
          const value = getDecValue(c)
          console.log(`---------------------------------------------------
          Characteristic UUID : ${characteristic.uuid}
          Notify Value : ${value}`);
          this.setState({SpO2: value})
          
          if(value > bpmHigh){ // Set BPM High
            this.setState({bpmHigh: value})
          }

          if(value < bpmLow){ // Set BPM Low
            this.setState({bpmLow: value})
          }

        }
      });
      default:
      break
    }
  }

  _startTime = () => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = this._checkTime(m);
    s = this._checkTime(s);

    const now = h > 12 ? `오후 ${h-12} : ${m} : ${s}` : `오전 ${h} : ${m} : ${s}`

    this.setState({time:now})
  }

  _checkTime = (i) => {
      if (i < 10) {i = "0" + i};
      return i;
  }

  _add = () => {
    const path = RNFS.DocumentDirectoryPath + '/signal.txt';
   
    RNFS.writeFile(path, signalToString(data), 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
      

      this._addsignal(this.state.id, path, getTimeForNow(), this.state.token)
          .catch((e) =>{})
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  _addsignal = async (id, signalFile, time, token) => {
    const { SymptomActions } = this.props;
    
    return await SymptomActions.addSignal(id, signalFile, time, token);
  }

  _getsignal = async (id, time, token) => {
    const { SymptomActions } = this.props;
    
    return await SymptomActions.getSignal(id, time, token);
  }

  // LifeCyle
  componentDidMount(){
    const { navigation, device, isConnected } = this.props;

    AsyncStorage.multiGet(['id', 'token', 'bpmHigh', 'bpmLow']).then((value) => {   // Check LocalStorage
      id = value[0][1];
      token = value[1][1];
      bpmHigh =  value[2][1];
      bpmLow =  value[3][1];

      this._getsignal(id, getTimeForNowPath('2018.11.18_20:32:17'), token)
          .catch((e) =>{})

      this.setState({id: id, token: token})
      if(bpmHigh != null){
        this.setState({bpmHigh: bpmHigh});
      }
      if(bpmLow != null){
        this.setState({bpmLow:bpmLow});
      }
    })

    this._timer = setInterval(this._startTime, 1000);
    
    navigation.setParams({ clickCalendar: this._goToCalendar });
    if(isConnected) this._connectToDevice(device);
  }

  componentWillReceiveProps(nextProps){
    console.log(stringToSignal(nextProps.signal))
  }

  render(){
    return(
      <View style={styles.container}>

        {/* ECG Graph */}
        <CustomChart
          data={this.state.data}
        />

        {/* BPM CardView */}
        <View style={styles.card}>
          <Card containerStyle={styles.cardView}>
            <View style={styles.bpmStatus}>
              <View style={{flex:3}}>
                <Text style={{marginBottom: 10, color: divider}}>{`${LabelNowBPM}\t`} <Text style={{color: mainColor}}>{"정상"}</Text> </Text>
                <Text style={{fontSize:normalize(20)}}>{this.state.time}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{color: mainColor, fontSize:normalize(33), fontWeight:'bold'}}>{this.state.bpm}</Text>
              </View>
            </View>
            <Divider style={{backgroundColor: disable, height: 1}}/>
            <View style={{flexDirection:'row', alignItems:'center', height:50}}>
              <View style={{flex:2}}>
                <Text style={{color: divider}}>{LabelBPMHighLow}</Text>
              </View>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Icon
                    name='arrow-upward'
                    color={divider}
                  />
                  <Text style={{color: divider, fontSize:normalize(13), fontWeight:'bold'}}>{this.state.bpmHigh}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Icon
                    name='arrow-downward'
                    color={divider}
                  />
                  <Text style={{color: divider, fontSize:normalize(13), fontWeight:'bold'}}>{this.state.bpmLow}</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* SpO2 and Stress CardView */}
        <View style={styles.card}>
          <Card containerStyle={styles.cardView}>
            <CustomHealthStatusBar
              title={LabelSpO2}
              percent={this.state.SpO2}
           />
            <Divider style={{backgroundColor: disable, height: 1}}/>
            <CustomHealthStatusBar
              title={LabelStress}
              percent={this.state.stress}
            />
          </Card>
        </View>

        {this.state.error && <Text>{this.state.errorMsg}</Text>}
      </View>
    );
  }

  componentWillUnmount(){
    const { device } = this.props;

    AsyncStorage.multiSet([
      ["bpmHigh", this.state.bpmHigh],
      ["bpmLow", this.state.bpmLow],
    ])

    clearInterval(this._timer);
    device.cancelConnection().then((device) => {
      console.log(device)
      this._subscription.remove();
      this._ppgRawSubcription.remove();
      this._ppgHeartRateSubcription.remove();
      this._ppgSpO2Subcription.remove();
    })
  }
}


export default connect(
  (state) => ({
    signal: state.symptom.signal,
    device : state.bluetooth.device,
    isConnected: state.bluetooth.isConnected,
    
  }),
  (dispatch) => ({
    SymptomActions: bindActionCreators(symptomActions, dispatch),
    goToCalendar: () => dispatch({ type: ON_CALENDAR}),
    disconnect: () => dispatch({ type: DISCONNECT_SUCCESS }),
    goToBluetooth: () => dispatch({ type: NOT_CONNECTED})
  })
)(VitalScreen);