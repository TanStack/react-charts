import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Line, Cursor } from 'react-charts'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig show={['primaryAxisShow', 'secondaryAxisShow']}>
      {({ data, primaryAxisShow, secondaryAxisShow }) => (
        // @source sourceCode
        <Chart data={data}>
          <Axis primary type="time" position="bottom" show={primaryAxisShow} />
          <Axis type="linear" position="left" show={secondaryAxisShow} />
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
