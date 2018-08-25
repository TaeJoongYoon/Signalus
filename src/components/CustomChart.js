import React from 'react'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class CustomChart extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const { data } = this.props;
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const Gradient = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
            </LinearGradient>
        </Defs>
    )

    return (
        <LineChart
          style={ { height: 200 } }
          data={ data }
          contentInset={ { top: 20, bottom: 20 } }
          curve={ shape.curveNatural }
          svg={{
              strokeWidth: 2,
              stroke: 'url(#gradient)',
          }}
        >
          <Grid/>
          <Gradient/>
        </LineChart>
    )
  }
}

export default CustomChart