import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT } from '../constants/dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex:1 ,
    width: WIDTH,
    height: HEIGHT,
  }
});

export default styles;