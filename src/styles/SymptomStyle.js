import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT, borderRadius } from '../constants/dimens';
import { backgroundColor, divider, mainColor, disable, highlightColor, placeholderText, device } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: HEIGHT * 0.08,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  fromDevice:{
    color: device,
    fontSize: 13,
    marginBottom: 10,
  },
  fromUser:{
    color: placeholderText,
    fontSize: 13,
    marginBottom: 10,
  },
  titleStyle:{
    color: divider,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateStyle:{
    color: divider,
    fontSize: 16,
  },
  divider:{
    backgroundColor: disable,
  },
});

export default styles;