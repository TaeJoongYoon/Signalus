import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { HEIGHT } from '../constants/dimens';
import { mainColor, highlightColor } from '../constants/color'

class CustomChart extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const { data } = this.props;

    return (
      <LinearGradient colors={[mainColor, highlightColor]} style={{
        flex: 1,
        paddingTop: 30,
        paddingBottom: 50,
      }}>
        <LineChart
          style={{height: HEIGHT*0.3,}}
          data={ data }
          contentInset={ { top: 20, bottom: 20 } }
          curve={ shape.curveNatural }
          svg={{
              strokeWidth: 2,
              stroke: 'rgb(255,255,255)',
          }}
        >
        </LineChart>
      </LinearGradient>
    )
  }
}

export default CustomChart