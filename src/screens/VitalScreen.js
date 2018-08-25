import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import CustomChart from '../components/CustomChart';
import update from 'react-addons-update';

class VitalScreen extends Component{
  constructor(props){
    super(props)
    this.state= {
      data: [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ],
    }
  }

  componentDidMount(){
    console.log("Start");
    setInterval(()=>{
      let a = Math.floor(Math.random() * 200) + 1;
      this.setState({
        data: update(
                  this.state.data, 
                  {
                    $push: [a],
                    $splice: [[0, 1]]
                  }),
      })
    },100)
  }

  render(){
    return(
      <CustomChart
        data = {this.state.data}
      />
    );
  }
}

export default VitalScreen;