import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button
} from 'react-native';
import { 
  ON_LOG,
 } from '../reducers/nav/actionTypes'

class SymptomScreen extends Component{
  render(){
    const { log } = this.props;
    return(
      <View>
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