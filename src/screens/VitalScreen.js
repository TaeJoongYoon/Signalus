import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDecValue } from '../constants/utils';
import update from 'react-addons-update';
// Elements
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import styles from '../styles/VitalStyle';
import CustomChart from '../components/CustomChart';
// Actions
import { ON_CALENDAR, NOT_CONNECTED } from '../reducers/nav/actionTypes';
// String
import { 
  HeaderVital,
  heartRateMeasurementUUID, bodySensorLocationUUID, batteryLevelUUID, deviceInfoUUID,
 } from '../constants/string';
import { DISCONNECT_SUCCESS } from '../reducers/bluetooth/actionTypes';

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

  // LifeCyle
  componentDidMount(){
    const { navigation, device, isConnected } = this.props;
    
    navigation.setParams({ clickCalendar: this._goToCalendar });
    if(isConnected) this._connectToDevice(device);
  }

  render(){
    return(
      <View style={styles.container}>
      <CustomChart
        data={this.state.data}
        viewStyle={styles.viewStyle}
        lineStyle={styles.lineStyle}
      />
      {this.state.error && <Text>{this.state.errorMsg}</Text>}
      </View>
    );
  }

  componentWillUnmount(){
    const { device } = this.props;

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