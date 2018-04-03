import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Bar, Cursor } from '../../../src'

export default () => (
  <ChartConfig dataType='ordinal'>
    {({ data }) => (
      <Chart data={data} getData={d => d.data}>
        <Axis primary type="ordinal" />
        <Axis type="linear" stacked />
        <Series type={Bar} />
        <Cursor primary />
        <Cursor />
        <Tooltip origin='cursor' />
      </Chart>
    )}
  </ChartConfig>
)
