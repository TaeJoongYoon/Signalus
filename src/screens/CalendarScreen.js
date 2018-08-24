import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button
} from 'react-native';
import { HISTORY } from '../reducers/nav/actionTypes'

class CalendarScreen extends Component{
  render(){
    const { history } = this.props;
    return(
      <View>
        <Text>This is Calendar</Text>  
        <Button
          title='Go to history'
          onPress={history}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  history: () => dispatch({ type: HISTORY}),
});

export default connect(null, mapDispatchToProps)(CalendarScreen);