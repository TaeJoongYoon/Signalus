import {  StyleSheet, } from 'react-native';
import { normalize } from '../constants/utils';
import { WIDTH, HEIGHT, borderRadius } from '../constants/dimens';
import { backgroundColor, mainColor, disable } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
  },
  title:{
    paddingTop: 35,
    paddingLeft: 20,
    paddingBottom: 20,
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  contents: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    alignItems: 'center',
    width: WIDTH * 0.85,
    height: HEIGHT * 0.09,
  },
  registerEnable: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
    width: WIDTH * 0.85,
    height: HEIGHT * 0.08,
    borderRadius: borderRadius,
  },
  registerDisable: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disable,
    width: WIDTH * 0.85,
    height: HEIGHT * 0.08,
    borderRadius: borderRadius,
  },
  error: {
    color: 'red',
  },
});

export default styles;