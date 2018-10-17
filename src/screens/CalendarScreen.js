import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Text,
} from 'react-native';
import styles from '../styles/CalendarStyle';
// Actions
import { HISTORY } from '../reducers/nav/actionTypes'
// Strings
import { HeaderCalendar } from '../constants/string';

class CalendarScreen extends Component{
  static navigationOptions = {
    title: HeaderCalendar,
    headerBackTitle: null,
  };

  // Functions

  // LifeCycle
  render(){
    const { history } = this.props;
    return(
      <View style={styles.container}>
        <Text>This is Calendar</Text> 
      </View>
    );
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    history: () => dispatch({ type: HISTORY}),
  })
)(CalendarScreen);