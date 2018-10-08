import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Text, Button, Image
} from 'react-native';
import styles from '../styles/SymptomStyle';
// Actions
import { 
  ON_LOG,
 } from '../reducers/nav/actionTypes'
 // Strings
import { 
  HeaderSymptom,
 } from '../constants/string';

class SymptomScreen extends Component{
  constructor(props){
    super(props)
  }


  render(){
    const { log } = this.props;
    return(
      <View style={styles.container}>
        <Text>This is Symptom</Text>
        <Button
          title='Log'
          onPress={log}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  log: () => dispatch({ type: ON_LOG}),
});

export default connect(null, mapDispatchToProps)(SymptomScreen);