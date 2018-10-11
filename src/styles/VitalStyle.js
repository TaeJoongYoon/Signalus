import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT } from '../constants/dimens';
import { backgroundColor } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
  },
  viewStyle:{
    height: 200,
    padding: 20,
    flexDirection: 'row' 
  },
  lineStyle: {
    height: 200,
  },
});

export default styles;