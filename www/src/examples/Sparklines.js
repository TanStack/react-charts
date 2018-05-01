import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Line } from 'react-charts'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig width={500} height={100}>
      {({ data }) => (
        // @source sourceCode
        <Chart data={data}>
          <Axis primary type="time" position="bottom" show={false} />
          <Axis type="linear" position="left" show={false} />
          <Series type={Line} />
          <Tooltip />
        </Chart>
        // @source sourceCode
      )}
    </ChartConfig>
    <Code source={sourceCode} />
  </Sidebar>
)
