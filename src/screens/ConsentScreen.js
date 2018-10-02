import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Button
} from 'react-native';
import { Divider } from 'react-native-elements';
import CustomCheckBox from '../components/CustomCheckBox';
import CustomFilledButton from '../components/CustomFilledButton';
import styles from '../styles/ConsentStyle';
// Actions
import { 
  ON_REGISTER
 } from '../reducers/nav/actionTypes'
// Strings
import {
  HeaderConsent, LabelConsent1, LabelConsent2, LabelConsent3, LabelConsent4, LabelAgreementAll, LabelAgreement
} from '../constants/string';

class ConsentScreen extends Component{
  static navigationOptions = {
    title: HeaderConsent,
    headerBackTitle: null,
  };

  constructor(props){
    super(props)
    this.state= {
      checked_1:false,
      checked_2:false,
      checked_3:false,
      checked_4:false,
    }
  }

  // Functions
  _onTouch =(item) => {
    console.log(item)
    switch(item){
      case "ONE":
      break
      case "TWO":
      break
      case "THREE":
      break
      case "FOUR":
      break
    }
  }

  // LifeCyle
  render(){
    const { goToRegister } = this.props;
    return(
      <View style={styles.container}>

        {/* Agreement All */}
        <CustomCheckBox
          checked={(this.state.checked_1 && this.state.checked_2 && this.state.checked_3)}
          onPress={() => this.setState({checked_1: true, checked_2: true, checked_3: true, checked_4: true})}
          title={LabelAgreementAll}
        />

        {/* Divider */}
        <View style={styles.dividerView}>
          <Divider style={styles.divider} />
        </View>

        {/* Agreement 1 */}
        <CustomCheckBox
          checked={this.state.checked_1}
          onPress={() => this.setState({checked_1: !this.state.checked_1})}
          onTouch={() => this._onTouch("ONE")}
          title={LabelConsent1}
          underline={true}
        />

        {/* Agreement 2 */}        
        <CustomCheckBox
          checked={this.state.checked_2}
          onPress={() => this.setState({checked_2: !this.state.checked_2})}
          onTouch={() => this._onTouch("TWO")}
          title={LabelConsent2}
          underline={true}
        />

        {/* Agreement 3 */}   
        <CustomCheckBox
          checked={this.state.checked_3}
          onPress={() => this.setState({checked_3: !this.state.checked_3})}
          onTouch={() => this._onTouch("THREE")}
          title={LabelConsent3}
          underline={true}
        />

        {/* Agreement 4 */}   
        <CustomCheckBox
          checked={this.state.checked_4}
          onPress={() => this.setState({checked_4: !this.state.checked_4})}
          onTouch={() => this._onTouch("FOUR")}
          title={LabelConsent4}
          underline={true}
        />

        {/* Next Button */} 
        <View style={styles.agreeButtonView}>
          <CustomFilledButton
            style={(this.state.checked_1 && this.state.checked_2 && this.state.checked_3) ? styles.agreeEnable : styles.agreeDisable}
            title={LabelAgreement}
            disabled={!(this.state.checked_1 && this.state.checked_2 && this.state.checked_3)}
            onPress={goToRegister}
          />
        </View>
      </View>
    );
  }
}

// Redux Connect
export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    goToRegister: () => dispatch({ type: ON_REGISTER}),
  })
)(ConsentScreen);
