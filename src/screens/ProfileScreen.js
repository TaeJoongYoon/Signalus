import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, Text, Switch, TextInput, TouchableWithoutFeedback, Keyboard, AsyncStorage,
} from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import CustomFAB from '../components/CustomFAB';
import CustomFilledButton from '../components/CustomFilledButton';
import styles from '../styles/ProfileStyle';
// Actions
import * as contactActions from '../reducers/contact/actions';
import {} from '../reducers/contact/actionTypes';
import { ON_SETTING } from '../reducers/nav/actionTypes'
import { DISCONNECT_SUCCESS } from '../reducers/bluetooth/actionTypes';
// Strings
import { 
  HeaderProfile,
  LabelAlertTitle, LabelAlertStatusOn, LabelAlertStatusOff, LabelRegisterContact, LabelRegisterButton,
  LabelPhoneListTitle,
  PlaceholderContact,
 } from '../constants/string';
// Colors
import { mainColor, disable } from '../constants/color';

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
      isOn: true,
      contact: "",
    }
  }

  // Functions
  _register = (id, phoneNumber, token) => {
    const { ContactActions } = this.props;

    try{
      ContactActions.register(id, phoneNumber, token)
    }catch(e){}
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
    const { device, isConnected, error, isRegisterd, isDeleted } = nextProps;
    console.log(nextProps)
    if(isRegisterd){
      console.log("성공")
    }
  }

  render(){
    const { setting } = this.props;
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>

        {/* Alert Setting View */}
        <View style={styles.upper}>
          <View>
            <Text style={styles.sectionTitle}>
                {LabelAlertTitle}
            </Text>
            <Text style={this.state.isOn ? styles.alertStatusOn : styles.alertStatusOff}>
                {this.state.isOn ? LabelAlertStatusOn : LabelAlertStatusOff}
            </Text>
          </View>
          <Switch
            onTintColor={mainColor}
            onValueChange = {(value) => this.setState({isOn: value})}
            value = {this.state.isOn}
          />
        </View>

        <Divider style={{backgroundColor: disable, height: 1}}/>

        {/* Register Contact View */}
        <View style={styles.registerContact}>
          <Text style={styles.sectionTitle}>
            {LabelRegisterContact}
          </Text>
          <View style={styles.registerView}>
            <TextInput
              style={styles.registerInput}
              placeholder={PlaceholderContact}
              onChangeText={(contact) => this.setState({contact: contact})}
            />  
            <CustomFilledButton
              style={styles.registerButton}
              title={LabelRegisterButton}
              disabled={false}
              onPress={() => this._register(this.state.id, this.state.contact, this.state.token)}
            />
          </View>
        </View>

        <Divider style={{backgroundColor: disable, height: 1}}/>

        {/* Registered Contact List View */}
        <View style={styles.phoneList}>
          <Text style={styles.sectionTitle}>
            {LabelPhoneListTitle}
          </Text>
        </View>

        {/* Floating Action Button */}
        <CustomFAB
          buttonColor={mainColor}
          iconTextColor={'white'}
          onClickAction={setting}
          visible={true}
          iconTextComponent={
            <Icon
              name='menu'
              color='white'
            />
          }
        />
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(
  (state) => ({
    device: state.bluetooth.device,
    isConnected: state.bluetooth.isConnected,
    error: state.contact.error,
    isRegisterd: state.contact.isRegisterd,
    isDeleted: state.contact.isDeleted,
  }),
  (dispatch) => ({
      ContactActions: bindActionCreators(contactActions, dispatch),
      setting: () => dispatch({ type: ON_SETTING }),
      disconnect: () => dispatch({ type: DISCONNECT_SUCCESS })
  })
)(ProfileScreen);