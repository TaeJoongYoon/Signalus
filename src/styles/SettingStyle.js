import {  StyleSheet, } from 'react-native';
import { normalize } from '../constants/utils';
import { WIDTH, HEIGHT } from '../constants/dimens';
import { backgroundColor, divider, mainColor } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    padding: 30,
  },
  textView: {
    marginBottom: 20,
  },
  text: {
    color: divider,
    fontSize: normalize(18),
  },
  highlightText: {
    color: mainColor,
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
});

export default styles;