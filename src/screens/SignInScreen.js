import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
 Image, View, Text, TouchableOpacity
} from 'react-native';
import CustomFormInput from '../components/CustomFormInput';
import CustomFilledButton from '../components/CustomFilledButton';
import CustomBorderedButton from '../components/CustomBorderedButton';
import styles from '../styles/SignInStyle';
import { defaultMinLength } from '../constants/dimens';
// Actions
import * as loginActions from '../reducers/auth/actions';
import {
  SIGNED, NOT_CONNECTED, ON_CONSENT, CONNECTED
} from '../reducers/nav/actionTypes'
// Strings
import {
  LabelSignIn, LabelRegister, LabelFind, PlaceholderId, PlaceholderPassword, ErrorMsgId, ErrorMsgPassword, ErrorMsgLogin, HeaderBluetooth
} from '../constants/string';
// Colors
import { mainColor } from '../constants/color';

class SignInScreen extends Component{
  static navigationOptions = {
    header: null,
    headerBackTitle: null
  };

  constructor(props){
    super(props)
    this.state= {
      id:'',
      password:'',
      idError:false,
      pwError:false,
    }
  }
  
  // Functions
  _login = () => {
    const { LoginActions } = this.props;
    this.setState({idError:false, pwError:false})

    if(this.state.id.length >= 8 && this.state.password.length >= 8){ // Check Id and Password
      try{
        LoginActions.login(this.state.id, this.state.password);
      }catch(e){}
    } else if(this.state.id.length < defaultMinLength){
      this.setState({idError: true})
    } else if(this.state.password.length < defaultMinLength){
      this.setState({pwError: true})
    }
  }

  _find = () => {

  }

  // LifeCycle
  componentWillReceiveProps(nextProps) {
    const { goToMain, goToBluetooth, isLoggedIn } = nextProps;

    if(isLoggedIn){
      goToBluetooth();
      //goToMain();   // Go to MainScreen
    } 
  }

  render(){
    const { error, goToConsent } = this.props;

    return(
      <View style={styles.container}>
        
        {/* Logo */}
        <Image
          style= {styles.image} 
          source={require('../../assets/logo.png')} 
        />

        {/* Error Message */}
        <View style={{height:20}}>
        {error && <Text style={styles.error}>{ErrorMsgLogin}</Text>}
        </View>
        
       {/* ID Form */}
        <CustomFormInput 
          style={styles.input}
          iconStyle={styles.icon}
          isIcon={true}
          type="ID"
          placeholder={PlaceholderId}
          onChangeText={(id) => this.setState({id})}
          maxLength={20}
          clearButtonMode="never"
          error={this.state.idError}
          errorMsg={ErrorMsgId}
        />

        {/* PW Form */}
        <CustomFormInput
          style={styles.input}
          iconStyle={styles.icon}
          isIcon={true}
          type="PW"
          placeholder={PlaceholderPassword}
          onChangeText={(password) => this.setState({password})}
          maxLength={20}
          clearButtonMode="always"
          secureTextEntry={true}
          error={this.state.pwError}
          errorMsg={ErrorMsgPassword}
        />

        {/* SignIn Button */}
        <CustomFilledButton
          style={(this.state.id.length==0 && this.state.password.length==0) ? styles.loginDisable : styles.loginEnable}
          title={LabelSignIn}
          disabled={(this.state.id.length==0 && this.state.password.length==0)}
          onPress={() => this._login()}
        />
        
        {/* Find Button */}
        <View style={styles.find}> 
          <TouchableOpacity 
            onPress={() => this._find()}>
            <Text
              style={{textDecorationLine: 'underline', color: mainColor, fontSize: 15}}
              pointerEvents='none'>
            {LabelFind}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Register Button */}
        <CustomBorderedButton
          style={styles.register}
          title={LabelRegister}
          onPress={goToConsent}
        />
        
      </View>
    );
  }
}

// Redux Connect
export default connect(
  (state) => ({
    loading: state.auth.pending,
    isLoggedIn : state.auth.isLoggedIn,
    error: state.auth.error
  }),
  (dispatch) => ({
      LoginActions: bindActionCreators(loginActions, dispatch),
      goToMain: () => dispatch({ type: SIGNED}),
      goToBluetooth: () => dispatch({ type: NOT_CONNECTED}),
      goToConsent: () => dispatch({ type: ON_CONSENT}),
  })
)(SignInScreen);
