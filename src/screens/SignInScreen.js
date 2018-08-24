import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
 View, Text, Button
} from 'react-native';
import CustomFormInput from '../components/CustomFormInput';
import styles from '../styles/SignInStyle';
import { defaultMinLength } from '../constants/dimens';
// Actions
import * as loginActions from '../reducers/auth/actions';
import {
  SIGNED, NOT_CONNECTED, ON_CONSENT, CONNECTED
} from '../reducers/nav/actionTypes'
// Strings
import {
  LabelId, LabelPassword, LabelSignIn, LabelRegister, PlaceholderId, PlaceholderPassword, ErrorMsgId, ErrorMsgPassword, ErrorMsgLogin
} from '../constants/string';

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

  componentWillReceiveProps(nextProps) {
    const { goToMain, isLoggedIn } = nextProps;

    if(isLoggedIn){
      goToMain();   // Go to MainScreen
    } 
  }

  render(){
    const { error, goToConsent } = this.props;

    return(
      <View style={styles.container}>
        <Text style={styles.title}>Signalus</Text>
        
        <CustomFormInput 
          style={styles.input}
          title={LabelId}
          placeholder={PlaceholderId}
          onChangeText={(id) => this.setState({id})}
          maxLength={20}
          error={this.state.idError}
          errorMsg={ErrorMsgId}
        />

        <CustomFormInput
          style={styles.input}
          title={LabelPassword}
          placeholder={PlaceholderPassword}
          onChangeText={(password) => this.setState({password})}
          clearTextOnFocus={true}
          secureTextEntry={true}
          error={this.state.pwError}
          errorMsg={ErrorMsgPassword}
        />

        {error && <Text style={styles.error}>{ErrorMsgLogin}</Text>}

        <Button
          title={LabelSignIn}
          disabled={(this.state.id.length==0 && this.state.password.length==0)}
          onPress={() => this._login()}
        />

        <Button
          title={LabelRegister}
          onPress={goToConsent}
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
      LoginActions: bindActionCreators(loginActions, dispatch),
      goToMain: () => dispatch({ type: SIGNED}),
      goToBluetooth: () => dispatch({ type: NOT_CONNECTED}),
      goToConsent: () => dispatch({ type: ON_CONSENT}),
  })
)(SignInScreen);