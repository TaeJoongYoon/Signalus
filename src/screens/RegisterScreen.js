import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, Animated, Text, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import CustomFormInput from '../components/CustomFormInput';
import CustomFormPicker from '../components/CustomFormPicker';
import CustomPicker from '../components/CustomPicker';
import CustomFilledButton from '../components/CustomFilledButton';
import styles from '../styles/RegisterStyle';
import { HEIGHT, defaultMinLength } from '../constants/dimens';
// Actions
import * as registerActions from '../reducers/auth/actions';
import { SIGNED } from '../reducers/nav/actionTypes'
// Strings
import {
  HeaderRegister, LabelRegister, LabelRegisterTitle,
  PlaceholderId, PlaceholderPasswordRegister, PlaceholderPasswordCheck, PlaceholderAge, PlaceholderSex,PlaceholderHeight, PlaceholderWeight,
  ErrorMsgId, ErrorMsgPasswordRegister, ErrorMsgPasswordCheck, ErrorMsgRegister,
  ModeAge, ModeSex, ModeHeight, ModeWeight
} from '../constants/string';

class RegisterScreen extends Component{
  static navigationOptions = {
    title: HeaderRegister,
    headerBackTitle: null,
  };

  constructor(props){
    super(props)
    this.state= {
      id: '',
      password: '',
      password2: '',
      age: 0,
      gender: '',
      height: 0,
      weight: 0,
      modal: false,
      offSet: new Animated.Value(HEIGHT),
      mode: '',
      idError:false,
      pwError:false,
      chkError:false,
    }
  }

  // Functions
  _changeValue = (value) => {
    this.setState({value})

    switch(this.state.mode){
      case ModeAge:
      this._changeAge(value)
      break;
      case ModeSex:
      this._changeSex(value)
      break;
      case ModeHeight:
      this._changeHeight(value)
      break;
      case ModeWeight:
      this._changeWeight(value)
      break;
      default:
      this._changeAge(value)
      break;
    }
   }

  _changeAge = (age) => {
    if(age == ModeAge){
      this.setState({age: 0})
    } else{
      age = parseInt(age);
      this.setState({age})
    }
   }

   _changeSex = (gender) => {
    if(gender == ModeSex){
      this.setState({gender: ''})
    } else{
    this.setState({gender})
    }
   }

   _changeHeight = (height) => {
    if(height == ModeHeight){
      this.setState({height: 0})
    } else{
      height = parseInt(height)
      this.setState({height})
    }
   }

   _changeWeight = (weight) => {
     if(weight == ModeWeight){
      this.setState({weight: 0})
     } else{
      weight = parseInt(weight)
      this.setState({weight})
     }
   }

  _register = () => {
    const { RegisterActions } = this.props;
    this.setState({idError: false, pwError: false, chkError: false})

    if(this.state.id.length < defaultMinLength){   // Check Id and Password
      this.setState({idError: true})
    } else if(this.state.password.length < defaultMinLength){
      this.setState({pwError: true})
    } else if(this.state.password != this.state.password2){
      this.setState({chkError: true})
    } else{
      try{
        RegisterActions.register(this.state.id, this.state.password, this.state.age, this.state.gender, this.state.height, this.state.weight)
      }catch(e){}
    }
  }

  // LifeCycle
  componentWillReceiveProps(nextProps) {
    const { goToMain, isLoggedIn } = nextProps;
    
    if(isLoggedIn){
      goToMain();   // Go to MainScreen
    } 
  }

  render(){
    const { error } = this.props;
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>  
          {LabelRegisterTitle}
        </Text>
        <View style={styles.contents}>

          {/* ID Form */}
          <CustomFormInput 
            style={styles.input}
            placeholder={PlaceholderId}
            onChangeText={(id) => this.setState({id})}
            maxLength={20}
            error={this.state.idError}
            errorMsg={ErrorMsgId}
          />

          {/* PW Form */}
          <CustomFormInput
            style={styles.input}
            placeholder={PlaceholderPasswordRegister}
            onChangeText={(password) => this.setState({password})}
            clearTextOnFocus={true}
            secureTextEntry={true}
            error={this.state.pwError}
            errorMsg={ErrorMsgPasswordRegister}
          />

          {/* PW Check Form */}
          <CustomFormInput
            style={styles.input}
            placeholder={PlaceholderPasswordCheck}
            onChangeText={(password2) => this.setState({password2})}
            clearTextOnFocus={true}
            secureTextEntry={true}
            error={this.state.chkError}
            errorMsg={ErrorMsgPasswordCheck}
          />
          
          {/* Age Picker */}
          <CustomFormPicker
            style={styles.input}
            value={this.state.age}
            placeholder={PlaceholderAge}
            onPress={() => {this.setState({modal: true, mode: ModeAge}), Keyboard.dismiss()}}
          />

          {/* Sex Picker */}
          <CustomFormPicker
            style={styles.input}
            value={this.state.gender}
            placeholder={PlaceholderSex}
            onPress={() => {this.setState({modal: true, mode: ModeSex}), Keyboard.dismiss()}}
          />

          {/* Height Picker */}
          <CustomFormPicker
            style={styles.input}
            value={this.state.height}
            placeholder={PlaceholderHeight}
            onPress={() => {this.setState({modal: true, mode: ModeHeight}), Keyboard.dismiss()}}
          />

          {/* Weight Picker */}
          <CustomFormPicker
            style={styles.input}
            value={this.state.weight}
            placeholder={PlaceholderWeight}
            onPress={() => {this.setState({modal: true, mode: ModeWeight}), Keyboard.dismiss()}}
          />

          {/* Error Message */}
          <View style={{height:30}}>
          {error && <Text style={styles.error}>{ErrorMsgRegister}</Text>}
          </View>

          {/* Register Button*/}
          <CustomFilledButton
            style={(this.state.id.length > 0 && this.state.password.length > 0 && this.state.password2.length > 0 && this.state.age &&
              this.state.gender.length > 0 && this.state.height && this.state.weight) ? styles.registerEnable : styles.registerDisable}
            title={LabelRegister}
            disabled={!(this.state.id.length > 0 && this.state.password.length > 0 && this.state.password2.length > 0 && this.state.age &&
              this.state.gender.length > 0 && this.state.height && this.state.weight)}
            onPress={this._register}
          />

        </View>
            {/* Picker Modal */}
            {this.state.modal &&
              <CustomPicker
                closeModal={() => this.setState({ modal: false })} 
                offSet={this.state.offSet}
                changeValue={this._changeValue} 
                showModal={this.state.value}
                mode={this.state.mode}/>
            }
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

// Redux Connect
export default connect(
  (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    loading: state.auth.pending,
    error: state.auth.error
  }),
  (dispatch) => ({
      RegisterActions: bindActionCreators(registerActions, dispatch),
      goToMain: () => dispatch({ type: SIGNED }),
  })
)(RegisterScreen);