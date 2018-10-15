import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import update from 'react-addons-update';
import _ from 'lodash';
import { BleManager } from 'react-native-ble-plx';
// Elements
import {
  View, Text, Switch, Image, TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements';
import styles from '../styles/BluetoothStyle';
import CustomDevicesItem from '../components/CustomDevicesItem';
// Actions
import * as connectActions from '../reducers/bluetooth/actions';
import { CONNECTED } from '../reducers/nav/actionTypes'
// Strings
import {
  HeaderBluetooth, targetDeviceName,
  LabelBluetoothToggleOn, LabelBluetoothToggleOff, LabelBluetoothListTitle, LabelBluetoothNotConnect
} from '../constants/string';
// Colors
import { mainColor, placeholderText } from '../constants/color';


class BluetoothScreen extends Component{
  static navigationOptions = {
    title: HeaderBluetooth,
  };

  constructor(props) {
    super(props)
    this.manager = new BleManager()
    this.timeOut
    this.state = {
      isON: false,
      deviceNames: [],
      deviceList: [],
      error: false,
      errorMsg: "",
    }
  }

  // Functions
  _toggleBluetooth = (value) => {
    this.setState({isON: value})
    value ? this._scan() : this._stop()
 }

  _scan = () => {
    this.setState({deviceNames: [], deviceList: []})
    this.timeOut = setTimeout(this._stop, 5000)
    this.manager.startDeviceScan(null,
                                null, (error, device) => {
                                  
      console.log("scan : "+device.name)
      
      if(device){
        if(device.name && device.name.startsWith(targetDeviceName)){
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
      }

      if (error) {
        this.setState({isON: false, error: true, errorMsg: error.message})
        return
      }
    });
  }

  _stop = () => {
    this.manager.stopDeviceScan()
    this.setState({error: false})
    clearTimeout(this.timeOut)
    console.log('scan stop')
    console.log(this.state.deviceNames)
  }

  _connect = (device) => {
    const { ConnectActions } = this.props;

    this._stop();
    try{
      ConnectActions.connect(device);
    }catch(e){}
  }

  // LifeCycle
  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    const { goToMain, isConnected, error, loading } = nextProps;

    if(error) this.setState({isON: false, error: true, errorMsg: error.message})
    else if(isConnected) goToMain();
  }

  render(){
    const { goToMain } = this.props;
    return(
      <View style={styles.container}>

        {/* Header View */}
        <View style={styles.headerBox}>
          <Text style={this.state.isON ? styles.textToggleOn : styles.textToggleOff}>
            {this.state.isON ? LabelBluetoothToggleOn : LabelBluetoothToggleOff}
          </Text>
          <View style={styles.toggleView}>
            {this.state.isON ?
              <Image
                style={{width: 26, height: 26, margin: 10}}
                source={require('../../assets/bluetoothSync.png')}
              /> : null
            }
            <Switch
              onTintColor={mainColor}
              onValueChange = {this._toggleBluetooth}
              value = {this.state.isON}
            />
          </View>
        </View>

        {/* ListTitle */}
        <Text style={!this.state.error ? styles.listTitle : styles.listTitleError}>
        {this.state.error ? this.state.errorMsg : LabelBluetoothListTitle }
        </Text>

        {/* Device List */}
        {this.state.isON ?
        <View style={styles.deviceContainer}>
          <View style={styles.deviceList}>
            {_.map(this.state.deviceList, device => {
              return (
                <CustomDevicesItem
                  key={device.id}
                  style={styles.device}
                  text={styles.deviceTitle}
                  divider={styles.divider}
                  title={device.name}
                  onPress={() => this._connect(device)}
                />
              );
            })}
          </View>
        </View> : null
        }

        {/* Next */}
        {!this.state.isON ?
          <View style={styles.next}>
            <TouchableOpacity 
              onPress={goToMain}>
              <Text
                style={{color: placeholderText, fontSize: 20, fontWeight: 'bold'}}
                pointerEvents='none'>
              {LabelBluetoothNotConnect}
              </Text>
              <Divider style={{backgroundColor: mainColor, height: 2}}/>
            </TouchableOpacity>
          </View> : null
        }

      </View>
    );
  }
}

export default connect(
  (state) => ({
    isConnected: state.bluetooth.isConnected,
    loading: state.bluetooth.pending,
    error: state.bluetooth.error,
  }),
  (dispatch) => ({
      ConnectActions: bindActionCreators(connectActions, dispatch),
      goToMain: () => dispatch({ type: CONNECTED}),
  })
)(BluetoothScreen);