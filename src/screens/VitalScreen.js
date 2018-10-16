import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDecValue } from '../constants/utils';
import update from 'react-addons-update';
// Elements
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import { Card, Divider, Icon  } from 'react-native-elements';
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import Gradient from '../components/Gradient';
import CustomChart from '../components/CustomChart';
import CustomHealthStatusBar from '../components/CustomHealthStatusBar';
import styles from '../styles/VitalStyle';
// Actions
import { ON_CALENDAR, NOT_CONNECTED } from '../reducers/nav/actionTypes';
import { DISCONNECT_SUCCESS } from '../reducers/bluetooth/actionTypes';
// String
import { 
  HeaderVital,
  heartRateMeasurementUUID, bodySensorLocationUUID, batteryLevelUUID, deviceInfoUUID,
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
      data: [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ],
      time:'',
      bpm:102,
      bpmHigh:132,
      bpmLow:64,
      connected: false,
      error: false,
      errorMsg: '',
    };
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
    if(characteristic.uuid == heartRateMeasurementUUID){
      this._heartRateSubcription = characteristic.monitor((error, c) => {
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
        }
      });
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

  // LifeCyle
  componentDidMount(){
    const { navigation, device, isConnected } = this.props;
    
    this._timer = setInterval(this._startTime, 1000);

    navigation.setParams({ clickCalendar: this._goToCalendar });
    if(isConnected) this._connectToDevice(device);
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
                <Text style={{fontSize:20}}>{this.state.time}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{color: mainColor, fontSize:45, fontWeight:'bold'}}>{this.state.bpm}</Text>
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
                  <Text style={{color: divider, fontSize:16, fontWeight:'bold'}}>{this.state.bpmHigh}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Icon
                    name='arrow-downward'
                    color={divider}
                  />
                  <Text style={{color: divider, fontSize:16, fontWeight:'bold'}}>{this.state.bpmLow}</Text>
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
              percent={0.98}
           />
            <Divider style={{backgroundColor: disable, height: 1}}/>
            <CustomHealthStatusBar
              title={LabelStress}
              percent={0.89}
            />
          </Card>
        </View>

        {this.state.error && <Text>{this.state.errorMsg}</Text>}
      </View>
    );
  }

  componentWillUnmount(){
    const { device } = this.props;

    clearInterval(this._timer);
    device.cancelConnection();
    console.log(device.isConnected)
    this._subscription.remove();
    this._heartRateSubcription.remove();
  }
}


export default connect(
  (state) => ({
    device : state.bluetooth.device,
    isConnected: state.bluetooth.isConnected,
  }),
  (dispatch) => ({
    goToCalendar: () => dispatch({ type: ON_CALENDAR}),
    disconnect: () => dispatch({ type: DISCONNECT_SUCCESS }),
    goToBluetooth: () => dispatch({ type: NOT_CONNECTED})
  })
)(VitalScreen);