import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Pie } from '../../../src'

export default () => (
  <Sidebar>
    <ChartConfig dataType="ordinal" width={300} height={300}>
      {({ data }) => (
        <Chart data={data}>
          <Axis type="pie" />
          <Series type={Pie} showPoints={false} />
          <Tooltip />
        </Chart>
      )}
    </ChartConfig>
  </Sidebar>
)
