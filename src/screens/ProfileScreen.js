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
  }

  // Functions
  _logout = () => {
    const { logout } = this.props;

    AsyncStorage.multiRemove(['id','pw','token']).then(() => {    // Clear LocalStorage
      logout();
    })
  }

  _withdraw = () => {
    const { WithdrawActions } = this.props;

    let id;
    let token;

    AsyncStorage.multiGet(['id', 'token']).then((value) => {    // Get Data From LocalStorage
      id = value[0][1];
      token = value[1][1];
    }).then(() => {
      try{
        WithdrawActions.withdraw(id, token);    // Withdraw the Account
      }catch(e){}
    })
  }

  // LifeCycle
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