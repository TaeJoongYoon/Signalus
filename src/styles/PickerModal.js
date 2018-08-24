import { StyleSheet } from 'react-native';
import { pickerBackgroundColor, closeButtonColor, closeButtonBorderColor } from '../constants/color';

var styles = StyleSheet.create({
  background: {
    backgroundColor: pickerBackgroundColor
  },
  closeButtonContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    borderTopColor: closeButtonBorderColor, 
    borderTopWidth: 1, 
    borderBottomColor: closeButtonBorderColor, 
    borderBottomWidth:1
  },
  closeButton: {
   paddingRight:10, 
    paddingTop:10, 
    paddingBottom:10
  },
  closeButtonText: {
   color: closeButtonColor
  },
});

export default styles;