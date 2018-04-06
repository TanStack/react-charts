import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Bar } from '../../../src'

export default () => (
  <ChartConfig dataType="ordinal">
    {({ data }) => (
      <Chart data={data}>
        <Axis primary type="ordinal" />
        <Axis type="linear" min={0} max={0} />
        <Series type={Bar} />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
