import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Line } from '../../../src'

export default () => (
  <ChartConfig width={500} height={100}>
    {({ data }) => (
      <Chart data={data}>
        <Axis primary type="time" position="bottom" show={false} />
        <Axis type="linear" position="left" show={false} />
        <Series type={Line} />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
