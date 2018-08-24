import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT } from '../constants/dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    paddingTop:'30%',
    paddingBottom: '25%',
    fontSize: 30,
  },
  input: {
    width: WIDTH * 0.8,
  },
  error: {
    color: 'red',
  }
});

export default styles;