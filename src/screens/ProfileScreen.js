import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {
  View,
  AsyncStorage,
  Text,
  Button
} from 'react-native';
import * as withdrawActions from '../reducers/auth/actions';
import {
  SIGNOUT, RESIGNED
} from '../reducers/nav/actionTypes'

class ProfileScreen extends Component{

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

  componentWillReceiveProps(nextProps) {
    const { logout, isLoggedIn } = nextProps;
    if(!isLoggedIn){
      logout();
    } 
  }

  render(){
    return(
      <View>
        <Text>This is Profile</Text>
        <Button
          title={`Logout`}
          onPress={this._logout}
        />
        <Button
          title={`Resign`}
          onPress={this._withdraw}
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
      logout: () => dispatch({ type: SIGNOUT}),
      resign: () => dispatch({ type: RESIGNED}),
  })
)(ProfileScreen);