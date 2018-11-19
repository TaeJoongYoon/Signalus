import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from "redux";
// Elements
import {
  View, ScrollView, AsyncStorage, RefreshControl, PushNotificationIOS
} from 'react-native';
import { Icon } from 'react-native-elements'
import CustomSymptomItem from '../components/CustomSymptomItem';
import CustomFAB from '../components/CustomFAB';
import styles from '../styles/SymptomStyle';
// Actions
import * as symptomActions from '../reducers/symptom/actions';
import { 
  ON_LOG, ON_DETAIL_PATCH, ON_DETAIL_USER
 } from '../reducers/nav/actionTypes'
 // Strings
import { 
  HeaderSymptom,
 } from '../constants/string';
 // Colors
import { mainColor } from '../constants/color';

class SymptomScreen extends Component{
  static navigationOptions = {
    title: HeaderSymptom,
    headerBackTitle: null,
  };

  constructor(props){
    super(props)
    this.state= {
      id:'',
      token:'',
      symptoms:[],
      refreshing: false,
    }
  }

  // Functions
  _onRefresh = () => {
    this.setState({refreshing: true});
    this._getSymptoms(this.state.id, this.state.token)
        .then(this.setState({refreshing: false}))
        .catch((e) => {});
  }

  _getSymptoms = async (id, token) => {
    const { SymptomActions } = this.props;
    
    return await SymptomActions.getSymptoms(id, token);
  }

  _goToLog = () => {
    this.props.goToLog();
  }

  _goToDetailPatch = (symptom) => {
    this.props.navigation.navigate('SymptomDetailPatch', {
      time: symptom.time,
    });
  }

  _goToDetailUser = (symptom) => {
    this.props.navigation.navigate('SymptomDetailUser', {
      time: symptom.time,
      symptoms: symptom.symptoms,
    });
  }


  // LifeCyle
  componentDidMount(){
    const { navigation } = this.props;
    
    AsyncStorage.multiGet(['id', 'token']).then((value) => {    // Get Data From LocalStorage
      id = value[0][1];
      token = value[1][1];

      this.setState({id: id, token: token})
      this._getSymptoms(id,token)
          .catch((e) =>{})
    })
  }

  render(){
    const { isConnected, symptoms } = this.props;
    return(
      <View style={styles.container}>

        {/* Symptom List */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {_.map(symptoms, symptom => {
            _title = symptom.symptoms.length > 1 ? `${symptom.symptoms[0]} 외 ${symptom.symptoms.length-1}개` : `${symptom.symptoms[0]}`;
            return (
              <CustomSymptomItem
                key={symptom.time}
                style={styles.itemView}
                type={symptom.type}
                typeStyle={symptom.type == "patch" ? styles.fromPatch : styles.fromUser}
                titleStyle={styles.titleStyle}
                divider={styles.divider}
                title={_title}
                dateStyle={styles.dateStyle}
                date={symptom.time.substring(0,10)}
                onPress={() => symptom.type === "patch" ? this._goToDetailPatch(symptom) : this._goToDetailUser(symptom)}
              />
            );
          })}
          
        </ScrollView>

        {/* Floating Action Button */}
        {isConnected ?
          <CustomFAB
            buttonColor={mainColor}
            iconTextColor={'white'}
            onClickAction={() => this._goToLog()}
            visible={true}
            iconTextComponent={
              <Icon
                name='add'
                color='white'
              />
            }
          /> : null}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    isConnected: state.bluetooth.isConnected,
    symptoms: state.symptom.symptoms,
  }),
  (dispatch) => ({
    SymptomActions: bindActionCreators(symptomActions, dispatch),
    goToLog: () => dispatch({ type: ON_LOG}),
    goToDetailPatch: () => dispatch({ type: ON_DETAIL_PATCH}),
    goToDetailUser: () => dispatch({ type: ON_DETAIL_USER}),
  })
)(SymptomScreen);