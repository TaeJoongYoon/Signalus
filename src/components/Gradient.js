import React from 'react'
import { Defs, LinearGradient, Stop } from 'react-native-svg'

const Gradient = () => (
  <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'0%'} y2={'100%'}>
          <Stop offset={'0%'} stopColor={'rgb(28, 155, 255)'}/>
          <Stop offset={'100%'} stopColor={'rgb(91, 94, 96)'}/>
      </LinearGradient>
  </Defs>
)

export default Gradient;