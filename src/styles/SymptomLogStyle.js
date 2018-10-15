import {  StyleSheet, } from 'react-native';
import { WIDTH, HEIGHT } from '../constants/dimens';
import { backgroundColor, device, divider } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
  },
  header:{
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  date:{
    color: divider,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title:{
    color: divider,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default styles;