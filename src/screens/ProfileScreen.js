import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, AsyncStorage, Text, Button, Image
} from 'react-native';
import styles from '../styles/ProfileStyle';
// Actions
import * as withdrawActions from '../reducers/auth/actions';
import {
  SIGNOUT, RESIGNED, ON_SETTING
} from '../reducers/nav/actionTypes'
// Strings
import { 
  HeaderProfile,
 } from '../constants/string';

class ProfileScreen extends Component{
  static navigationOptions = {
    title: HeaderProfile,
    headerBackTitle: null,
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
  _logout = () => {
    const { device, logout } = this.props;

    device.cancelConnection()
    AsyncStorage.multiRemove(['id', 'pw', 'token', 'device']).then(() => {    // Clear LocalStorage
      logout();
    })
  }

  _withdraw = () => {
    const { device, WithdrawActions } = this.props;

    let id;
    let token;

    device.cancelConnection()
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
    console.log(nextProps)
    const { logout, isLoggedIn } = nextProps;
    if(!isLoggedIn){
      logout();
    } 
  }

  render(){
    const { setting } = this.props;
    return(
      <View style={styles.container}>
        <Text>This is Profile</Text>
        <Button
          title={`Logout`}
          onPress={this._logout}
        />
        <Button
          title={`Withdraw`}
          onPress={this._withdraw}
        />
        <Button
          title={`Setting`}
          onPress={setting}
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    device: state.bluetooth.device,
    loading: state.auth.pending,
    isLoggedIn : state.auth.isLoggedIn,
    error: state.auth.error
  }),
  (dispatch) => ({
      WithdrawActions: bindActionCreators(withdrawActions, dispatch),
      setting: () => dispatch({ type: ON_SETTING }),
      logout: () => dispatch({ type: SIGNOUT}),
  })
)(ProfileScreen);