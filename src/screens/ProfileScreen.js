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
  SIGNOUT, RESIGNED
} from '../reducers/nav/actionTypes'
// Strings
import { 
  HeaderSymptom, HeaderProfile,
 } from '../constants/string';

class ProfileScreen extends Component{
  static navigationOptions = {
    tabBarIcon: ({ focused }) => {
      let src = focused ? require('../../assets/profileON.png') : require('../../assets/profileOFF.png')
      return <Image
              style={{width: 20, height: 24}}
              source={src}
            />;
    },
  };

  constructor(props){
    super(props)
  }


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
      <View style={styles.container}>
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