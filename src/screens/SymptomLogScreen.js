import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToday } from '../constants/utils';
// Elements
import {
  View, Text, TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements'
import CustomSymptomCheckBox from '../components/CustomSymptomCheckBox';
import styles from '../styles/SymptomLogStyle';
// Actions

// Strings
import { 
  HeaderSymptomLog, LabelAddSymptom, LabelSelectSymptom,
  LabelAnxious, LabelArmNeckPain, LabelChestPain, LabelDizziness,
  LabelFainted, LabelFluttering, LabelLightHeaded, LabelVomiting,
} from '../constants/string';
// Colors
import { disable } from '../constants/color';

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
    console.log("DD");
  };

  // LifeCycle
  componentDidMount(){
    const { navigation } = this.props;
    
    navigation.setParams({ addSymptom: this._addSymptom });
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
    
  }),
  (dispatch) => ({
    
  })
)(SymptomLogScreen);