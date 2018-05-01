import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Area } from '../../../src'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig dataType="time">
      {({ data }) => (
        // @source sourceCode
        <Chart data={data}>
          <Axis primary type="time" position="bottom" />
          <Axis type="linear" position="left" stacked />
          <Series type={Area} />
          <Tooltip />
        </Chart>
        // @source sourceCode
      )}
    </ChartConfig>
    <Code source={sourceCode} />
  </Sidebar>
)
