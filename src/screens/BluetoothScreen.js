import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button
} from 'react-native';
import CustomDevicesItem from '../components/CustomDevicesItem';
import update from 'react-addons-update';
import { bindActionCreators } from "redux";
import * as connectActions from '../reducers/bluetooth/actions';
import { BleManager } from 'react-native-ble-plx';
import _ from 'lodash';
import { Buffer } from 'buffer';
import { CONNECTED } from '../reducers/nav/actionTypes'

class BluetoothScreen extends Component{
  constructor(props) {
    super(props)
    this.manager = new BleManager()
    this.targetDeviceName = "Nordic_HRM"
    this.state = {
      deviceNames: [],
      deviceList: [],
      error: false,
      errorMsg: '',
      connected: false,
      info: 'Empty',
    };
  }

  _scan = () => {
    this.manager.startDeviceScan(null, null, (error, device) => {
      
      if(device.name && device.name.startsWith("Nordic")){
        if(this.state.deviceNames.indexOf(device.name) == -1){
          this.setState({
            deviceNames: update(
                      this.state.deviceNames, 
                      {
                        $push: [device.name],
                      }),
            deviceList: update(
                      this.state.deviceList, 
                      {
                        $push: [device],
                      }),
          })
        }
      }
    
      if (error) {
        this.setState({error: true, errorMsg: error.message})
        return
      }
    });
  }

  _onConnect = (device) => {
    const { ConnectActions } = this.props;

      ConnectActions.connect(device);
  }

  componentDidMount(){
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this._scan();
        subscription.remove();
      }
    }, true);
  }

  componentWillReceiveProps(nextProps) {
    const { goToMain, isConnected } = nextProps;
    console.log(nextProps)

    if(isConnected){
      this.manager.stopDeviceScan()
      goToMain();   // Go to MainScreen
    } 
  }

  render(){
    const { goToMain } = this.props;
    return(
      <View>
        {_.map(this.state.deviceList, device => {
          return (
            <CustomDevicesItem
              key={device.id}
              title={device.name}
              onPress={(device) => this._onConnect(device)}
            />
          );
        })}
        {this.state.error && <Text>{this.state.errorMsg}</Text>}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    isConnected: state.bluetooth.isConnected,
    loading: state.bluetooth.pending,
    error: state.bluetooth.error,
    device: state.bluetooth.device
  }),
  (dispatch) => ({
      ConnectActions: bindActionCreators(connectActions, dispatch),
      goToMain: () => dispatch({ type: CONNECTED}),
  })
)(BluetoothScreen);