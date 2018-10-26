import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { HEIGHT } from '../constants/dimens';
import { LabelNormal, LabelWarning, LabelEmergency } from '../constants/string';
import { mainColor, divider } from '../constants/color';
import { normalize } from '../constants/utils';

class CustomHealthStatusBar extends Component {
  constructor(props){
    super(props)
    this.state={
      status:LabelNormal,
      color:mainColor,
    }
  }

  componentDidMount(){
    const { percent } = this.props;

    if(percent > 95){
      this.setState({status: LabelNormal, color: mainColor})
    } else if(percent > 85 && percent <= 95){
      this.setState({status: LabelWarning, color: '#e9e063'})
    } else{
      this.setState({status: LabelEmergency, color: 'red'})
    }
  }

  render(){
    const { title, percent } = this.props;

    return(
      <View style={{flexDirection: 'row', alignItems:'center', height:HEIGHT * 0.11}}>
        <View style={{flex:3.5, paddingRight: 20}}>
          <Text style={{marginBottom: 10, color: divider}}>{`${title}\t`} <Text style={{color: this.state.color}}>{this.state.status}</Text> </Text>
          <Progress.Bar color={this.state.color} width={null} progress={percent/100} />
        </View>
        <View style={{flex:1}}>
          <Text style={{color: this.state.color, fontSize:normalize(24), fontWeight:'bold'}}>{percent}<Text style={{fontSize: normalize(12)}}>%</Text> </Text>
        </View>
      </View>
      );
  }
  
  componentWillReceiveProps(nextProps){
    const { percent } = nextProps;

    if(percent > 95){
      this.setState({status: LabelNormal, color: mainColor})
    } else if(percent > 85 && percent <= 95){
      this.setState({status: LabelWarning, color: '#e9e063'})
    } else{
      this.setState({status: LabelEmergency, color: 'red'})
    }
  }
}

export default CustomHealthStatusBar;