import React, { Component } from 'react';
import _ from "lodash";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
// Elements
import {
  View, Text, Switch, TextInput, TouchableWithoutFeedback, Keyboard, AsyncStorage, Alert
} from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import Contacts from 'react-native-contacts';
import CustomFAB from '../components/CustomFAB';
import CustomFilledButton from '../components/CustomFilledButton';
import CustomContactItem from '../components/CustomContactItem';
import styles from '../styles/ProfileStyle';
// Actions
import * as contactActions from '../reducers/contact/actions';
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
      name: '',
    }
  }

  // Functions
  _getContacts = async (id, token) => {
    const { ContactActions } = this.props;
    
    return await ContactActions.getContacts(id, token);
  }

  _register = (id, name, token) => {
    Contacts.getContactsMatchingString(name, (error, contacts) => {
      if (error) throw error;
    
      if(contacts.length > 0){
        this._name = contacts[0].familyName.length > 0 ? contacts[0].familyName : contacts[0].givenName
        this._phoneNumber = contacts[0].phoneNumbers[0].number
        
        Alert.alert(
          LabelRegisterContact,
          `${this._name}    ${this._phoneNumber}가 맞습니까?`,
          [
            {text: "취소", onPress: () => console.log("취소"), style: 'cancel'},
            {text: "확인", onPress: () => this._registerContact(id, this._name, this._phoneNumber, token)},
          ],
          { cancelable: false }
        )
      } else{
        Alert.alert("해당 이름으로 등록된 번호가 없습니다!")
      }
    })
  }

  _registerContact = (id, name, phoneNumber, token) => {
    const { ContactActions } = this.props;

    try{
      ContactActions.register(id, name, phoneNumber, token)
    }catch(e){}
  }

  _delete = (phoneNumber) => {
    const { ContactActions } = this.props;

    try{
      ContactActions.deleteContact(this.state.id, phoneNumber, this.state.token)
    }catch(e){}
  }

  // LifeCycle
  componentDidMount(){
    AsyncStorage.multiGet(['id', 'pw', 'token']).then((value) => {    // Get Data From LocalStorage
      id = value[0][1];
      password = value[1][1];
      token = value[2][1];

      this.setState({id: id, password: password, token: token})

      this._getContacts(id, token)
          .catch((e) =>{})
    })
  }

  componentWillReceiveProps(nextProps) {
    const { device, isConnected, error, isRegisterd, isDeleted, contacts } = nextProps;
    if(isRegisterd){
      this._getContacts(this.state.id, this.state.token)
          .catch((e) =>{})
    }
    if(isDeleted){
      this._getContacts(this.state.id, this.state.token)
          .catch((e) =>{})
    }
  }

  render(){
    const { setting, contacts } = this.props;
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
              autoCorrect={false}
              onChangeText={(name) => this.setState({name: name})}
            />  
            <CustomFilledButton
              style={styles.registerButton}
              title={LabelRegisterButton}
              disabled={false}
              onPress={() => this._register(this.state.id, this.state.name, this.state.token)}
            />
          </View>
        </View>

        <Divider style={{backgroundColor: disable, height: 1}}/>

        {/* Registered Contact List View */}
        <View style={styles.phoneList}>
          <Text style={styles.sectionTitle}>
            {LabelPhoneListTitle}
          </Text>
          {_.map(contacts, (contact) => {
            return(
              <CustomContactItem
                key={contact.name}
                name={contact.name}
                phoneNumber={contact.phoneNumber}
                onPress={()=>this._delete(contact.phoneNumber)}
              />
            );
          })}
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
    contacts: state.contact.contacts,
  }),
  (dispatch) => ({
      ContactActions: bindActionCreators(contactActions, dispatch),
      setting: () => dispatch({ type: ON_SETTING }),
      disconnect: () => dispatch({ type: DISCONNECT_SUCCESS })
  })
)(ProfileScreen);