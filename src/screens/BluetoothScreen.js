import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button
} from 'react-native';
import { CONNECTED } from '../reducers/nav/actionTypes'

class BluetoothScreen extends Component{
  render(){
    const { main } = this.props;
    return(
      <View>
        <Text>This is Bluetooth</Text>  
        <Button
          title='Main'
          onPress={main}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  main: () => dispatch({ type: CONNECTED}),
});

export default connect(null, mapDispatchToProps)(BluetoothScreen);