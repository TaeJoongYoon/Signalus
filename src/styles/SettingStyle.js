import {  StyleSheet, } from 'react-native';
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
    fontSize: 18,
  },
  highlightText: {
    color: mainColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;