import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Cursor, Bar } from '../../../src'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig dataType="ordinal">
      {({ data }) => (
        // @source sourceCode
        <Chart data={data}>
          <Axis primary type="ordinal" />
          <Axis type="linear" min={0} max={0} stacked />
          <Series type={Bar} />
          <Cursor primary />
          <Cursor />
          <Tooltip />
        </Chart>
        // @source sourceCode
      )}
    </ChartConfig>
    <Code source={sourceCode} />
  </Sidebar>
)
