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
  ChartTitle:{
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: divider,
    paddingBottom: 10,
  },
  chart: {
    height: HEIGHT*0.3 + 60
  },
});

export default styles;