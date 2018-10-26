import {  StyleSheet, } from 'react-native';
import { normalize } from '../constants/utils';
import { WIDTH, HEIGHT, borderRadius } from '../constants/dimens';
import { backgroundColor, divider, mainColor, disable, highlightColor } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    paddingLeft: 10,
    paddingRight: 10,
  },
  upper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionTitle:{
    color: divider,
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertStatusOn:{
    color: mainColor,
    fontSize: normalize(15),
    fontWeight: 'bold'
  },
  alertStatusOff:{
    color: disable,
    fontSize: normalize(15),
    fontWeight: 'bold'
  },
  registerContact:{
    flex: 2.3,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  registerView:{
    flexDirection: 'row',
    height: HEIGHT * 0.06,
  },
  registerInput:{
    flex:2,
    backgroundColor: highlightColor,
    padding: 5,
    marginRight: 5,
    borderRadius: borderRadius,
  },
  registerButton:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
    flex:1,
    borderRadius: borderRadius,
  },
  phoneList:{
    flex: 5,
    padding: 20,
  }
});

export default styles;