import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Bubble, Cursor } from '../../../src'

export default () => (
  <ChartConfig>
    {({ data }) => (
      <Chart data={data} interaction="closestPoint">
        <Axis primary type="time" position="bottom" />
        <Axis type="linear" position="left" />
        <Series type={Bubble} />
        <Cursor primary />
        <Cursor />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
