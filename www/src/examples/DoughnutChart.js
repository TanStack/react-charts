import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Pie } from '../../../src'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig dataType="ordinal" width={300} height={300}>
      {({ data }) => (
        // @source sourceCode
        <Chart data={data}>
          <Axis type="pie" />
          <Series type={Pie} showPoints={false} />
          <Tooltip />
        </Chart>
        // @source sourceCode
      )}
    </ChartConfig>
    <Code source={sourceCode} />
  </Sidebar>
)
