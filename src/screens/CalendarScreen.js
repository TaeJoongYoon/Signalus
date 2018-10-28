import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// Elements
import {
  View, Text, ScrollView,
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from '../styles/CalendarStyle';
import { getToday } from '../constants/utils';
// Actions
import { HISTORY } from '../reducers/nav/actionTypes'
// Strings
import { HeaderCalendar } from '../constants/string';

class CalendarScreen extends Component{
  static navigationOptions = {
    title: HeaderCalendar,
    headerBackTitle: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      today: getToday(),
      eventDay: ['2018-10-25', '2018-10-26', '2018-11-01', '2018-10-31'],
      selected: getToday(),
    };
  }

  // Functions
  _onDayPress = (day) => {
    this.setState({
      selected: day.dateString
    });

    console.log(day)
  }

  _mark = () => {

    // today
    let marked = {[this.state.selected]: {selected: true, selectedDotColor: 'orange'}}

    // event days
    _.map(this.state.eventDay, day => {
      marked[day] = {marked: true, dotColor: 'red'}
    })

    return marked
  }

  // LifeCycle
  render(){
    const { history } = this.props;
    return(
      <View style={styles.container}>
        <CalendarList
          style={styles.calendar}
          horizontal={true}
          pagingEnabled={true}
          current={this.state.selected}
          minDate={'2000-01-01'}
          maxDate={'2100-12-31'}
          onDayPress={this._onDayPress}
          markedDates={this._mark()}
          monthFormat={'yyyy년 MM 월'}
          onMonthChange={(month) => {console.log('month changed', month)}}
        />
        <ScrollView>
        
        </ScrollView>
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