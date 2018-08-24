import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button
} from 'react-native';
import { 
  ON_DETAIL,
 } from '../reducers/nav/actionTypes'

class SplashScreen extends Component{
  render(){
    const { viewDetail } = this.props;
    return(
      <View>
        <Text>This is SymptomLog</Text>
        <Button
          title='View Log'
          onPress={viewDetail}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  viewDetail: () => dispatch({ type: ON_DETAIL}),
});

export default connect(null, mapDispatchToProps)(SplashScreen);