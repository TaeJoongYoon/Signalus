import React, { Component } from 'react';
import FAB from 'react-native-fab';

class CustomFAB extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const {buttonColor, iconTextColor, onClickAction, visible, iconTextComponent } = this.props;
    return(
          <FAB
            style={{flex: 1}}
            buttonColor={buttonColor}
            iconTextColor={iconTextColor}
            onClickAction={onClickAction}
            visible={visible}
            iconTextComponent={iconTextComponent}
          />
      );
  }
}

export default CustomFAB;