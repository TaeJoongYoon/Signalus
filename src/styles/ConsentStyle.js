import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT, borderRadius, dividerViewHeight } from '../constants/dimens';
import { backgroundColor, divider, mainColor, disable } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    paddingTop: 20,
  },
  dividerView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: dividerViewHeight,
  },
  divider: {
    width: WIDTH * 0.9,
    backgroundColor: divider,
  },
  agreeButtonView: {
    marginTop: HEIGHT * 0.05,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
  ,
  agreeEnable: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
    width: WIDTH * 0.85,
    height: HEIGHT * 0.08,
    borderRadius:borderRadius,
  },
  agreeDisable: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disable,
    width: WIDTH * 0.85,
    height: HEIGHT * 0.08,
    borderRadius:borderRadius,
  },
});

export default styles;