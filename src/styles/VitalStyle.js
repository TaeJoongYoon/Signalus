import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT, borderRadius } from '../constants/dimens';
import { backgroundColor, mainColor, highlightColor } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    paddingBottom: 15,
  },
  card: {
    flex: 1,
  },
  cardView:{
    flex: 1,
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: borderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bpmStatus:{
    flexDirection: 'row',
    alignItems:'center',
    height:HEIGHT * 0.14
  },
});

export default styles;