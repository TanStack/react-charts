import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Area } from '../../../src'

export default () => (
  <Sidebar>
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
  </Sidebar>
)
