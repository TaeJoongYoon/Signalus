import React, { Component } from 'react';
import { connect } from 'react-redux';
// Elements
import {
  View, Button
} from 'react-native';
import CustomCheckBox from '../components/CustomCheckBox';
import styles from '../styles/ConsentStyle';
// Actions
import { 
  ON_REGISTER
 } from '../reducers/nav/actionTypes'
// Strings
import {
  LabelConsent1, LabelConsent2, LabelConsent3, LabelAgreementAll, LabelAgreement
} from '../constants/string';

class ConsentScreen extends Component{
  static navigationOptions = {
    headerBackTitle: null
  };

  constructor(props){
    super(props)
    this.state= {
      checked_1:false,
      checked_2:false,
      checked_3:false,
    }
  }

  render(){
    const { goToRegister } = this.props;
    return(
      <View style={styles.container}>
        <CustomCheckBox
          checked={this.state.checked_1}
          onPress={() => this.setState({checked_1: !this.state.checked_1})}
          title={LabelConsent1}
        />
        <CustomCheckBox
          checked={this.state.checked_2}
          onPress={() => this.setState({checked_2: !this.state.checked_2})}
          title={LabelConsent2}
        />
        <CustomCheckBox
          checked={this.state.checked_3}
          onPress={() => this.setState({checked_3: !this.state.checked_3})}
          title={LabelConsent3}
        />
        <Button
          title={LabelAgreementAll}
          onPress={() => this.setState({checked_1: true, checked_2: true, checked_3: true})}
        />
        <Button
          title={LabelAgreement}
          disabled={!(this.state.checked_1 && this.state.checked_2 && this.state.checked_3)}
          onPress={goToRegister}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  goToRegister: () => dispatch({ type: ON_REGISTER}),
});

export default connect(null, mapDispatchToProps)(ConsentScreen);