import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Area } from '../../../src'

export default () => (
  <ChartConfig dataType="time">
    {({ data }) => (
      <Chart data={data}>
        <Axis primary type="time" position="bottom" />
        <Axis type="linear" position="left" stacked />
        <Series type={Area} />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
