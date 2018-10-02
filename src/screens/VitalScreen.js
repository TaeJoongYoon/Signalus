import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BleManager } from 'react-native-ble-plx';
import { base64ToHex, getDecValue } from '../constants/utils';
import update from 'react-addons-update';
// Elements
import {
  View, Text
} from 'react-native';
import CustomChart from '../components/CustomChart';
// String
import { 
  targetDeviceName,
  heartRateMeasurementUUID, bodySensorLocationUUID, batteryLevelUUID, deviceInfoUUID,
 } from '../constants/string';

class VitalScreen extends Component{
  constructor(props){
    super(props)
    this.manager = new BleManager()
    this.targetDeviceName = targetDeviceName
    this.state = {
      data: [],
      connected: false,
      error: false,
      errorMsg: '',
    };
  }

  componentDidMount(){
    // const subscription = this.manager.onStateChange((state) => {
    //   if (state === 'PoweredOn') {
    //     this._scan();
    //     subscription.remove();
    //   }
    // }, true);
  }

  _scan = () => {
    this.manager.startDeviceScan(null,
                                 null, (error, device) => {
                                   
      console.log(device.name)

      if (error) {
        this.setState({error: true, errorMsg: error.message})
        return
      }

      if (device.name === this.targetDeviceName) {
        this.manager.stopDeviceScan()
        this._connectToDevice(device);
      }
    });
  }

  _connectToDevice = (device) => {
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
      characteristic.monitor((error, c) => {
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

  render(){
    return(
      <View>
      <CustomChart
        data = {this.state.data}
      />
      {this.state.error && <Text>{this.state.errorMsg}</Text>}
      </View>
    );
  }
}


export default connect(
  (state) => ({
    device : state.bluetooth.device,
  }),
  (dispatch) => ({

  })
)(VitalScreen);