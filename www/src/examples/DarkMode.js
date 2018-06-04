import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Line, Cursor } from '../../../src'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig
      style={{
        background: 'rgba(0, 27, 45, 0.9)',
        padding: '.5rem',
        borderRadius: '5px',
      }}
    >
      {({ data }) => (
        // @source sourceCode
        <Chart data={data} dark>
          <Axis primary type="time" position="bottom" />
          <Axis type="linear" position="left" />
          <Series type={Line} />
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
