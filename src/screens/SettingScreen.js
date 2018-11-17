import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, AsyncStorage, PushNotificationIOS
} from 'react-native';
import { Divider } from 'react-native-elements'
import CustomSimpleTouchableText from '../components/CustomSimpleTouchableText';
import styles from '../styles/SettingStyle';
// Actions
import * as withdrawActions from '../reducers/auth/actions';
import { SIGNOUT } from '../reducers/nav/actionTypes'
import { DISCONNECT_SUCCESS } from '../reducers/bluetooth/actionTypes';
// Strings
import {
  HeaderSetting,
  LabelAccountSetting, LabelAppSetting, LabelSupport, LabelReport,
  LabelPrivateInfo, LabelTerms, LabelLogout, LabelWithdraw,
} from '../constants/string';
// Colors
import { disable } from '../constants/color';

class Settingscreen extends Component{
  static navigationOptions = {
    title: HeaderSetting,
  };

  constructor(props){
    super(props)
    this.state= {
      id:'',
      password:'',
      token:'',
    }
  }
  
  // Functions
  _accountSetting = () => {
    
  }

  _appSetting = () => {
    
  }

  _support = () => {
    
  }

  _report = () => {
    
  }

  _privateInfo = () => {
    
  }

  _terms = () => {
    
  }

  _logout = () => {
    const { device, isConnected, disconnect, logout } = this.props;
    
    if(isConnected){
      device.cancelConnection()
      disconnect();
    }

    AsyncStorage.multiRemove(['id', 'pw', 'token', 'device']).then(() => {    // Clear LocalStorage
      logout();
    })
  }

  _withdraw = () => {
    const { device, isConnected, disconnect, WithdrawActions } = this.props;

    if(isConnected){
      device.cancelConnection()
      disconnect();
    }
    
    AsyncStorage.multiRemove(['id', 'pw', 'token', 'device']).then(() => {    // Clear LocalStorage
      try{
        WithdrawActions.withdraw(this.state.id, this.state.token);    // Withdraw the Account
      }catch(e){}
    })
  }

  // LifeCycle
  componentDidMount(){
    AsyncStorage.multiGet(['id', 'pw', 'token']).then((value) => {    // Get Data From LocalStorage
      id = value[0][1];
      password = value[1][1];
      token = value[2][1];

      this.setState({id: id, password: password, token: token})
    })

    PushNotificationIOS.checkPermissions((currentPermissions) => {
      console.log('Badges enabled: ' + !!currentPermissions.badge);
      console.log('Sounds enabled: ' + !!currentPermissions.sound);
      console.log('Alerts enabled: ' + !!currentPermissions.alert);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { logout, isLoggedIn } = nextProps;
    if(!isLoggedIn){
      logout();
    } 
  }

  render(){
    return(
      <View style={styles.container}>

        {/* Account Setting */}
        <CustomSimpleTouchableText
          style={styles.textView}
          text={styles.text}
          title={LabelAccountSetting}
          onPress={() => this._accountSetting()}
        />

        {/* App Setting */}
        <CustomSimpleTouchableText
          style={styles.textView}
          text={styles.text}
          title={LabelAppSetting}
          onPress={() => this._appSetting()}
        />

        <Divider style={{backgroundColor: disable, height: 1, marginBottom: 20}}/>

        {/* Support */}
        <CustomSimpleTouchableText
          style={styles.textView}
          text={styles.text}
          title={LabelSupport}
          onPress={() => this._support()}
        />

        {/* Report */}
        <CustomSimpleTouchableText
          style={styles.textView}
          text={styles.text}
          title={LabelReport}
          onPress={() => this._report()}
        />

        {/* Private Infomation */}
        <CustomSimpleTouchableText
          style={styles.textView}
          text={styles.text}
          title={LabelPrivateInfo}
          onPress={() => this._privateInfo()}
        />

        {/* Terms */}
        <CustomSimpleTouchableText
          style={styles.textView}
          text={styles.text}
          title={LabelTerms}
          onPress={() => this._terms()}
        />

        <Divider style={{backgroundColor: disable, height: 1, marginBottom: 20}}/>

        {/* Logout */}
        <CustomSimpleTouchableText
          style={styles.textView}
          text={styles.highlightText}
          title={LabelLogout}
          onPress={() => this._logout()}
        />

        {/* Withdraw */}
        <CustomSimpleTouchableText
          style={styles.textView}
          text={styles.highlightText}
          title={LabelWithdraw}
          onPress={() => this._withdraw()}
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    device: state.bluetooth.device,
    isConnected: state.bluetooth.isConnected,
    loading: state.auth.pending,
    isLoggedIn : state.auth.isLoggedIn,
    error: state.auth.error
  }),
  (dispatch) => ({
    WithdrawActions: bindActionCreators(withdrawActions, dispatch),
    logout: () => dispatch({ type: SIGNOUT}),
    disconnect: () => dispatch({ type: DISCONNECT_SUCCESS })
  })
)(Settingscreen);