import React, { Component } from 'react';
import _ from "lodash";
import { bindActionCreators } from "redux";
import update from 'react-addons-update';
import { connect } from 'react-redux';
// Elements
import {
  View, Text, TouchableOpacity, AsyncStorage,
} from 'react-native';
import { Divider } from 'react-native-elements'
import CustomSymptomCheckBox from '../components/CustomSymptomCheckBox';
import styles from '../styles/SymptomLogStyle';
// Actions
import * as symptomActions from '../reducers/symptom/actions';
import { DISCONNECT_SUCCESS } from '../reducers/bluetooth/actionTypes';
// Strings
import { 
  HeaderSymptomLog, LabelAddSymptom, LabelSelectSymptom,
  LabelAnxious, LabelArmNeckPain, LabelChestPain, LabelDizziness,
  LabelFainted, LabelFluttering, LabelLightHeaded, LabelVomiting,
} from '../constants/string';
// Colors
import { disable } from '../constants/color';
import { getToday, getTimeForNow } from '../constants/utils';

class SymptomLogScreen extends Component{
  static navigationOptions = ({ navigation }) => {
    return{
    title: HeaderSymptomLog,
    headerBackTitle: null,
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('addSymptom')}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white', marginRight: 20}}>
          {LabelAddSymptom}
        </Text>
      </TouchableOpacity>
    ),
  }};

  constructor(props){
    super(props)
    this.state= {
      id:'',
      token:'',
      anxious: false,
      armNeckPain: false,
      chestPain: false,
      dizziness: false,
      fainted: false,
      fluttering: false,
      lightHeaded: false,
      vomiting: false,
    }
  }
  
  // Functions
  _addSymptom = () => {
    const { SymptomActions } = this.props;

    let symptoms = []

    if(this.state.anxious){
      symptoms.push(LabelAnxious)
    }

    if(this.state.armNeckPain){
      symptoms.push(LabelArmNeckPain)
    }

    if(this.state.chestPain){
      symptoms.push(LabelChestPain)
    }

    if(this.state.dizziness){
      symptoms.push(LabelDizziness)
    }

    if(this.state.fainted){
      symptoms.push(LabelFainted)
    }

    if(this.state.fluttering){
      symptoms.push(LabelFluttering)
    }

    if(this.state.lightHeaded){
      symptoms.push(LabelLightHeaded)
    }

    if(this.state.vomiting){
      symptoms.push(LabelVomiting)
    }

    if(symptoms.length > 0){
      try{
        SymptomActions.addSymptom(this.state.id, symptoms, getTimeForNow(), "device", this.state.token)
      }catch(e){}
    }
    else{
      alert("증상을 최소 1개 이상 선택해주세요!")
    }
  };

  _getSymptoms = async (id, token) => {
    const { SymptomActions } = this.props;
    
    return await SymptomActions.getSymptoms(id, token);
  }

  // LifeCycle
  componentDidMount(){
    const { navigation } = this.props;
    console.log(this.props)
    
    AsyncStorage.multiGet(['id', 'token']).then((value) => {    // Get Data From LocalStorage
      id = value[0][1];
      token = value[1][1];

      this.setState({id: id, token: token})
    })

    navigation.setParams({ addSymptom: this._addSymptom });
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, device, isConnected, error, isRegisterd, } = nextProps;
    if(isRegisterd){
      this._getSymptoms(this.state.id,this.state.token)
          .catch((e) =>{})
      navigation.pop();
      alert("등록하였습니다!")
    }
    if(error){
      alert("등록에 실패하였습니다..")
    }
  }

  render(){
    return(
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.date}>{getToday()}</Text>
          <Text style={styles.title}>{LabelSelectSymptom}</Text>

          <Divider style={{backgroundColor: disable, height: 1}}/>
        </View>
        
        {/* Symptom CheckBox List */}
        <CustomSymptomCheckBox
          checked={this.state.anxious}
          onPress={() => this.setState({anxious: !this.state.anxious})}
          onTouch={() => console.log("CLICK")}
          title={LabelAnxious}
        />

        <CustomSymptomCheckBox
          checked={this.state.armNeckPain}
          onPress={() => this.setState({armNeckPain: !this.state.armNeckPain})}
          onTouch={() => console.log("CLICK")}
          title={LabelArmNeckPain}
        />

        <CustomSymptomCheckBox
          checked={this.state.chestPain}
          onPress={() => this.setState({chestPain: !this.state.chestPain})}
          onTouch={() => console.log("CLICK")}
          title={LabelChestPain}
        />

        <CustomSymptomCheckBox
          checked={this.state.dizziness}
          onPress={() => this.setState({dizziness: !this.state.dizziness})}
          onTouch={() => console.log("CLICK")}
          title={LabelDizziness}
        />

        <CustomSymptomCheckBox
          checked={this.state.fainted}
          onPress={() => this.setState({fainted: !this.state.fainted})}
          onTouch={() => console.log("CLICK")}
          title={LabelFainted}
        />

        <CustomSymptomCheckBox
          checked={this.state.fluttering}
          onPress={() => this.setState({fluttering: !this.state.fluttering})}
          onTouch={() => console.log("CLICK")}
          title={LabelFluttering}
        />

        <CustomSymptomCheckBox
          checked={this.state.lightHeaded}
          onPress={() => this.setState({lightHeaded: !this.state.lightHeaded})}
          onTouch={() => console.log("CLICK")}
          title={LabelLightHeaded}
        />

        <CustomSymptomCheckBox
          checked={this.state.vomiting}
          onPress={() => this.setState({vomiting: !this.state.vomiting})}
          onTouch={() => console.log("CLICK")}
          title={LabelVomiting}
        />

      </View>
    );
  }
}

export default connect(
  (state) => ({
    device: state.bluetooth.device,
    isConnected: state.bluetooth.isConnected,
    error: state.symptom.error,
    isRegisterd: state.symptom.isRegisterd,
  }),
  (dispatch) => ({
    SymptomActions: bindActionCreators(symptomActions, dispatch),
    disconnect: () => dispatch({ type: DISCONNECT_SUCCESS })
  })
)(SymptomLogScreen);