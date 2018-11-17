import {  StyleSheet, } from 'react-native';
import { normalize } from '../constants/utils';
import { WIDTH, HEIGHT } from '../constants/dimens';
import { backgroundColor, divider } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    padding: 30,
  },
  date: {
    fontSize: normalize(20),
    color: divider,
    marginBottom: 15,
  },
  time: {
    fontSize: normalize(15),
    color: divider,
  },
  symptomListTitle:{
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: divider,
    paddingBottom: 10,
  },
  symptomList:{
    fontSize: normalize(12),
    color: divider,
    paddingLeft: 10,
    paddingTop: 5,
  },
});

export default styles;