import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Text, Switch, TextInput
} from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import CustomFAB from '../components/CustomFAB';
import CustomFilledButton from '../components/CustomFilledButton';
import styles from '../styles/ProfileStyle';
// Actions
import { ON_SETTING } from '../reducers/nav/actionTypes'
import { DISCONNECT_SUCCESS } from '../reducers/bluetooth/actionTypes';
// Strings
import { 
  HeaderProfile,
  LabelAlertTitle, LabelAlertStatusOn, LabelAlertStatusOff, LabelRegisterContact, LabelRegisterButton,
  LabelPhoneListTitle,
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
      isOn: true,
    }
  }

  // Functions

  // LifeCycle
  componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps) {
    
  }

  render(){
    const { setting } = this.props;
    return(
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
              placeholder=""
              onChangeText={(text) => console.log(text)}
            />  
            <CustomFilledButton
              style={styles.registerButton}
              title={LabelRegisterButton}
              disabled={false}
              onPress={() => console.log("D")}
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
    );
  }
}

export default connect(
  (state) => ({
    device: state.bluetooth.device,
    isConnected: state.bluetooth.isConnected,
  }),
  (dispatch) => ({
      setting: () => dispatch({ type: ON_SETTING }),
      disconnect: () => dispatch({ type: DISCONNECT_SUCCESS })
  })
)(ProfileScreen);