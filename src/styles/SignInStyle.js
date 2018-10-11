import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT, borderRadius } from '../constants/dimens';
import { backgroundColor, mainColor, disable } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  image: {
    marginTop: '8%',
    width: WIDTH * 0.3,
  },
  input: {
    alignItems: 'center',
    width: WIDTH * 0.85,
    height: HEIGHT * 0.1,
  },
  icon: {
    width: 20,
  },
  loginEnable: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
    width: WIDTH * 0.85,
    height: HEIGHT * 0.08,
    borderRadius: borderRadius,
  },
  loginDisable: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disable,
    width: WIDTH * 0.85,
    height: HEIGHT * 0.08,
    borderRadius: borderRadius,
  },
  find:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT * 0.08,
  },
  register: {
    marginTop: HEIGHT * 0.04,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH * 0.85,
    height: HEIGHT * 0.08,
    borderRadius: borderRadius,
    borderWidth: 1,
    borderColor: mainColor
  },
  error: {
    color: 'red',
  }
});

export default styles;