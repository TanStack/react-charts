import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Bar } from '../../../src'

export default () => (
  <Sidebar>
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
  </Sidebar>
)
