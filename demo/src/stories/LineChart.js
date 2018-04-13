import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Line, Cursor } from '../../../src'

export default () => (
  <ChartConfig>
    {({ data }) => (
      <Chart data={data} getPrimary={d => new Date(d.x)}>
        <Axis primary type="time" position="bottom" />
        <Axis type="linear" position="left" />
        <Series type={Line} />
        <Cursor primary />
        <Cursor />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
