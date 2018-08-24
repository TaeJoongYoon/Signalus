import React, { Component } from 'react';
import { View, Animated, TouchableHighlight, Text, Picker } from 'react-native';
import { LabelChoose, ModeAge, ModeSex, ModeHeight, ModeWeight } from '../constants/string';
import { HEIGHT, modalOffset, modalDuration } from '../constants/dimens'
import styles from '../styles/PickerModal';
import { ages, sex, heights, weights } from '../constants/model';

let values = [];

class CustomPicker extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { offSet } = this.props;
    Animated.timing(offSet, {
      duration: modalDuration,
      toValue: modalOffset
    }).start()
  }

  closeModal = () => {
    const { offSet, closeModal } = this.props;

    Animated.timing(offSet, {
       duration: modalDuration,
       toValue: HEIGHT
    }).start(closeModal);
 }

      
  render() {
    const { offSet, showModal, changeValue, mode } = this.props;
    switch(mode){
      case ModeAge:
      values = ages
      break;
      case ModeSex:
      values = sex
      break;
      case ModeHeight:
      values = heights
      break;
      case ModeWeight:
      values = weights;
      break;
      default:
      values = ages
      break;
    }
    return (
      <Animated.View style={{ transform: [{translateY: offSet}] }}>
        <View style={styles.background}>
          <View style={styles.closeButtonContainer}>
            <TouchableHighlight onPress={ this.closeModal } underlayColor="transparent" style={styles.closeButton}>
              <Text style={styles.closeButtonText}>{LabelChoose}</Text>
            </TouchableHighlight>
          </View>
          <Picker
            selectedValue={showModal}
            onValueChange={(value) => changeValue(value)}>
            {Object.keys(values).map((index) => (
              <Picker.Item
                key={index}
                value={values[index].value}
                label={values[index].value}
              />
            ))}
        </Picker>
        </View>
      </Animated.View>   
    )
  }
}

export default CustomPicker;
