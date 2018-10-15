import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, AsyncStorage, Text, Switch, TextInput
} from 'react-native';
import { Divider } from 'react-native-elements'
import CustomFAB from '../components/CustomFAB';
import CustomFilledButton from '../components/CustomFilledButton';
import styles from '../styles/ProfileStyle';
// Actions
import * as withdrawActions from '../reducers/auth/actions';
import {
  SIGNOUT, RESIGNED, ON_SETTING
} from '../reducers/nav/actionTypes'
// Strings
import { 
  HeaderProfile,
  LabelAlertTitle, LabelAlertStatusOn, LabelAlertStatusOff, LabelRegisterContact, LabelRegisterButton,
  LabelPhoneListTitle,
 } from '../constants/string';
import { DISCONNECT_SUCCESS } from '../reducers/bluetooth/actionTypes';
import FAB from 'react-native-fab';
import { mainColor, divider, disable } from '../constants/color';

class ProfileScreen extends Component{
  static navigationOptions = {
    title: HeaderProfile,
    headerBackTitle: null,
  };

  constructor(props){
    super(props)
    this.state= {
      isOn: true,
      id:'',
      password:'',
      token:'',
    }
  }

  // Functions
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
  }

  componentWillReceiveProps(nextProps) {
    const { logout, isLoggedIn } = nextProps;
    if(!isLoggedIn){
      logout();
    } 
  }

  render(){
    const { setting } = this.props;
    return(
      <View style={styles.container}>

        {/* Alert Setting View */}
        <View style={styles.upper}>
          <View>
            <Text style={styles.sectionTitle}>
                {LabelAlertTitle}
            </Text>
            <Text style={this.state.isOn ? styles.alertStatusOn : styles.alertStatusOff}>
                {this.state.isOn ? LabelAlertStatusOn : LabelAlertStatusOff}
            </Text>
          </View>
          <Switch
            onTintColor={mainColor}
            onValueChange = {(value) => this.setState({isOn: value})}
            value = {this.state.isOn}
          />
        </View>

        <Divider style={{backgroundColor: disable, height: 1}}/>

        {/* Register Contact View */}
        <View style={styles.registerContact}>
          <Text style={styles.sectionTitle}>
            {LabelRegisterContact}
          </Text>
          <View style={styles.registerView}>
            <TextInput
              style={styles.registerInput}
              placeholder=""
              onChangeText={(text) => console.log(text)}
            />  
            <CustomFilledButton
              style={styles.registerButton}
              title={LabelRegisterButton}
              disabled={false}
              onPress={() => console.log("D")}
            />
          </View>
        </View>

        <Divider style={{backgroundColor: disable, height: 1}}/>

        {/* Registered Contact List View */}
        <View style={styles.phoneList}>
          <Text style={styles.sectionTitle}>
            {LabelPhoneListTitle}
          </Text>
        </View>

        {/* Floating Action Button */}
        <CustomFAB
          buttonColor={mainColor}
          iconTextColor={'white'}
          onClickAction={setting}
          visible={true}
          iconTextComponent={ <Text>=</Text>
          }
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
      setting: () => dispatch({ type: ON_SETTING }),
      logout: () => dispatch({ type: SIGNOUT}),
      disconnect: () => dispatch({ type: DISCONNECT_SUCCESS })
  })
)(ProfileScreen);