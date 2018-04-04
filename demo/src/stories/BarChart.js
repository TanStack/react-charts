import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Bar, Cursor } from '../../../src'

export default () => (
  <ChartConfig dataType="ordinal">
    {({ data }) => (
      <Chart data={data}>
        <Axis primary type="ordinal" position="left" />
        <Axis type="linear" stacked position="bottom" />
        <Series type={Bar} />
        <Cursor primary />
        <Cursor />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
