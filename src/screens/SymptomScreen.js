import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from "redux";
// Elements
import {
  View, ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements'
import CustomSymptomItem from '../components/CustomSymptomItem';
import CustomFAB from '../components/CustomFAB';
import styles from '../styles/SymptomStyle';
// Actions
import * as symptomActions from '../reducers/symptom/actions';
import { 
  ON_LOG, ON_DETAIL_DEVICE, ON_DETAIL_USER
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
    }
  }

  // Functions
  _getSymptoms = async (id, token) => {
    const { SymptomActions } = this.props;
    
    return await SymptomActions.getSymptoms(id, token);
  }

  _goToLog = () => {
    this.props.goToLog();
  }

  _goToDetailDevice = () => {
    this.props.goToDetailDevice();
  }

  _goToDetailUser = () => {
    this.props.goToDetailUser();
  }


  // LifeCyle
  componentDidMount(){
    const { navigation } = this.props;
    
    AsyncStorage.multiGet(['id', 'token']).then((value) => {    // Get Data From LocalStorage
      id = value[0][1];
      token = value[1][1];

      this.setState({id: id, token: token})
    })
  }

  render(){
    const { symptoms } = this.props;
    return(
      <View style={styles.container}>

        {/* Symptom List */}
        <ScrollView>
          {_.map(symptoms, symptom => {
            _title = symptom.symptoms.length > 1 ? `${symptom.symptoms[0]} 외 ${symptom.symptoms.length-1}개` : `${symptom.symptoms[0]}`;
            return (
              <CustomSymptomItem
                key={symptom.key}
                style={styles.itemView}
                type={symptom.type}
                typeStyle={symptom.type == "device" ? styles.fromDevice : styles.fromUser}
                titleStyle={styles.titleStyle}
                divider={styles.divider}
                title={_title}
                dateStyle={styles.dateStyle}
                date={symptom.time.substring(0,10)}
                onPress={() => symptom.type == "device" ? this._goToDetailDevice() : this._goToDetailUser()}
              />
            );
          })}
        </ScrollView>

        {/* Floating Action Button */}
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
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    symptoms: state.symptom.symptoms,
  }),
  (dispatch) => ({
    SymptomActions: bindActionCreators(symptomActions, dispatch),
    goToLog: () => dispatch({ type: ON_LOG}),
    goToDetailDevice: () => dispatch({ type: ON_DETAIL_DEVICE}),
    goToDetailUser: () => dispatch({ type: ON_DETAIL_USER}),
  })
)(SymptomScreen);