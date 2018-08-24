import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, Button, Animated, Text
} from 'react-native';
import CustomFormInput from '../components/CustomFormInput';
import CustomFormPicker from '../components/CustomFormPicker';
import CustomPicker from '../components/CustomPicker';
import styles from '../styles/RegisterStyle';
import { HEIGHT, defaultMinLength } from '../constants/dimens';
// Actions
import * as registerActions from '../reducers/auth/actions';
import { SIGNED } from '../reducers/nav/actionTypes'
// Strings
import {
  LabelId, LabelPassword, LabelAge, LabelSex, LabelHeight, LabelWeight, LabelRegister,
  PlaceholderId, PlaceholderPassword, PlaceholderAge, PlaceholderSex,PlaceholderHeight, PlaceholderWeight,
  ErrorMsgId, ErrorMsgPassword, ErrorMsgAge, ErrorMsgSex, ErrorMsgHeight, ErrorMsgWeight, ErrorMsgRegister,
  ModeAge, ModeSex, ModeHeight, ModeWeight
} from '../constants/string';

class RegisterScreen extends Component{
  constructor(props){
    super(props)
    this.state= {
      id: '',
      password: '',
      age: 0,
      gender: '',
      height: 0,
      weight: 0,
      modal: false,
      offSet: new Animated.Value(HEIGHT),
      mode: '',
      idError:false,
      pwError:false,
    }
  }

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
    this.setState({idError:false, pwError:false})

    if(this.state.id.length >= 8 && this.state.password.length >= 8){ // Check Id and Password
      try{
        RegisterActions.register(this.state.id, this.state.password, this.state.age, this.state.gender, this.state.height, this.state.weight)
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
    const { error } = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.contents}>
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
          
          <CustomFormPicker
            style={styles.input}
            title={LabelAge}
            value={this.state.age}
            placeholder={PlaceholderAge}
            onPress={() => this.setState({modal: true, mode: ModeAge})}
            error={false}
            errorMsg={ErrorMsgAge}
          />

          <CustomFormPicker
            style={styles.input}
            title={LabelSex}
            value={this.state.gender}
            placeholder={PlaceholderSex}
            onPress={() => this.setState({modal: true, mode: ModeSex})}
            error={false}
            errorMsg={ErrorMsgSex}
          />

          <CustomFormPicker
            style={styles.input}
            title={LabelHeight}
            value={this.state.height}
            placeholder={PlaceholderHeight}
            onPress={() => this.setState({modal: true, mode: ModeHeight})}
            error={false}
            errorMsg={ErrorMsgHeight}
          />

          <CustomFormPicker
            style={styles.input}
            title={LabelWeight}
            value={this.state.weight}
            placeholder={PlaceholderWeight}
            onPress={() => this.setState({modal: true, mode: ModeWeight})}
            error={false}
            errorMsg={ErrorMsgWeight}
          />

          {error && <Text style={styles.error}>{ErrorMsgRegister}</Text>}

          <Button
            title={LabelRegister}
            disabled={!(this.state.id.length > 0 && this.state.password.length > 0 && this.state.age &&
                        this.state.gender.length > 0 && this.state.height && this.state.weight)}
            onPress={this._register}
          />
        </View>
        {this.state.modal &&
          <CustomPicker
            closeModal={() => this.setState({ modal: false })} 
            offSet={this.state.offSet}
            changeValue={this._changeValue} 
            showModal={this.state.value}
            mode={this.state.mode}/>
        }
      </View>
    );
  }
}

export default connect(
  (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    loading: state.auth.pending,
    error: state.auth.error
  }),
  (dispatch) => ({
      RegisterActions: bindActionCreators(registerActions, dispatch),
      goToMain: () => dispatch({ type: SIGNED}),
  })
)(RegisterScreen);