import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Line, Cursor } from '../../../src'

export default () => (
  <ChartConfig>
    {({ data }) => (
      <Chart data={data} getData={d => d.data}>
        <Axis primary type="time" position="bottom" />
        <Axis type="linear" position="left" />
        <Series type={Line} showPoints={false} />
        <Cursor primary />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
