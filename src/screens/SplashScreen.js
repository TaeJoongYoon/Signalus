import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, AsyncStorage, Text
} from 'react-native';
import styles from '../styles/SplashStyle';
// Actions
import * as loginActions from '../reducers/auth/actions';
import { 
  SIGNED,NOT_SIGNED,
} from '../reducers/nav/actionTypes'


class SplashScreen extends Component{
  _login = async (id, password) => {
    const { LoginActions } = this.props;
    
    return await LoginActions.login(id, password);
  }

  componentDidMount(){
    const { goToSignIn } = this.props;

    let id;
    let password;

    AsyncStorage.multiGet(['id', 'pw']).then((value) => {   // Check LocalStorage
      id =  value[0][1];
      password =  value[1][1];

      if(id != null && password != null) {    // Login
        this._login(id,password)
        .catch((e) =>{})
      } else {
        goToSignIn();
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { isLoggedIn, goToMain, goToSignIn } = nextProps;

    isLoggedIn ? goToMain() : goToSignIn()
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>This is Splash</Text>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    isLoggedIn : state.auth.isLoggedIn,
  }),
  (dispatch) => ({
      LoginActions: bindActionCreators(loginActions, dispatch),
      goToMain: () => dispatch({ type: SIGNED}),
      goToSignIn: () => dispatch({ type: NOT_SIGNED}),
  })
)(SplashScreen);