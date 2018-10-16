import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { WIDTH, HEIGHT } from '../constants/dimens';
import { LabelNormal, LabelWarning, LabelEmergency } from '../constants/string';
import { mainColor, divider } from '../constants/color';

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

    if(percent > 0.95){
      this.setState({status: LabelNormal, color: mainColor})
    } else if(percent > 0.85 && percent <= 0.95){
      this.setState({status: LabelWarning, color: '#e9e063'})
    } else{
      this.setState({status: LabelEmergency, color: 'red'})
    }
  }

  render(){
    const { title, percent } = this.props;

    return(
      <View style={{flexDirection: 'row', alignItems:'center', height:HEIGHT * 0.11}}>
        <View style={{flex:4, paddingRight: 20}}>
          <Text style={{marginBottom: 10, color: divider}}>{`${title}\t`} <Text style={{color: this.state.color}}>{this.state.status}</Text> </Text>
          <Progress.Bar color={this.state.color} width={null} progress={percent} />
        </View>
        <View style={{flex:1}}>
          <Text style={{color: this.state.color, fontSize:30, fontWeight:'bold'}}>{percent*100}<Text style={{fontSize: 20}}>%</Text> </Text>
        </View>
      </View>
      );
  }
}

export default CustomHealthStatusBar;