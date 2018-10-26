import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT } from '../constants/dimens';
import { normalize } from '../constants/utils';
import { backgroundColor, mainColor, disable, divider, placeholderText } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH,
    height: HEIGHT * 0.1,
    padding: 25,
    backgroundColor: backgroundColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textToggleOn:{
    fontSize: normalize(13),
    color: mainColor,
    fontWeight: 'bold',
  },
  textToggleOff:{
    fontSize: normalize(13),
    color: divider,
    fontWeight: 'bold',
  },
  toggleView:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTitle:{
    padding: 25,
    fontSize: normalize(15),
    color: divider,
    fontWeight: 'bold',
  },
  listTitleError:{
    padding: 25,
    fontSize: normalize(15),
    color: divider,
    fontWeight: 'bold',
    color: 'red',
  },
  deviceContainer:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  deviceList:{
    flexDirection: 'column',
    width: WIDTH * 0.8,
  },
  device:{
    height: HEIGHT * 0.1,
  },
  deviceTitle:{
    margin: 20,
    fontSize: normalize(15),
    color: placeholderText,
  },
  divider:{
    backgroundColor: divider,
  },
  next: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 50,
  },
});

export default styles;