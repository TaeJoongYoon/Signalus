import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, AsyncStorage, Image
} from 'react-native';
import styles from '../styles/SplashStyle';
// Actions
import * as loginActions from '../reducers/auth/actions';
import { 
  SIGNED, NOT_SIGNED, NOT_CONNECTED
} from '../reducers/nav/actionTypes'


class SplashScreen extends Component{
  static navigationOptions = {
    header: null,
    headerBackTitle: null
  };

  // Functions
  _login = async (id, password) => {
    const { LoginActions } = this.props;
    
    return await LoginActions.login(id, password);
  }

  // LifeCycle
  componentDidMount(){
    const { goToSignIn } = this.props;

    let id;
    let password;
    let device;

    setTimeout(()=>{
      AsyncStorage.multiGet(['id', 'pw', 'device']).then((value) => {   // Check LocalStorage
        id =  value[0][1];
        password =  value[1][1];
        device = value[2][1];
  
        if(id != null && password != null) {    // Login
          this._login(id,password)
          .catch((e) =>{})
        } else {
          goToSignIn();
        }
      })
    },2000)
  }

  componentWillReceiveProps(nextProps) {
    const { isLoggedIn, goToSignIn, goToBluetooth } = nextProps;

    isLoggedIn ? goToBluetooth() : goToSignIn()

  }

  render(){
    return(
      <View style={styles.container}>

        {/* Splash */}
        <Image
          style= {styles.image} 
          source={require('../../assets/splash.jpg')}
        />
      </View>
    );
  }
}

// Redux Connect
export default connect(
  (state) => ({
    isLoggedIn : state.auth.isLoggedIn,
  }),
  (dispatch) => ({
      LoginActions: bindActionCreators(loginActions, dispatch),
      goToMain: () => dispatch({ type: SIGNED}),
      goToBluetooth: () => dispatch({ type: NOT_CONNECTED }),
      goToSignIn: () => dispatch({ type: NOT_SIGNED}),
  })
)(SplashScreen);
